package com.glread;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyMapIntentModule extends ReactContextBaseJavaModule {

    public static final String REACTCLASSNAME = "MyMapIntentModule";
    private Context mContext;

    public MyMapIntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return REACTCLASSNAME;
    }
    /**
     * js页面跳转到activity 并传数据
     * @param name
     */
    @ReactMethod
    public void startActivityByClassname(String name){
        try{
            Activity currentActivity = getCurrentActivity();
            if(null!=currentActivity){
                Class aimActivity = Class.forName(name);
                Intent intent = new Intent(currentActivity,aimActivity);
                currentActivity.startActivity(intent);
            }
        }catch(Exception e){

            throw new JSApplicationIllegalArgumentException(
                    "无法打开activity页面: "+e.getMessage());
        }
    }

    public void sendPromiseTime(String name, Promise promise)
    {

    }

    public void callBackTime(String name, Callback callback)
    {

    }
}