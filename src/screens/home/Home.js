import React, { Component } from 'react';
import { View, Image, Text, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Container } from 'native-base';
import Carousel from 'react-native-carousel-view';
import { Constants } from '../../config';
import userService  from "../../services/userService";
import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {dimensions: undefined}
  }

  async componentWillMount() {
	const autoLogin = await userService.refreshToken();
    if (autoLogin) {
      const email = await userService.getCurrentEmail();
      this.props.navigation.navigate("_dashboard",{
        name: email
      });
	}
  }
  async onPressGetStarted() {		
	this.props.navigation.navigate("_login");
  }
	render() {
    const { width, height } = Dimensions.get('window');
    console.log("height=" + height);
    const mainViewHeight = height - 100;
		return (
			<SafeAreaView
				style={{ backgroundColor: '#FFF', flex: 1, flexDirection: 'column' }}
				forceInset={{ top: 'never' }}
			>
				<Container style={{ flex: 1 }}>
					<Container style={{ flex: 0.9 }}>
						<Carousel
							flex={1}
							width={null}
							height={mainViewHeight}
							delay={2000}
							indicatorAtBottom={true}
							indicatorSize={20}
							indicatorColor="#808080"
							inactiveIndicatorColor="#cccccc"
							animate={false}
							loop={true}
						>
							<View style={styles.contentContainer}>
								<View style={styles.page1Header}>
									<View style={styles.hh1} />
									<View style={styles.hh1}>
										<Text style={styles.page1LogoText}>Welcome to</Text>
										<View style={styles.page1LogoContainer}>
											<Image
												resizeMode={'contain'}
												source={require('../../assets/images/logos/kinder-logo-black.png')}
												style={styles.page1Logo}
											/>
										</View>
									</View>
									<View style={styles.hh1} />
								</View>
								<View style={styles.page1DescContainer}>
									<Text style={styles.page1DescText}>
										KinderID is an easy to use, smart &amp; affordable safety solution, that helps
										you find your child if they gets lost.
									</Text>
								</View>
								<View style={styles.page1GetStartContainer}>
									<Text style={styles.page1GetStartText} onPress={() => this.onPressGetStarted()}>Get started</Text>
								</View>
							</View>
							<View style={styles.contentContainer}>
								<View style={styles.page2Header}>
									<View style={styles.hh1} />
									<View style={styles.hh1}>
										<View style={styles.page2LogoContainer}>
											<Image
												resizeMode={'contain'}
												source={require('../../assets/images/house.png')}
												style={styles.page2Logo}
											/>
										</View>
									</View>
									<View style={styles.hh1} />
								</View>
								<View style={styles.page1DescContainer}>
                  <Text style={styles.page2DescTitle}>
										Register
									</Text>
                  <Text style={styles.page2DescText}>
										KinderID is an easy to use, smart &amp; affordable safety solution, that helps
										you find your child if they gets lost.
									</Text>
								</View>
								<View style={styles.page1GetStartContainer}>
									<Text style={styles.page1GetStartText} onPress={() => this.onPressGetStarted()}>Get started</Text>
								</View>
							</View>
							<View style={styles.contentContainer}>
                <View style={styles.page2Header}>
									<View style={styles.hh1} />
									<View style={styles.hh1}>
										<View style={styles.page2LogoContainer}>
											<Image
												resizeMode={'contain'}
												source={require('../../assets/images/house.png')}
												style={styles.page2Logo}
											/>
										</View>
									</View>
									<View style={styles.hh1} />
								</View>
								<View style={styles.page1DescContainer}>
                  <Text style={styles.page2DescTitle}>
										Add wristband
									</Text>
                  <Text style={styles.page2DescText}>
										KinderID is an easy to use, smart &amp; affordable safety solution, that helps
										you find your child if they gets lost.
									</Text>
								</View>
								<View style={styles.page1GetStartContainer}>
									<Text style={styles.page1GetStartText} onPress={() => this.onPressGetStarted()}>Get started</Text>
								</View>
							</View>

              <View style={styles.contentContainer}>
                <View style={styles.page2Header}>
									<View style={styles.hh1} />
									<View style={styles.hh1}>
										<View style={styles.page2LogoContainer}>
											<Image
												resizeMode={'contain'}
												source={require('../../assets/images/house.png')}
												style={styles.page2Logo}
											/>
										</View>
									</View>
									<View style={styles.hh1} />
								</View>
								<View style={styles.page1DescContainer}>
                  <Text style={styles.page2DescTitle}>
										You are ready!
									</Text>
                  <Text style={styles.page2DescText}>
										KinderID is an easy to use, smart &amp; affordable safety solution, that helps
										you find your child if they gets lost.
									</Text>
								</View>
								<View style={styles.page1GetStartContainer}>
									<Text style={styles.page1GetStartText} onPress={() => this.onPressGetStarted()}>Get started</Text>
								</View>
							</View>
						</Carousel>
					</Container>
				</Container>
				<View style={styles.footer}>
					<Text style={styles.footerText}>Copyright @ 2019. All rights reserved to Safety Innocation AS</Text>
				</View>
			</SafeAreaView>
		);
  }
  
}

export default Home;
