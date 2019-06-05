import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Container, Content } from 'native-base';

import Geocode from 'react-geocode';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Polyline } from "react-native-maps";
import haversine from "haversine";

import { Permissions } from 'expo';

import { Constants } from '../../config';
import { Headers, Modals, ListItems, Buttons } from '../../components';


const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

class FindChild extends Component {
	constructor(props) {
		super(props);
		this.state = {
			latitude: LATITUDE,
			longitude: LONGITUDE,
			routeCoordinates: [],
			distanceTravelled: 0,
			prevLatLng: {},
			coordinate: new AnimatedRegion({
				latitude: LATITUDE,
				longitude: LONGITUDE
			}),
			contactInfo: {},
			targetCoords: {},
			targetAddress: ''
		};

		this.mergeLot = this.mergeLot.bind(this);

		Geocode.setApiKey('AIzaSyCz-XsPJkn4Mn0nzKtF01hHGwMbGAaBEzE');
	}

	watchPosition() {
		console.log('watchposition was started');

		const { coordinate } = this.state;
		this.watchID = navigator.geolocation.watchPosition(
			position => {
				const { coordinate, routeCoordinates, distanceTravelled } = this.state;
				const { latitude, longitude } = position.coords;

				const newCoordinate = {
					latitude,
					longitude
				};

				if (Platform.OS === "android") {
					if (this.marker) {
						this.marker._component.animateMarkerToCoordinate(
							newCoordinate,
							500
						);
					}
				} else {
					coordinate.timing(newCoordinate).start();
				}

				this.setState({
					latitude,
					longitude,
					routeCoordinates: routeCoordinates.concat([newCoordinate]),
					distanceTravelled:
						distanceTravelled + this.calcDistance(newCoordinate),
					prevLatLng: newCoordinate
				});

				this.mergeLot();
			},
			error => {
				console.log('watchPosition got error');
				console.log(error)
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}

	async componentDidMount() {

		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				locationResult: 'Permission to access location was denied',
			});
			console.log("Permission to access location was denied");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					error: null
				});
				this.mergeLot();
			},
			(error) => this.setState({ error: error.message }),
			{ enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
		);

		this.props.onRef(this);

		this.setState({
			contactInfo: this.props.contactInfo
		});

		this.watchPosition();

		this.interval = setInterval(() => {
			// console.log('Hi');
			this.sendPosition();
		}, 10000);
	}

	componentWillUnmount() {
		this.props.onRef(undefined);

		clearInterval(this.interval);
		navigator.geolocation.clearWatch(this.watchID);
	}

	sendPosition() {
		if (this.state.latitude !== undefined && this.state.longitude !== undefined) {
			this.props.sendPosition(this.state.latitude, this.state.longitude);
		} else {
			console.log('cannot send the position');
		}
	}

	calcDistance = newLatLng => {
		const { prevLatLng } = this.state;
		return haversine(prevLatLng, newLatLng) || 0;
	};

	getMapRegion = () => {

		if (this.state.targetCoords.latitude) {
			const rate = 1.2;
			const centerLatitude = (this.state.latitude + this.state.targetCoords.latitude) / 2;
			const centerLongitude = (this.state.longitude + this.state.targetCoords.longitude) / 2;
			const deltaLat = Math.abs(this.state.latitude - centerLatitude) * rate;
			const deltaLng = Math.abs(this.state.longitude - centerLatitude) * rate;
			console.log("delta Lat" + deltaLat);
			return {
				latitude: centerLatitude,
				longitude: centerLongitude,
				latitudeDelta: deltaLat,
				longitudeDelta: deltaLng
			};
		} else {
			return {
				latitude: this.state.latitude,
				longitude: this.state.longitude,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			};
		}
	};

	method() {
		window.alert('received');
	}

	mergeLot() {
		return;
		console.log("mergeLot");
		console.log(this.state.latitude);
		if (this.state.latitude != null && this.state.longitude != null) {
			let concatLot = this.state.latitude + ',' + this.state.longitude;
			this.setState(
				{
					concat: concatLot
				},
				() => {
					this.getDirections(concatLot, '-6.270565,106.759550');
				}
			);
		}
	}

	async getDirections(startLoc, destinationLoc) {
		try {
			let resp = await fetch(
				`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyCz-XsPJkn4Mn0nzKtF01hHGwMbGAaBEzE`
			);
			let respJson = await resp.json();
			let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
			let coords = points.map((point, index) => {
				return {
					latitude: point[0],
					longitude: point[1]
				};
			});
			this.setState({ coords: coords });
			this.setState({ x: 'true' });
			return coords;
		} catch (error) {
			console.log(error);
			this.setState({ x: 'error' });
			return error;
		}
	}

	createHouseDetailsItems() {
		let res = [];
		const ITEMS = [
			{
				icon: "phone",
				title: "Phone",
				subtitle: this.state.contactInfo.phoneNumber
			},
			{
				icon: "inbox",
				title: "Address",
				subtitle: this.state.targetAddress
			}
		];
		for (let i = 0; i < ITEMS.length; i++) {
			const item = ITEMS[i];
			res.push(<ListItems.HouseDetailListItem key={i} {...item} />);
		}

		return res;
	}

	foundChild() {
		this.props.onFoundChild();
	}

	updateTargetCoords(targetCoords) {
		console.log('target coords');
		console.log(targetCoords);
		
		// targetCoords.latitude = 30;
		// targetCoords.longitude = 30;
		this.setState({
			targetCoords
		});

		this.forceUpdate();
		console.log('force update');

		Geocode.fromLatLng(this.state.targetCoords.latitude, this.state.targetCoords.longitude).then(
			(response) => {
			  this.setState({
				targetAddress: response.results[0].formatted_address,
			  });
			},
			(error) => {
			  // console.error(error);
			},
		  );
	}

	render() {
		console.log('render was started');
		console.log(this.state.targetCoords);

		let targetMarker = (
			<React.Fragment />
		);
		if (this.state.targetCoords.latitude) {
			targetMarker = (
			<MapView.Marker
				coordinate={{
					latitude: this.state.targetCoords.latitude,
					longitude: this.state.targetCoords.longitude,
				}}
			/>);
		}
		return (
			<Modal
				visible={true}
				animationType="slide"
				transparent={false}
				onRequestClose={() => null}
			>
				<Container>
				<Headers.BackButtonHeader
					title="Find Child"
					nomargin={true}
					closeIcon={true}
					onBackPress={() => this.props.onCloseIconPress()}
				/>
					<View style={{ height: 300 }}>
						<MapView
							style={styles.map}
							showUserLocation
							followUserLocation
							loadingEnabled
							region={this.getMapRegion()}
							provider={PROVIDER_GOOGLE}
						>
							<Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
							<Marker.Animated
								ref={marker => {
									this.marker = marker;
								}}
								coordinate={this.state.coordinate} />
								{targetMarker}
						</MapView>
					</View>
					<Content style={styles.content}>
						<Text style={styles.price}>Information</Text>
						<View style={{ marginBottom: 5 }}>{this.createHouseDetailsItems()}</View>
					</Content>

					<View style={{ padding: 8 }}>
						<Buttons.LgButton text="RETURNED WITH CHILD" onPress={() => this.foundChild()} />
					</View>
				</Container>
			</Modal>
		);
	}
}

const styles = {
	content: {
		padding: 16
	},
	image: {
		flex: 1,
		width: undefined,
		height: undefined,
		alignSelf: 'stretch'
	},
	title: {
		fontFamily: 'AvenirMedium',
		fontSize: 15,
		color: '#000'
	},
	subtitle: {
		fontFamily: 'AvenirMedium',
		fontSize: 13,
		color: '#5F5F5F',
		marginTop: 5
	},
	price: {
		fontFamily: 'LatoBlack',
		fontSize: 17,
		color: '#000',
		marginTop: 15
	},
	map: {
		height: 300
	},
	bubble: {
		flex: 1,
		backgroundColor: "rgba(255,255,255,0.7)",
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 20
	},
	latlng: {
		width: 200,
		alignItems: "stretch"
	},
	button: {
		width: 80,
		paddingHorizontal: 12,
		alignItems: "center",
		marginHorizontal: 10
	},
	buttonContainer: {
		flexDirection: "row",
		marginVertical: 20,
		backgroundColor: "transparent"
	}
};

export default FindChild;
