import React, { Component } from 'react';
import { View, BackHandler, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import { Container } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';
import TimerMixin from 'react-timer-mixin';

import styles from './styles';
import globalStyles from "../../components/globalStyles";

import { Constants } from '../../config';
import { Headers, Misc, Forms, Modals } from '../../components';
import Childrens from '../childrens/Childrens';
import ChildrensEmpty from '../childrens/ChildrensEmpty';
import AddChild from '../add-child/AddChild';

import childService from '../../services/childService';
import userService from '../../services/userService';
import Fire from '../../services/fire';
import FindChild from '../find-child/FindChild';

import firebase from 'firebase';


import registerForPushNotificationsAsync from '../../services/registerForPushNotificationsAsync';

mixins: [TimerMixin];

const IoniconsHeaderButton = (props) => (
	// the `props` here come from <Item .../>
	// you may access them and pass something else to `HeaderButton` if you like
	<HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color="black" />
);

class Dashboard extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			headerTitle: 'Profile',
			headerRight: (
				<HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
					<Item
						title="search"
						iconName="ios-menu"
						onPress={() => navigation.state.params.obj.onAddProfile(navigation.state.params.obj)}
					/>
				</HeaderButtons>
			)
		};
	};

	constructor(props) {
		super(props);

		const date = new Date();
		this.currDate = date;

		this.status = 0;
		this.findChildPage = null;

		this.onAddChild = this.onAddChild.bind(this);

		this.state = {
			showAddChild: false,
			contactOwnerModalVisible: false,
			contactInfo: {
				phoneNumber: ''
			},
			profile: {},
			isBusy: false,
			showFindChild: false,
			selectedChild: {
				name: ''
			},
			currentPage: 1,
			activeExploreTabItem: Constants.EXPLORE_TAB_LABELS[0],
			houseListSearchText: '',
			profileFormBusy: false,
			profileName: Constants.PROFILE_NAME,
			profileMobileNumber: Constants.PROFILE_MOBILE_NUMBER,
			profileContactShare: false,
			profileLocationEnabled: false,
			notificationsEnabled: false,
			filterCategories: Constants.FILTER_CATEGORIES,
			activeFilterCategories: [],
			filterMinPrice: 500,
			filterMaxPrice: 11000,
			filterStartPrice: 3500,
			filterStopPrice: 7500,
			filterFormBusy: false,
			enableLocationModalVisible: false,
			enableContactShareModalVisible: false,
			rentalsListings: Constants.RENTAL_LISTINGS
		};
	}

	componentDidMount() {
		console.log("Component did mount ")
		registerForPushNotificationsAsync().then(data => {
			console.log("register returned");
			console.log(data);
		});

/*
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		  );
		  let finalStatus = existingStatus;
		
		  // only ask if permissions have not already been determined, because
		  // iOS won't necessarily prompt the user a second time.
		  if (existingStatus !== 'granted') {
			// Android remote notification permissions are granted during the app
			// install, so this will only ask on iOS
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		  }
		
		  // Stop here if the user did not grant permissions
		  if (finalStatus !== 'granted') {
			return;
		  }
		  */

		this.props.navigation.setParams({ obj: this });
		
		userService.getProfile().then((data) => {
			this.setState({
				profile: data.data
			});
		});

		// const childrenData = childService.getChildrenList();
		this.reloadList();

		return;
		Fire.shared.on((message) => {
			if (this.currDate >= message.timestamp) {
				return;
			}

			if (this.status < 1) {
				return;
			}

			this.processMessage(message);
		});

		console.log(Fire.shared.timestamp);

		setTimeout(() => {
			this.status = 1; // ready
		}, 1000);

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

	}

	componentWillMount() {
		
	}
	
	async componentWillUnmount() {
		console.log('Dismount');
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	handleBackButton() {
		return true;
	}

	/**
	 * send position
	 */
	sendPosition(lat, lng) {
		this.sendMessage(JSON.stringify({
			cmd: 'pos',
			data: {
				pos: {
					latitude: lat,
					longitude: lng
				}
			}
		}));
	}

	processMessage(message) {
		console.log(message);
		console.log('status:' + this.status);

		const msgText = message.text;

		const msgObj = JSON.parse(msgText);

		if (msgObj.cmd == 'find') {
			if (this.status == 1) {

				let found = false;
				let selectedChild = undefined;
				const bandId = msgObj.data.bandId;

				this.state.children.forEach(function (child, i) {
					if (child.bandId == bandId) {
						found = true;
						selectedChild = child;
					}
				});
				if (found && selectedChild) {
					this.bandId = bandId;
					this.remoteUserId = message.user._id;
						
					this.setState({
						contactOwnerModalVisible: true,
						contactInfo: msgObj.data,
						selectedChild: selectedChild
					});
					this.status = 2;
				} else {
					console.log("didn't match bandId = " + bandId);
				}
			}
		} else if (message.user._id == this.remoteUserId) {
			if (msgObj.cmd == 'pos') {
				this.setState({
					targetCoords: msgObj.data.pos
				});

				// update map
				if (this.findChildPage) {
					this.findChildPage.updateTargetCoords(this.state.targetCoords);
				}
			}
		} else {
			console.log('trash message');
			console.log(message.user._id);
			console.log(this.remoteUserId);
		}
	}

	sendMessage(text) {
		Fire.shared.send([{ text: text, user: this.user }]);
	}

	get user() {
		return {
			name: this.props.navigation.state.params.name,
			_id: Fire.shared.uid
		};
	}

	reloadList() {
		this.setState({
			isBusy: true
		});
		childService.getChildrenList().then((data) => {
			// setTimeout(() => {
			this.setState({
				isBusy: false
			});
			setTimeout(() => {
				const hasChildrens = data.data.length > 0;
				this.setState({
					showAddChild: false,
					hasChildrens: hasChildrens,
					children: data.data /*,
					contactOwnerModalVisible: true*/
				});
			}, 500);
			// }, 5000);
		});
	}

	/**
	 * show add child dialog
	 * 
	 */
	onGotoAddChild() {
		/*
		this.props.navigation.navigate('_addChild', {
			onAdd: () => this.addChildren()
		});
		*/
		this.setState({
			showAddChild: true
		});
	}

	/**
	 * the callback when one child was added
	 * 
	 */
	onAddChild() {
		this.setState({
			showAddChild: false
		});
		setTimeout(() => {
			Alert.alert(
				'Succss',
				'Please add another child if you want.',
				[
					{ text: 'Ask me later', onPress: () => this.reloadList() },
					{
						text: 'OK', onPress: () => setTimeout(() => {
							this.onGotoAddChild();
						}, 500)
					},
				],
				{ cancelable: false }
			);
		}, 1000);
	}

	/**
	 * close add child dialog
	 */
	onCloseIconPress() {
		this.setState({
			showAddChild: false
		});
		setTimeout(() => {
			this.reloadList();
		}, 1000);
	}

	onCloseIconPressFindChild() {
		this.onFoundChild();
	}

	/*
	addChildren(that) {
		that.setState({ showAddChild: true });
	}
	*/

	updateProfileNameField(name) {
		this.setState({ profileName: name });
	}

	updateProfileMobileNumberField(mobileNumber) {
		this.setState({ profileMobileNumber: mobileNumber });
	}

	updateProfileContactSharing(value) {
		if (value) {
			this.setState({ enableContactShareModalVisible: value });
		} else {
			this.setState({ profileContactShare: value });
		}
	}

	updateProfileLocationToggle(value) {
		if (value) {
			this.setState({ enableLocationModalVisible: value });
		} else {
			this.setState({ profileLocationEnabled: value });
		}
	}

	save() {
		this.setState({ profileFormBusy: true });
		setTimeout(() => {
			this.setState({ profileFormBusy: false });
		}, 5000);
	}

	onAddProfile(that) {
		that.props.navigation.navigate('_profile', {
			onLogoutPress: () => that.props.navigation.navigate('_home'),
			onRefresh: () => this.reloadList()
		});
	}

	onConnectFounder() {
		console.log('bandId = ' + this.bandId);
		this.sendMessage(
			JSON.stringify({
				cmd: 'agree',
				data: {
					profile: this.state.profile,
					bandId: this.bandId
				}
			})
		);

		this.setState({ contactOwnerModalVisible: false });
		setTimeout(() => {
			this.status = 3;
			this.setState({showFindChild: true});
			/*
			this.props.navigation.navigate('_findChild', {
				onRef: (ref) => {
					this.findChildPage = ref;
				},
				onFoundChild: () => this.onFoundChild(),
				contactInfo: this.state.contactInfo
			});
			*/
		}, 500);
	}

	onFoundChild() {
		this.sendMessage(JSON.stringify({ cmd: 'return'}));
		this.setState({showFindChild: false});
		setTimeout(() => {
			this.status = 1;
			this.reloadList();
		}, 1000);
		// this.props.navigation.navigate('_dashboard');
	}

	onDismissContact() {
		this.status = 1;
		this.sendMessage(JSON.stringify({ cmd: 'disagree', data: {
			bandId: this.bandId
		} }));
		this.setState({ contactOwnerModalVisible: false });
	}
	onReturnChild() {
		this.sendMessage(JSON.stringify({ cmd: 'return'}));
		setTimeout(() => {
			this.props.navigation.navigate('_returnChild');
		}, 1000);
	}

	onSelectChildren(childId) {
		this.props.navigation.navigate('_editChild', {
			childId: childId,
			onEdit: () => this.editChildren(),
			onRefresh: () => this.reloadList()
		});
	}

	onDeleteChildren(childId) {
		console.log("delete child");
	}

	editChildren() { }

	render() {
		return (
			<SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }} forceInset={{ top: 'never' }}>
				<Container>
					<Spinner
						visible={this.state.isBusy}
						textContent={'Loading...'}
						textStyle={globalStyles.spinnerTextStyle}
					/>
					{this.state.contactOwnerModalVisible && (
					<Modals.ContactOwnerModal
							isVisible={true}
							contactInfo={this.state.contactInfo}
							child={this.state.selectedChild}
							onDismissContact={() => {
								this.onDismissContact();
							}}
							onCallPress={() => {
								this.onConnectFounder();
							}}
						/>
					)}
					{!this.state.hasChildrens && (
						<ChildrensEmpty
							onAddChildrenPress={() => this.onGotoAddChild()}
							onConnectFounder={() => this.onConnectFounder()}
							onReturnChild={() => this.onReturnChild()}
						/>
					)}

					{this.state.hasChildrens && (
						<Childrens
							children={this.state.children}
							onBackButtonPress={() => {
								this.setState({ hasChildrens: false });
							}}
							onAddChildrenPress={() => this.onGotoAddChild()}
							onSelectChildren={(childId) => this.onSelectChildren(childId)}
							onDeleteChildren={(childId) => this.onDeleteChildren(childId)}
						/>
					)}

					{this.state.showAddChild && (
						<AddChild visible={this.state.showAddChild} onAdd={() => this.onAddChild()} onCloseIconPress={() => this.onCloseIconPress()} />
					)}

					{this.state.showFindChild === true && (
						<FindChild onCloseIconPress={() => this.onCloseIconPressFindChild()}
						onRef={(ref) => {
							this.findChildPage = ref;
						}}
						onFoundChild={() => this.onFoundChild()}
						contactInfo={this.state.contactInfo}
						sendPosition={(lat, lng) => this.sendPosition(lat, lng)}
							 />
					)}
				</Container>
			</SafeAreaView>
		);
	}
}

export default Dashboard;
