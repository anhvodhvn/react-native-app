import React, { useState, useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const app_health = 'https://demo-pnp-azurewebsites.net';

const PLATFORM_TYPES = {
  IOS: 'ios',
  ANDROID: 'android',
};

function Health() {
  const webViewRef = useRef(null);
  const [fileDownloading, setFileDownloading] = useState(false);

  const handleError = e => {
    console.log('ERROR:', e);
  };

  useEffect(() => {
    const init = () => {
      (Platform.OS === PLATFORM_TYPES.IOS)
      ? console.log('===> Current OS Device: iOS')
      : console.log('===> Current OS Device: Android');
    };
    init();
  }, [])

  return (
    (Platform.OS === PLATFORM_TYPES.IOS) 
    ? <WebView
        ref={webViewRef}
        //renderLoading={LoadingIndicator}
        useWebKit
        originWhitelist={['*']}
        bounces={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={true}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        source={{ uri: app_health }}
        onHttpError={handleError}
        onNavigationStateChange={e => {
          console.log('- onNavigationStateChangeIos:', e);
        }}
      />
    : <WebView
        ref={webViewRef}
        //renderLoading={LoadingIndicator}
        useWebKit
        originWhitelist={['*']}
        bounces={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={true}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        javaScriptEnabledAndroid={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        source={{ uri: app_health }}
        onHttpError={handleError}
        onNavigationStateChange={e => {
          console.log('- onNavigationStateChangeAndroid:', e);
        }}
        onRenderProcessGone={e => {
          console.log('- onRenderProcessGone...', e); 
        }}
        onContentSizeChange={e => {
          console.log('- onContentSizeChange...', e); 
        }}
        setSupportMultipleWindow={true}
        thirdPartyCookiesEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
      />    
  );
}

export default Health;
