import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../theme/colors';
import DottenLine from '../../components/DottenLine';
import PlainLine from '../../components/cards/PlainLine';

const About = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{padding: 10}}>
        <Text style={styles.heading}>About Us</Text>
        <PlainLine />
        <Text style={styles.bodyText}>
          QuickLoad is a revolutionary mobile platform connecting truck drivers
          and dealers across India. Our app streamlines the logistics process by
          providing a seamless booking system for transportation services.
          Whether you're a dealer looking to ship goods or a driver seeking
          loads, QuickLoad brings efficiency and transparency to the trucking
          industry.
        </Text>
      </View>
      <View style={{padding: 10}}>
        <Text style={styles.heading}>Our Purpose</Text>
        <PlainLine />
        <Text style={styles.bodyText}>
          We aim to revolutionize the transportation industry by creating a
          digital ecosystem where dealers can easily find verified drivers, and
          drivers can access legitimate shipping opportunities. Our platform
          features real-time load matching, transparent pricing, secure
          payments, and comprehensive shipment tracking. By digitizing the
          traditional booking process, we're making truck booking more
          efficient, reliable, and accessible for everyone in the logistics
          chain.
        </Text>
      </View>
      <View style={{padding: 10}}>
        <Text style={styles.heading}>Key Features</Text>
        <PlainLine />
        <Text style={styles.bodyText}>
          • Real-time load and truck matching{'\n'}• Verified drivers and
          dealers{'\n'}• Secure payment processing{'\n'}• Route rate monitoring
          {'\n'}• Digital documentation{'\n'}• Live shipment tracking{'\n'}•
          Bidding system for competitive pricing{'\n'}• 24/7 customer support
        </Text>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  heading: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'GothicA1-Regular',
  },
  bodyText: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'GothicA1-Regular',
    lineHeight: 20,
  },
});
