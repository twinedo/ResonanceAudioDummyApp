//
//  BridgeModule.m
//  ResonanceAudioDummyApp
//
//  Created by Techtic on 24/06/22.
//

#import "BridgeModule.h"
#import <React/RCTLog.h>
#import "GVRAudioEngine.h"

@implementation BridgeModule
RCT_EXPORT_MODULE(BridgeModule);

// Sample sound file names.
GVRAudioEngine *_gvr_audio_engine;
static NSString kObjectSoundFile = "cube_sound.wav";
int _sound_object_id = _gvr_audio_engine.INVALID_ID;

RCT_EXPORT_METHOD(playAudio)
{
  [_gvr_audio_engine playSound:_sound_object_id loopingEnabled:true];
  [_gvr_audio_engine preloadSoundFile: kObjectSoundFile];
  //Start audio playback
  [_gvr_audio_engine start];
}

RCT_EXPORT_METHOD(stopAudio:(NSString *)filePath)
{
  kObjectSoundFile filePath;
  [_gvr_audio_engine stopSound: _sound_object_id];
  _sound_object_id = [_gvr_audio_engine createSoundObject:kObjectSoundFile];
}

RCT_EXPORT_METHOD(changePosition:(float *)x y:(float *)y z:(float *)z )
{
 [_gvr_audio_engine setSoundObjectPosition:_sound_object_id
                                          x:x
                                          y:y
                                          z:z];
}

RCT_EXPORT_METHOD(setFilePath:(NSString *)filePath )
{
  kObjectSoundFile = filePath;
  // Initialize the GVRAudioEngine with high binaural rendering quality.
  // High binaural quality is the default rendering mode.
  _gvr_audio_engine =
      [[GVRAudioEngine alloc] initWithRenderingMode:kRenderingModeBinauralHighQuality];
  // Preload sound files.
  // This method can be called on mono and multi-channel Ambisonic sound files.
  [_gvr_audio_engine preloadSoundFile:kObjectSoundFile];
  // Create the first sound object
  _sound_object_id = [_gvr_audio_engine createSoundObject:kObjectSoundFile];
}
@end
