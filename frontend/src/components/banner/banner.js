import React from 'react';
import {Platform} from 'react-native'
import {AdMobBanner} from 'expo-ads-admob';

function Banner(){

    const adUnitID = Platform.select({
        // https://developers.google.com/admob/ios/test-ads
        ios: 'ca-app-pub-8253150542949274/4998831574',
        // https://developers.google.com/admob/android/test-ads
        android: 'ca-app-pub-8253150542949274/7228628847',
      });
    return(
        <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={adUnitID}
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={(err)=>console.log(err)} />
    )
}

export default Banner