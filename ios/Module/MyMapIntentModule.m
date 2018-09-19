//
//  MyMapIntentModule.m
//  GLRead
//
//  Created by 陈 on 2018/7/5.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "MyMapIntentModule.h"

@implementation MyMapIntentModule
//  必须实现
RCT_EXPORT_MODULE(MyMapIntentModule);

RCT_EXPORT_METHOD(startActivityByClassname:(NSString *)name)
{
  NSLog(@"%@", name);
}

RCT_EXPORT_METHOD(callBackTime:(NSString *)name callBlock:(RCTResponseSenderBlock)callBlock)
{
  callBlock(@[@"dd"]);

}

RCT_REMAP_METHOD(sendPromiseTime, resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)reject){
  
}
RCT_REMAP_METHOD(testRespondMethod,
                 name:(NSString *)name
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  if([self respondsToSelector:NSSelectorFromString(name)]) {
    resolve(@YES);
  }
  else {
    reject(@"-1001", @"not respond this method", nil);
  }
}
@end
