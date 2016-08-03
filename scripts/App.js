import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import $ from "jquery";

export default class App extends Component {

	constructor(props){

		super(props);

		this.state = {
			sql : [""],
			struct : {
				hotel : [''],
				data : ['']
			},
			temp : ["ALTA","MEDIA","BAJA"]
		};
	}

	componentWillMount = () => {
		console.log(" start component ");
		$.ajax({
			type : "POST",
			url : "http://localhost:3000/test",
			success : function ( res ) {
				this.setState({ 
					sql : res,
					struct : this.getNodes( res )
				});
			}.bind(this)
		})
	}

	reloadTable = () => {
		console.log( "to run query" );
		$.ajax({

			type : "POST",
			url : "http://localhost:3000/test",
			success : function ( res ) {

				console.log( "ok -> ");
				console.log( res );

				this.setState({ 
					sql : res,
					struct : this.getNodes( res )
				});
			}.bind(this)

		})
	}

	getNodes( elements ){

		let all_hotels = elements.map( ( e ) => {
			return e.nombre;
		})

		var data_form = {
			hotel : this.unique( all_hotels ),
			data : elements
		}

		return data_form;
	}

	unique = ( req ) => {
		return req.filter(function(e, i) {
			return req.indexOf(e) === i
		})
	}

	getElementsOf = ( name ) => {
		var res = this.state.sql.map( (e) => {

			console.log( e );
			if( name == e.nombre ){
				console.log("::> ", e.anio);
				return e.anio;
			}
		},this)

		let arr_res = this.unique( res.filter(function(n){ return n != undefined }));
		console.log(arr_res);
		return arr_res;
	}

	render() {

		console.log(" ---- recepcion de datos ------- ");
		var E = this.state.struct;
		console.log( E );
		
		var cards = E.hotel.map( ( e ) => {
			let years = this.getElementsOf( e );
			console.log(e + "--");
			console.log( years );
			return(
				<Card>
					<CardHeader
						title={e}
						subtitle={"Resultados de " + e}
						avatar="http://lorempixel.com/100/100/nature/"/>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHeaderColumn>Temporada</TableHeaderColumn>
								{
								years.map( (year) => {
									return (
										<TableHeaderColumn>{ year }</TableHeaderColumn>
									);
								})
								}
							</TableRow>
						</TableHeader>
						<TableBody>
							{
							this.state.temp.map( (x , i) =>{
								let index = 0;
								return(
								<TableRow>
									<TableRowColumn>{x}</TableRowColumn>
									{	

										this.state.sql.map( ( y ) => {
											console.log( e );
											if( years[index] == y.anio && x == y.Temporada && e == y.nombre ){
												index++;
												return (<TableRowColumn>{y.C_NAME}</TableRowColumn>);
											}
										},this)
									}
								</TableRow>
								)
							},this)
							}
						</TableBody>
					</Table>
				</Card>
			);
		},this);
		console.log(cards);

		return (
			<div>
				<AppBar
				title="Prueba de SQL"
				iconClassNameRight="muidocs-icon-navigation-expand-more"
				iconElementRight={
					<FlatButton label="Reload" onClick={this.reloadTable} />
				}/>
				{cards}
			</div>
		);
	}
}
