package com.resonanceaudiodummyapp;


import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.vr.sdk.audio.GvrAudioEngine;

public class BridgeModule extends ReactContextBaseJavaModule {
    BridgeModule(ReactApplicationContext context) {
        super(context);
    }

    private GvrAudioEngine gvrAudioEngine;
    private static String OBJECT_SOUND_FILE = "cube_sound.wav";
    private volatile int sourceId = GvrAudioEngine.INVALID_ID;

    @NonNull
    @Override
    public String getName() {
        return "BridgeModule";
    }

    @ReactMethod
    public void playAudio() {
        new Thread(
                new Runnable() {
                    @Override
                    public void run() {
                        gvrAudioEngine.playSound(sourceId, true /* looped playback */);
                        // Preload an unspatialized sound to be played on a successful trigger on the cube.
                        gvrAudioEngine.preloadSoundFile(OBJECT_SOUND_FILE);
                    }
                })
                .start();
    }

    @ReactMethod
    public void stopAudio() {
        gvrAudioEngine.stopSound(sourceId);
           gvrAudioEngine = new GvrAudioEngine(getReactApplicationContext(), GvrAudioEngine.RenderingMode.BINAURAL_HIGH_QUALITY);
        gvrAudioEngine.preloadSoundFile(OBJECT_SOUND_FILE);
        sourceId = gvrAudioEngine.createSoundObject(OBJECT_SOUND_FILE);
    }

    @ReactMethod
    public void changePosition(float x, float y, float z) {
        gvrAudioEngine.setSoundObjectPosition(sourceId, x, y, z);
    }

    @ReactMethod
    public void setFilePath(String filePath)  {
        OBJECT_SOUND_FILE = filePath;
        gvrAudioEngine = new GvrAudioEngine(getReactApplicationContext(), GvrAudioEngine.RenderingMode.BINAURAL_HIGH_QUALITY);
        gvrAudioEngine.preloadSoundFile(OBJECT_SOUND_FILE);
        sourceId = gvrAudioEngine.createSoundObject(OBJECT_SOUND_FILE);
    }
}