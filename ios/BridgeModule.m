//
//  BridgeModule.m
//  ResonanceAudioDummyApp
//
//  Created by Techtic on 24/06/22.
//

#import "BridgeModule.h"
#import <React/RCTLog.h>

@implementation BridgeModule
RCT_EXPORT_MODULE(BridgeModule);

RCT_EXPORT_METHOD(playAudio)
{
 
}
RCT_EXPORT_METHOD(stopAudio )
{
 
}
RCT_EXPORT_METHOD(changePosition:(float *)x y:(float *)y z:(float *)z )
{
 
}

RCT_EXPORT_METHOD(setFilePath:(NSString *)filePath )
{
  dispatch_async(dispatch_get_main_queue(), ^{

  UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"ROFL"
                                                      message:filePath
                                                      delegate:self
                                                      cancelButtonTitle:@"OK"
                                                      otherButtonTitles:nil];
  [alert show];
  });
}
@end
