import{html,Polymer,dom,mixinBehaviors,PolymerElement,Base,dedupingMixin,useShadow,dashToCamelCase,FlattenedNodesObserver,microTask,DomIf,afterNextRender,Templatizer,OptionalMutableDataBehavior,animationFrame,idlePeriod,flush,Debouncer,enqueueDebouncer,matches as matches$1,translate,templatize,beforeNextRender,gestures,calculateSplices}from"chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";import{sendWithPromise,addWebUiListener,removeWebUiListener}from"chrome://resources/js/cr.js";import{loadTimeData}from"chrome://resources/js/load_time_data.js";import{MojoInterfaceProviderImpl}from"chrome://resources/ash/common/network/mojo_interface_provider.js";import{CrosNetworkConfigObserverReceiver,ActivationStateType,InhibitReason,SecurityType,VpnType,ProxyMode,AuthenticationType,MatchType,HiddenSsidMode,SubjectAltName_Type,FilterType,NO_LIMIT}from"chrome://resources/mojo/chromeos/services/network_config/public/mojom/cros_network_config.mojom-webui.js";import{PortalState,ConnectionStateType,DeviceStateType,NetworkType,OncSource,PolicySource,IPConfigType}from"chrome://resources/mojo/chromeos/services/network_config/public/mojom/network_types.mojom-webui.js";import{mojo}from"chrome://resources/mojo/mojo/public/js/bindings.js";import{loadTimeData as loadTimeData$1}from"chrome://resources/ash/common/load_time_data.m.js";import{ProfileState}from"chrome://resources/mojo/chromeos/ash/services/cellular_setup/public/mojom/esim_manager.mojom-webui.js";import{getESimManagerRemote,observeESimManager}from"chrome://resources/ash/common/cellular_setup/mojo_interface_provider.js";import"chrome://resources/mojo/services/network/public/mojom/ip_address.mojom-webui.js";import"../strings.m.js";import{AuthFactorConfig,RecoveryFactorEditor,PinFactorEditor}from"chrome://resources/mojo/chromeos/ash/services/auth_factor_config/public/mojom/auth_factor_config.mojom-webui.js";
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const template$a=html`
<custom-style>
  <style is="custom-style">
    html {

      /* Material Design color palette for Google products */

      --google-red-100-rgb: 244, 199, 195;  /* #f4c7c3 */
      --google-red-100: rgb(var(--google-red-100-rgb));
      --google-red-300-rgb: 230, 124, 115;  /* #e67c73 */
      --google-red-300: rgb(var(--google-red-300-rgb));
      --google-red-500-rgb: 219, 68, 55;  /* #db4437 */
      --google-red-500: rgb(var(--google-red-500-rgb));
      --google-red-700-rgb: 197, 57, 41;  /* #c53929 */
      --google-red-700: rgb(var(--google-red-700-rgb));

      --google-blue-100-rgb: 198, 218, 252;  /* #c6dafc */
      --google-blue-100: rgb(var(--google-blue-100-rgb));
      --google-blue-300-rgb: 123, 170, 247;  /* #7baaf7 */
      --google-blue-300: rgb(var(--google-blue-300-rgb));
      --google-blue-500-rgb: 66, 133, 244;  /* #4285f4 */
      --google-blue-500: rgb(var(--google-blue-500-rgb));
      --google-blue-700-rgb: 51, 103, 214;  /* #3367d6 */
      --google-blue-700: rgb(var(--google-blue-700-rgb));

      --google-green-100-rgb: 183, 225, 205;  /* #b7e1cd */
      --google-green-100: rgb(var(--google-green-100-rgb));
      --google-green-300-rgb: 87, 187, 138;  /* #57bb8a */
      --google-green-300: rgb(var(--google-green-300-rgb));
      --google-green-500-rgb: 15, 157, 88;  /* #0f9d58 */
      --google-green-500: rgb(var(--google-green-500-rgb));
      --google-green-700-rgb: 11, 128, 67;  /* #0b8043 */
      --google-green-700: rgb(var(--google-green-700-rgb));

      --google-yellow-100-rgb: 252, 232, 178;  /* #fce8b2 */
      --google-yellow-100: rgb(var(--google-yellow-100-rgb));
      --google-yellow-300-rgb: 247, 203, 77;  /* #f7cb4d */
      --google-yellow-300: rgb(var(--google-yellow-300-rgb));
      --google-yellow-500-rgb: 244, 180, 0;  /* #f4b400 */
      --google-yellow-500: rgb(var(--google-yellow-500-rgb));
      --google-yellow-700-rgb: 240, 147, 0;  /* #f09300 */
      --google-yellow-700: rgb(var(--google-yellow-700-rgb));

      --google-grey-100-rgb: 245, 245, 245;  /* #f5f5f5 */
      --google-grey-100: rgb(var(--google-grey-100-rgb));
      --google-grey-300-rgb: 224, 224, 224;  /* #e0e0e0 */
      --google-grey-300: rgb(var(--google-grey-300-rgb));
      --google-grey-500-rgb: 158, 158, 158;  /* #9e9e9e */
      --google-grey-500: rgb(var(--google-grey-500-rgb));
      --google-grey-700-rgb: 97, 97, 97;  /* #616161 */
      --google-grey-700: rgb(var(--google-grey-700-rgb));

      /* Material Design color palette from online spec document */

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      /* opacity for dark text on a light background */
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; /* or hint text or icon */
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      /* opacity for light text on a dark background */
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; /* or hint text or icon */
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;

    }

  </style>
</custom-style>
`;template$a.setAttribute("style","display: none;");document.head.appendChild(template$a.content);const styleMod$f=document.createElement("dom-module");styleMod$f.appendChild(html`
  <template>
    <style>
:host([hidden]),[hidden]{display:none!important}
    </style>
  </template>
`.content);styleMod$f.register("cr-hidden-style");const template$9=html`
<custom-style>
  <style>
html{--google-blue-50-rgb:232,240,254;--google-blue-50:rgb(var(--google-blue-50-rgb));--google-blue-100-rgb:210,227,252;--google-blue-100:rgb(var(--google-blue-100-rgb));--google-blue-200-rgb:174,203,250;--google-blue-200:rgb(var(--google-blue-200-rgb));--google-blue-300-rgb:138,180,248;--google-blue-300:rgb(var(--google-blue-300-rgb));--google-blue-400-rgb:102,157,246;--google-blue-400:rgb(var(--google-blue-400-rgb));--google-blue-500-rgb:66,133,244;--google-blue-500:rgb(var(--google-blue-500-rgb));--google-blue-600-rgb:26,115,232;--google-blue-600:rgb(var(--google-blue-600-rgb));--google-blue-700-rgb:25,103,210;--google-blue-700:rgb(var(--google-blue-700-rgb));--google-blue-800-rgb:24,90,188;--google-blue-800:rgb(var(--google-blue-800-rgb));--google-blue-900-rgb:23,78,166;--google-blue-900:rgb(var(--google-blue-900-rgb));--google-green-50-rgb:230,244,234;--google-green-50:rgb(var(--google-green-50-rgb));--google-green-200-rgb:168,218,181;--google-green-200:rgb(var(--google-green-200-rgb));--google-green-300-rgb:129,201,149;--google-green-300:rgb(var(--google-green-300-rgb));--google-green-400-rgb:91,185,116;--google-green-400:rgb(var(--google-green-400-rgb));--google-green-500-rgb:52,168,83;--google-green-500:rgb(var(--google-green-500-rgb));--google-green-600-rgb:30,142,62;--google-green-600:rgb(var(--google-green-600-rgb));--google-green-700-rgb:24,128,56;--google-green-700:rgb(var(--google-green-700-rgb));--google-green-800-rgb:19,115,51;--google-green-800:rgb(var(--google-green-800-rgb));--google-green-900-rgb:13,101,45;--google-green-900:rgb(var(--google-green-900-rgb));--google-grey-50-rgb:248,249,250;--google-grey-50:rgb(var(--google-grey-50-rgb));--google-grey-100-rgb:241,243,244;--google-grey-100:rgb(var(--google-grey-100-rgb));--google-grey-200-rgb:232,234,237;--google-grey-200:rgb(var(--google-grey-200-rgb));--google-grey-300-rgb:218,220,224;--google-grey-300:rgb(var(--google-grey-300-rgb));--google-grey-400-rgb:189,193,198;--google-grey-400:rgb(var(--google-grey-400-rgb));--google-grey-500-rgb:154,160,166;--google-grey-500:rgb(var(--google-grey-500-rgb));--google-grey-600-rgb:128,134,139;--google-grey-600:rgb(var(--google-grey-600-rgb));--google-grey-700-rgb:95,99,104;--google-grey-700:rgb(var(--google-grey-700-rgb));--google-grey-800-rgb:60,64,67;--google-grey-800:rgb(var(--google-grey-800-rgb));--google-grey-900-rgb:32,33,36;--google-grey-900:rgb(var(--google-grey-900-rgb));--google-grey-900-white-4-percent:#292a2d;--google-purple-200-rgb:215,174,251;--google-purple-200:rgb(var(--google-purple-200-rgb));--google-purple-900-rgb:104,29,168;--google-purple-900:rgb(var(--google-purple-900-rgb));--google-red-300-rgb:242,139,130;--google-red-300:rgb(var(--google-red-300-rgb));--google-red-500-rgb:234,67,53;--google-red-500:rgb(var(--google-red-500-rgb));--google-red-600-rgb:217,48,37;--google-red-600:rgb(var(--google-red-600-rgb));--google-yellow-50-rgb:254,247,224;--google-yellow-50:rgb(var(--google-yellow-50-rgb));--google-yellow-200-rgb:253,226,147;--google-yellow-200:rgb(var(--google-yellow-200-rgb));--google-yellow-300-rgb:253,214,51;--google-yellow-300:rgb(var(--google-yellow-300-rgb));--google-yellow-400-rgb:252,201,52;--google-yellow-400:rgb(var(--google-yellow-400-rgb));--google-yellow-500-rgb:251,188,4;--google-yellow-500:rgb(var(--google-yellow-500-rgb));--cr-primary-text-color:var(--google-grey-900);--cr-secondary-text-color:var(--google-grey-700);--cr-card-background-color:white;--cr-card-shadow-color-rgb:var(--google-grey-800-rgb);--cr-elevation-1:rgba(var(--cr-card-shadow-color-rgb), .3) 0 1px 2px 0,rgba(var(--cr-card-shadow-color-rgb), .15) 0 1px 3px 1px;--cr-elevation-2:rgba(var(--cr-card-shadow-color-rgb), .3) 0 1px 2px 0,rgba(var(--cr-card-shadow-color-rgb), .15) 0 2px 6px 2px;--cr-elevation-3:rgba(var(--cr-card-shadow-color-rgb), .3) 0 1px 3px 0,rgba(var(--cr-card-shadow-color-rgb), .15) 0 4px 8px 3px;--cr-elevation-4:rgba(var(--cr-card-shadow-color-rgb), .3) 0 2px 3px 0,rgba(var(--cr-card-shadow-color-rgb), .15) 0 6px 10px 4px;--cr-elevation-5:rgba(var(--cr-card-shadow-color-rgb), .3) 0 4px 4px 0,rgba(var(--cr-card-shadow-color-rgb), .15) 0 8px 12px 6px;--cr-card-shadow:var(--cr-elevation-2);--cr-checked-color:var(--google-blue-600);--cr-focused-item-color:var(--google-grey-300);--cr-form-field-label-color:var(--google-grey-700);--cr-hairline-rgb:0,0,0;--cr-iph-anchor-highlight-color:rgba(var(--google-blue-600-rgb), 0.1);--cr-link-color:var(--google-blue-700);--cr-menu-background-color:white;--cr-menu-background-focus-color:var(--google-grey-400);--cr-menu-shadow:0 2px 6px var(--paper-grey-500);--cr-separator-color:rgba(0, 0, 0, .06);--cr-title-text-color:rgb(90, 90, 90);--cr-toolbar-background-color:white;--cr-hover-background-color:rgba(var(--google-grey-900-rgb), .1);--cr-active-background-color:rgba(var(--google-grey-900-rgb), .16);--cr-focus-outline-color:rgba(var(--google-blue-600-rgb), .4)}@media (prefers-color-scheme:dark){html{--cr-primary-text-color:var(--google-grey-200);--cr-secondary-text-color:var(--google-grey-500);--cr-card-background-color:var(--google-grey-900-white-4-percent);--cr-card-shadow-color-rgb:0,0,0;--cr-checked-color:var(--google-blue-300);--cr-focused-item-color:var(--google-grey-800);--cr-form-field-label-color:var(--dark-secondary-color);--cr-hairline-rgb:255,255,255;--cr-iph-anchor-highlight-color:rgba(var(--google-grey-100-rgb), 0.1);--cr-link-color:var(--google-blue-300);--cr-menu-background-color:var(--google-grey-900);--cr-menu-background-focus-color:var(--google-grey-700);--cr-menu-background-sheen:rgba(255, 255, 255, .06);--cr-menu-shadow:rgba(0, 0, 0, .3) 0 1px 2px 0,rgba(0, 0, 0, .15) 0 3px 6px 2px;--cr-separator-color:rgba(255, 255, 255, .1);--cr-title-text-color:var(--cr-primary-text-color);--cr-toolbar-background-color:var(--google-grey-900-white-4-percent);--cr-hover-background-color:rgba(255, 255, 255, .1);--cr-active-background-color:rgba(var(--google-grey-200-rgb), .16);--cr-focus-outline-color:rgba(var(--google-blue-300-rgb), .4)}}@media (forced-colors:active){html{--cr-focus-outline-hcm:2px solid transparent;--cr-border-hcm:2px solid transparent}}html{--cr-button-edge-spacing:12px;--cr-button-height:32px;--cr-controlled-by-spacing:24px;--cr-default-input-max-width:264px;--cr-icon-ripple-size:36px;--cr-icon-ripple-padding:8px;--cr-icon-size:20px;--cr-icon-button-margin-start:16px;--cr-icon-ripple-margin:calc(var(--cr-icon-ripple-padding) * -1);--cr-section-min-height:48px;--cr-section-two-line-min-height:64px;--cr-section-padding:20px;--cr-section-vertical-padding:12px;--cr-section-indent-width:40px;--cr-section-indent-padding:calc(
      var(--cr-section-padding) + var(--cr-section-indent-width));--cr-section-vertical-margin:21px;--cr-centered-card-max-width:680px;--cr-centered-card-width-percentage:0.96;--cr-hairline:1px solid rgba(var(--cr-hairline-rgb), .14);--cr-separator-height:1px;--cr-separator-line:var(--cr-separator-height) solid var(--cr-separator-color);--cr-toolbar-overlay-animation-duration:150ms;--cr-toolbar-height:56px;--cr-container-shadow-height:6px;--cr-container-shadow-margin:calc(-1 * var(--cr-container-shadow-height));--cr-container-shadow-max-opacity:1;--cr-card-border-radius:8px;--cr-disabled-opacity:.38;--cr-form-field-bottom-spacing:16px;--cr-form-field-label-font-size:.625rem;--cr-form-field-label-height:1em;--cr-form-field-label-line-height:1}html[chrome-refresh-2023]{--cr-fallback-color-outline:rgb(116, 119, 117);--cr-fallback-color-primary:rgb(11, 87, 208);--cr-fallback-color-on-primary:rgb(255, 255, 255);--cr-fallback-color-primary-container:rgb(211, 227, 253);--cr-fallback-color-on-primary-container:rgb(4, 30, 73);--cr-fallback-color-secondary-container:rgb(194, 231, 255);--cr-fallback-color-on-secondary-container:rgb(0, 29, 53);--cr-fallback-color-neutral-container:rgb(242, 242, 242);--cr-fallback-color-surface:rgb(255, 255, 255);--cr-fallback-color-on-surface-rgb:31,31,31;--cr-fallback-color-on-surface:rgb(var(--cr-fallback-color-on-surface-rgb));--cr-fallback-color-surface-variant:rgb(225, 227, 225);--cr-fallback-color-on-surface-variant:rgb(68, 71, 70);--cr-fallback-color-tonal-outline:rgb(168, 199, 250);--cr-hover-background-color:var(--color-sys-state-hover,
      rgba(var(--cr-fallback-color-on-surface-rgb), .08));--cr-active-background-color:var(--color-sys-state-pressed,
      rgba(var(--cr-fallback-color-on-surface-rgb), .12));--cr-focus-outline-color:var(--color-sys-state-focus-ring,
      var(--cr-fallback-color-primary));--cr-primary-text-color:var(--color-primary-foreground,
      var(--cr-fallback-color-on-surface));--cr-secondary-text-color:var(--color-secondary-foreground,
      var(--cr-fallback-color-on-surface-variant));--cr-button-height:36px}@media (prefers-color-scheme:dark){html[chrome-refresh-2023]{--cr-fallback-color-outline:rgb(142, 145, 143);--cr-fallback-color-primary:rgb(168, 199, 250);--cr-fallback-color-on-primary:rgb(6, 46, 111);--cr-fallback-color-primary-container:rgb(8, 66, 160);--cr-fallback-color-on-primary-container:rgb(211, 227, 253);--cr-fallback-color-secondary-container:rgb(0, 74, 119);--cr-fallback-color-on-secondary-container:rgb(194, 231, 255);--cr-fallback-color-neutral-container:rgb(42, 42, 42);--cr-fallback-color-surface:rgb(26, 27, 30);--cr-fallback-color-on-surface-rgb:227,227,227;--cr-fallback-color-surface-variant:rgb(68, 71, 70);--cr-fallback-color-on-surface-variant:rgb(196, 199, 197);--cr-fallback-color-tonal-outline:rgb(0, 99, 155)}}
  </style>
</custom-style>
`;document.head.appendChild(template$9.content);
// Copyright 2012 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const CLASS_NAME="focus-outline-visible";const docsToManager=new Map;class FocusOutlineManager{constructor(doc){this.focusByKeyboard_=true;this.classList_=doc.documentElement.classList;doc.addEventListener("keydown",(()=>this.onEvent_(true)),true);doc.addEventListener("mousedown",(()=>this.onEvent_(false)),true);this.updateVisibility()}onEvent_(focusByKeyboard){if(this.focusByKeyboard_===focusByKeyboard){return}this.focusByKeyboard_=focusByKeyboard;this.updateVisibility()}updateVisibility(){this.visible=this.focusByKeyboard_}set visible(visible){this.classList_.toggle(CLASS_NAME,visible)}get visible(){return this.classList_.contains(CLASS_NAME)}static forDocument(doc){let manager=docsToManager.get(doc);if(!manager){manager=new FocusOutlineManager(doc);docsToManager.set(doc,manager)}return manager}}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var KEY_IDENTIFIER={"U+0008":"backspace","U+0009":"tab","U+001B":"esc","U+0020":"space","U+007F":"del"};var KEY_CODE={8:"backspace",9:"tab",13:"enter",27:"esc",33:"pageup",34:"pagedown",35:"end",36:"home",32:"space",37:"left",38:"up",39:"right",40:"down",46:"del",106:"*"};var MODIFIER_KEYS={shift:"shiftKey",ctrl:"ctrlKey",alt:"altKey",meta:"metaKey"};var KEY_CHAR=/[a-z0-9*]/;var IDENT_CHAR=/U\+/;var ARROW_KEY=/^arrow/;var SPACE_KEY=/^space(bar)?/;var ESC_KEY=/^escape$/;function transformKey(key,noSpecialChars){var validKey="";if(key){var lKey=key.toLowerCase();if(lKey===" "||SPACE_KEY.test(lKey)){validKey="space"}else if(ESC_KEY.test(lKey)){validKey="esc"}else if(lKey.length==1){if(!noSpecialChars||KEY_CHAR.test(lKey)){validKey=lKey}}else if(ARROW_KEY.test(lKey)){validKey=lKey.replace("arrow","")}else if(lKey=="multiply"){validKey="*"}else{validKey=lKey}}return validKey}function transformKeyIdentifier(keyIdent){var validKey="";if(keyIdent){if(keyIdent in KEY_IDENTIFIER){validKey=KEY_IDENTIFIER[keyIdent]}else if(IDENT_CHAR.test(keyIdent)){keyIdent=parseInt(keyIdent.replace("U+","0x"),16);validKey=String.fromCharCode(keyIdent).toLowerCase()}else{validKey=keyIdent.toLowerCase()}}return validKey}function transformKeyCode(keyCode){var validKey="";if(Number(keyCode)){if(keyCode>=65&&keyCode<=90){validKey=String.fromCharCode(32+keyCode)}else if(keyCode>=112&&keyCode<=123){validKey="f"+(keyCode-112+1)}else if(keyCode>=48&&keyCode<=57){validKey=String(keyCode-48)}else if(keyCode>=96&&keyCode<=105){validKey=String(keyCode-96)}else{validKey=KEY_CODE[keyCode]}}return validKey}function normalizedKeyForEvent(keyEvent,noSpecialChars){if(keyEvent.key){return transformKey(keyEvent.key,noSpecialChars)}if(keyEvent.detail&&keyEvent.detail.key){return transformKey(keyEvent.detail.key,noSpecialChars)}return transformKeyIdentifier(keyEvent.keyIdentifier)||transformKeyCode(keyEvent.keyCode)||""}function keyComboMatchesEvent(keyCombo,event){var keyEvent=normalizedKeyForEvent(event,keyCombo.hasModifiers);return keyEvent===keyCombo.key&&(!keyCombo.hasModifiers||!!event.shiftKey===!!keyCombo.shiftKey&&!!event.ctrlKey===!!keyCombo.ctrlKey&&!!event.altKey===!!keyCombo.altKey&&!!event.metaKey===!!keyCombo.metaKey)}function parseKeyComboString(keyComboString){if(keyComboString.length===1){return{combo:keyComboString,key:keyComboString,event:"keydown"}}return keyComboString.split("+").reduce((function(parsedKeyCombo,keyComboPart){var eventParts=keyComboPart.split(":");var keyName=eventParts[0];var event=eventParts[1];if(keyName in MODIFIER_KEYS){parsedKeyCombo[MODIFIER_KEYS[keyName]]=true;parsedKeyCombo.hasModifiers=true}else{parsedKeyCombo.key=keyName;parsedKeyCombo.event=event||"keydown"}return parsedKeyCombo}),{combo:keyComboString.split(":").shift()})}function parseEventString(eventString){return eventString.trim().split(" ").map((function(keyComboString){return parseKeyComboString(keyComboString)}))}const IronA11yKeysBehavior={properties:{keyEventTarget:{type:Object,value:function(){return this}},stopKeyboardEventPropagation:{type:Boolean,value:false},_boundKeyHandlers:{type:Array,value:function(){return[]}},_imperativeKeyBindings:{type:Object,value:function(){return{}}}},observers:["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],keyBindings:{},registered:function(){this._prepKeyBindings()},attached:function(){this._listenKeyEventListeners()},detached:function(){this._unlistenKeyEventListeners()},addOwnKeyBinding:function(eventString,handlerName){this._imperativeKeyBindings[eventString]=handlerName;this._prepKeyBindings();this._resetKeyEventListeners()},removeOwnKeyBindings:function(){this._imperativeKeyBindings={};this._prepKeyBindings();this._resetKeyEventListeners()},keyboardEventMatchesKeys:function(event,eventString){var keyCombos=parseEventString(eventString);for(var i=0;i<keyCombos.length;++i){if(keyComboMatchesEvent(keyCombos[i],event)){return true}}return false},_collectKeyBindings:function(){var keyBindings=this.behaviors.map((function(behavior){return behavior.keyBindings}));if(keyBindings.indexOf(this.keyBindings)===-1){keyBindings.push(this.keyBindings)}return keyBindings},_prepKeyBindings:function(){this._keyBindings={};this._collectKeyBindings().forEach((function(keyBindings){for(var eventString in keyBindings){this._addKeyBinding(eventString,keyBindings[eventString])}}),this);for(var eventString in this._imperativeKeyBindings){this._addKeyBinding(eventString,this._imperativeKeyBindings[eventString])}for(var eventName in this._keyBindings){this._keyBindings[eventName].sort((function(kb1,kb2){var b1=kb1[0].hasModifiers;var b2=kb2[0].hasModifiers;return b1===b2?0:b1?-1:1}))}},_addKeyBinding:function(eventString,handlerName){parseEventString(eventString).forEach((function(keyCombo){this._keyBindings[keyCombo.event]=this._keyBindings[keyCombo.event]||[];this._keyBindings[keyCombo.event].push([keyCombo,handlerName])}),this)},_resetKeyEventListeners:function(){this._unlistenKeyEventListeners();if(this.isAttached){this._listenKeyEventListeners()}},_listenKeyEventListeners:function(){if(!this.keyEventTarget){return}Object.keys(this._keyBindings).forEach((function(eventName){var keyBindings=this._keyBindings[eventName];var boundKeyHandler=this._onKeyBindingEvent.bind(this,keyBindings);this._boundKeyHandlers.push([this.keyEventTarget,eventName,boundKeyHandler]);this.keyEventTarget.addEventListener(eventName,boundKeyHandler)}),this)},_unlistenKeyEventListeners:function(){var keyHandlerTuple;var keyEventTarget;var eventName;var boundKeyHandler;while(this._boundKeyHandlers.length){keyHandlerTuple=this._boundKeyHandlers.pop();keyEventTarget=keyHandlerTuple[0];eventName=keyHandlerTuple[1];boundKeyHandler=keyHandlerTuple[2];keyEventTarget.removeEventListener(eventName,boundKeyHandler)}},_onKeyBindingEvent:function(keyBindings,event){if(this.stopKeyboardEventPropagation){event.stopPropagation()}if(event.defaultPrevented){return}for(var i=0;i<keyBindings.length;i++){var keyCombo=keyBindings[i][0];var handlerName=keyBindings[i][1];if(keyComboMatchesEvent(keyCombo,event)){this._triggerKeyHandler(keyCombo,handlerName,event);if(event.defaultPrevented){return}}}},_triggerKeyHandler:function(keyCombo,handlerName,keyboardEvent){var detail=Object.create(keyCombo);detail.keyboardEvent=keyboardEvent;var event=new CustomEvent(keyCombo.event,{detail:detail,cancelable:true});this[handlerName].call(this,event);if(event.defaultPrevented){keyboardEvent.preventDefault()}}};var MAX_RADIUS_PX=300;var MIN_DURATION_MS=800;var distance=function(x1,y1,x2,y2){var xDelta=x1-x2;var yDelta=y1-y2;return Math.sqrt(xDelta*xDelta+yDelta*yDelta)};Polymer({_template:html`
    <style>
      :host {
        bottom: 0;
        display: block;
        left: 0;
        overflow: hidden;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        /* For rounded corners: http://jsbin.com/temexa/4. */
        transform: translate3d(0, 0, 0);
      }

      .ripple {
        background-color: currentcolor;
        left: 0;
        opacity: var(--paper-ripple-opacity, 0.25);
        pointer-events: none;
        position: absolute;
        will-change: height, transform, width;
      }

      .ripple,
      :host(.circle) {
        border-radius: 50%;
      }
    </style>
`,is:"paper-ripple",behaviors:[IronA11yKeysBehavior],properties:{center:{type:Boolean,value:false},holdDown:{type:Boolean,value:false,observer:"_holdDownChanged"},recenters:{type:Boolean,value:false},noink:{type:Boolean,value:false}},keyBindings:{"enter:keydown":"_onEnterKeydown","space:keydown":"_onSpaceKeydown","space:keyup":"_onSpaceKeyup"},created:function(){this.ripples=[]},attached:function(){this.keyEventTarget=this.parentNode.nodeType==11?dom(this).getOwnerRoot().host:this.parentNode;this.keyEventTarget=this.keyEventTarget;this.listen(this.keyEventTarget,"up","uiUpAction");this.listen(this.keyEventTarget,"down","uiDownAction")},detached:function(){this.unlisten(this.keyEventTarget,"up","uiUpAction");this.unlisten(this.keyEventTarget,"down","uiDownAction");this.keyEventTarget=null},simulatedRipple:function(){this.downAction();this.async(function(){this.upAction()}.bind(this),1)},uiDownAction:function(e){if(!this.noink)this.downAction(e)},downAction:function(e){if(this.ripples.length&&this.holdDown)return;this.debounce("show ripple",(function(){this.__showRipple(e)}),1)},clear:function(){this.__hideRipple();this.holdDown=false},showAndHoldDown:function(){this.ripples.forEach((ripple=>{ripple.remove()}));this.ripples=[];this.holdDown=true},__showRipple:function(e){var rect=this.getBoundingClientRect();var roundedCenterX=function(){return Math.round(rect.width/2)};var roundedCenterY=function(){return Math.round(rect.height/2)};var centered=!e||this.center;if(centered){var x=roundedCenterX();var y=roundedCenterY()}else{var sourceEvent=e.detail.sourceEvent;var x=Math.round(sourceEvent.clientX-rect.left);var y=Math.round(sourceEvent.clientY-rect.top)}var corners=[{x:0,y:0},{x:rect.width,y:0},{x:0,y:rect.height},{x:rect.width,y:rect.height}];var cornerDistances=corners.map((function(corner){return Math.round(distance(x,y,corner.x,corner.y))}));var radius=Math.min(MAX_RADIUS_PX,Math.max.apply(Math,cornerDistances));var startTranslate=x-radius+"px, "+(y-radius)+"px";if(this.recenters&&!centered){var endTranslate=roundedCenterX()-radius+"px, "+(roundedCenterY()-radius)+"px"}else{var endTranslate=startTranslate}var ripple=document.createElement("div");ripple.classList.add("ripple");ripple.style.height=ripple.style.width=2*radius+"px";this.ripples.push(ripple);this.shadowRoot.appendChild(ripple);ripple.animate({transform:["translate("+startTranslate+") scale(0)","translate("+endTranslate+") scale(1)"]},{duration:Math.max(MIN_DURATION_MS,Math.log(radius)*radius)||0,easing:"cubic-bezier(.2, .9, .1, .9)",fill:"forwards"})},uiUpAction:function(e){if(!this.noink)this.upAction()},upAction:function(e){if(!this.holdDown)this.debounce("hide ripple",(function(){this.__hideRipple()}),1)},__hideRipple:function(){Promise.all(this.ripples.map((function(ripple){return new Promise((function(resolve){var removeRipple=function(){ripple.remove();resolve()};var opacity=getComputedStyle(ripple).opacity;if(!opacity.length){removeRipple()}else{var animation=ripple.animate({opacity:[opacity,0]},{duration:150,fill:"forwards"});animation.addEventListener("finish",removeRipple);animation.addEventListener("cancel",removeRipple)}}))}))).then(function(){this.fire("transitionend")}.bind(this));this.ripples=[]},_onEnterKeydown:function(){this.uiDownAction();this.async(this.uiUpAction,1)},_onSpaceKeydown:function(){this.uiDownAction()},_onSpaceKeyup:function(){this.uiUpAction()},_holdDownChanged:function(newHoldDown,oldHoldDown){if(oldHoldDown===undefined)return;if(newHoldDown)this.downAction();else this.upAction()}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronControlState={properties:{focused:{type:Boolean,value:false,notify:true,readOnly:true,reflectToAttribute:true},disabled:{type:Boolean,value:false,notify:true,observer:"_disabledChanged",reflectToAttribute:true},_oldTabIndex:{type:String},_boundFocusBlurHandler:{type:Function,value:function(){return this._focusBlurHandler.bind(this)}}},observers:["_changedControlState(focused, disabled)"],ready:function(){this.addEventListener("focus",this._boundFocusBlurHandler,true);this.addEventListener("blur",this._boundFocusBlurHandler,true)},_focusBlurHandler:function(event){this._setFocused(event.type==="focus");return},_disabledChanged:function(disabled,old){this.setAttribute("aria-disabled",disabled?"true":"false");this.style.pointerEvents=disabled?"none":"";if(disabled){this._oldTabIndex=this.getAttribute("tabindex");this._setFocused(false);this.tabIndex=-1;this.blur()}else if(this._oldTabIndex!==undefined){if(this._oldTabIndex===null){this.removeAttribute("tabindex")}else{this.setAttribute("tabindex",this._oldTabIndex)}}},_changedControlState:function(){if(this._controlStateChanged){this._controlStateChanged()}}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronButtonStateImpl={properties:{pressed:{type:Boolean,readOnly:true,value:false,reflectToAttribute:true,observer:"_pressedChanged"},toggles:{type:Boolean,value:false,reflectToAttribute:true},active:{type:Boolean,value:false,notify:true,reflectToAttribute:true},pointerDown:{type:Boolean,readOnly:true,value:false},receivedFocusFromKeyboard:{type:Boolean,readOnly:true},ariaActiveAttribute:{type:String,value:"aria-pressed",observer:"_ariaActiveAttributeChanged"}},listeners:{down:"_downHandler",up:"_upHandler",tap:"_tapHandler"},observers:["_focusChanged(focused)","_activeChanged(active, ariaActiveAttribute)"],keyBindings:{"enter:keydown":"_asyncClick","space:keydown":"_spaceKeyDownHandler","space:keyup":"_spaceKeyUpHandler"},_mouseEventRe:/^mouse/,_tapHandler:function(){if(this.toggles){this._userActivate(!this.active)}else{this.active=false}},_focusChanged:function(focused){this._detectKeyboardFocus(focused);if(!focused){this._setPressed(false)}},_detectKeyboardFocus:function(focused){this._setReceivedFocusFromKeyboard(!this.pointerDown&&focused)},_userActivate:function(active){if(this.active!==active){this.active=active;this.fire("change")}},_downHandler:function(event){this._setPointerDown(true);this._setPressed(true);this._setReceivedFocusFromKeyboard(false)},_upHandler:function(){this._setPointerDown(false);this._setPressed(false)},_spaceKeyDownHandler:function(event){var keyboardEvent=event.detail.keyboardEvent;var target=dom(keyboardEvent).localTarget;if(this.isLightDescendant(target))return;keyboardEvent.preventDefault();keyboardEvent.stopImmediatePropagation();this._setPressed(true)},_spaceKeyUpHandler:function(event){var keyboardEvent=event.detail.keyboardEvent;var target=dom(keyboardEvent).localTarget;if(this.isLightDescendant(target))return;if(this.pressed){this._asyncClick()}this._setPressed(false)},_asyncClick:function(){this.async((function(){this.click()}),1)},_pressedChanged:function(pressed){this._changedButtonState()},_ariaActiveAttributeChanged:function(value,oldValue){if(oldValue&&oldValue!=value&&this.hasAttribute(oldValue)){this.removeAttribute(oldValue)}},_activeChanged:function(active,ariaActiveAttribute){if(this.toggles){this.setAttribute(this.ariaActiveAttribute,active?"true":"false")}else{this.removeAttribute(this.ariaActiveAttribute)}this._changedButtonState()},_controlStateChanged:function(){if(this.disabled){this._setPressed(false)}else{this._changedButtonState()}},_changedButtonState:function(){if(this._buttonStateChanged){this._buttonStateChanged()}}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const PaperRippleBehavior={properties:{noink:{type:Boolean,observer:"_noinkChanged"},_rippleContainer:{type:Object}},_buttonStateChanged:function(){if(this.focused){this.ensureRipple()}},_downHandler:function(event){IronButtonStateImpl._downHandler.call(this,event);if(this.pressed){this.ensureRipple(event)}},ensureRipple:function(optTriggeringEvent){if(!this.hasRipple()){this._ripple=this._createRipple();this._ripple.noink=this.noink;var rippleContainer=this._rippleContainer||this.root;if(rippleContainer){dom(rippleContainer).appendChild(this._ripple)}if(optTriggeringEvent){var domContainer=dom(this._rippleContainer||this);var target=dom(optTriggeringEvent).rootTarget;if(domContainer.deepContains(target)){this._ripple.uiDownAction(optTriggeringEvent)}}}},getRipple:function(){this.ensureRipple();return this._ripple},hasRipple:function(){return Boolean(this._ripple)},_createRipple:function(){var element=document.createElement("paper-ripple");return element},_noinkChanged:function(noink){if(this.hasRipple()){this._ripple.noink=noink}}};function getTemplate$12(){return html`<!--_html_template_start_-->    <style include="cr-hidden-style">:host{--active-shadow-rgb:var(--google-grey-800-rgb);--active-shadow-action-rgb:var(--google-blue-500-rgb);--bg-action:var(--google-blue-600);--border-color:var(--google-grey-300);--disabled-bg-action:var(--google-grey-100);--disabled-bg:white;--disabled-border-color:var(--google-grey-100);--disabled-text-color:var(--google-grey-600);--focus-shadow-color:rgba(var(--google-blue-600-rgb), .4);--hover-bg-action:rgba(var(--google-blue-600-rgb), .9);--hover-bg-color:rgba(var(--google-blue-500-rgb), .04);--hover-border-color:var(--google-blue-100);--hover-shadow-action-rgb:var(--google-blue-500-rgb);--ink-color-action:white;--ink-color:var(--google-blue-600);--ripple-opacity-action:.32;--ripple-opacity:.1;--text-color-action:white;--text-color:var(--google-blue-600)}@media (prefers-color-scheme:dark){:host{--active-bg:black linear-gradient(rgba(255, 255, 255, .06),
                                             rgba(255, 255, 255, .06));--active-shadow-rgb:0,0,0;--active-shadow-action-rgb:var(--google-blue-500-rgb);--bg-action:var(--google-blue-300);--border-color:var(--google-grey-700);--disabled-bg-action:var(--google-grey-800);--disabled-bg:transparent;--disabled-border-color:var(--google-grey-800);--disabled-text-color:var(--google-grey-500);--focus-shadow-color:rgba(var(--google-blue-300-rgb), .5);--hover-bg-action:var(--bg-action) linear-gradient(rgba(0, 0, 0, .08), rgba(0, 0, 0, .08));--hover-bg-color:rgba(var(--google-blue-300-rgb), .08);--ink-color-action:black;--ink-color:var(--google-blue-300);--ripple-opacity-action:.16;--ripple-opacity:.16;--text-color-action:var(--google-grey-900);--text-color:var(--google-blue-300)}}:host{--paper-ripple-opacity:var(--ripple-opacity);-webkit-tap-highlight-color:transparent;align-items:center;border:1px solid var(--border-color);border-radius:4px;box-sizing:border-box;color:var(--text-color);cursor:pointer;display:inline-flex;flex-shrink:0;font-weight:500;height:var(--cr-button-height);justify-content:center;min-width:5.14em;outline-width:0;overflow:hidden;padding:8px 16px;position:relative;user-select:none}:host-context([chrome-refresh-2023]):host{--border-color:var(--color-button-border,
            var(--cr-fallback-color-primary-container));--text-color:var(--color-button-foreground,
            var(--cr-fallback-color-primary));--hover-bg-color:transparent;--hover-border-color:var(--border-color);--active-bg:transparent;--active-shadow:none;--ink-color:var(--cr-active-background-color);--ripple-opacity:1;--disabled-border-color:var(--color-button-border-disabled,
            rgba(var(--cr-fallback-color-on-surface-rgb), .12));--disabled-text-color:var(--color-button-foreground-disabled,
            rgba(var(--cr-fallback-color-on-surface-rgb),
                 var(--cr-disabled-opacity)));--bg-action:var(--color-button-background-prominent,
            var(--cr-fallback-color-primary));--text-color-action:var(--color-button-foreground-prominent,
            var(--cr-fallback-color-on-primary));--hover-bg-action:var(--bg-action);--active-shadow-action:none;--ink-color-action:var(--cr-active-background-color);--ripple-opacity-action:1;--disabled-bg-action:var(--color-button-background-prominent-disabled,
            rgba(var(--cr-fallback-color-on-surface-rgb), .12));background:0 0;border-radius:100px;line-height:20px}:host([has-prefix-icon_]),:host([has-suffix-icon_]){--iron-icon-height:16px;--iron-icon-width:16px;gap:8px;padding:8px}:host-context([chrome-refresh-2023]):host([has-prefix-icon_]),:host-context([chrome-refresh-2023]):host([has-suffix-icon_]){--iron-icon-height:20px;--iron-icon-width:20px;--icon-block-padding-large:16px;--icon-block-padding-small:12px;padding-block-end:8px;padding-block-start:8px}:host-context([chrome-refresh-2023]):host([has-prefix-icon_]){padding-inline-end:var(--icon-block-padding-large);padding-inline-start:var(--icon-block-padding-small)}:host-context([chrome-refresh-2023]):host([has-suffix-icon_]){padding-inline-end:var(--icon-block-padding-small);padding-inline-start:var(--icon-block-padding-large)}:host-context(.focus-outline-visible):host(:focus){box-shadow:0 0 0 2px var(--focus-shadow-color)}@media (forced-colors:active){:host-context(.focus-outline-visible):host(:focus){outline:var(--cr-focus-outline-hcm)}}:host-context([chrome-refresh-2023].focus-outline-visible):host(:focus){border-color:transparent;box-shadow:none;outline:2px solid var(--cr-focus-outline-color)}:host(:active){background:var(--active-bg);box-shadow:var(--active-shadow,0 1px 2px 0 rgba(var(--active-shadow-rgb),.3),0 3px 6px 2px rgba(var(--active-shadow-rgb),.15))}:host(:hover){background-color:var(--hover-bg-color)}@media (prefers-color-scheme:light){:host(:hover){border-color:var(--hover-border-color)}}#background{border:2px solid transparent;border-radius:inherit;inset:0;pointer-events:none;position:absolute;z-index:0}:host-context([chrome-refresh-2023]):host(:hover) #background{background-color:var(--hover-bg-color)}:host-context([chrome-refresh-2023].focus-outline-visible):host(:focus) #background{background-clip:padding-box}:host-context([chrome-refresh-2023]):host(.action-button) #background{background-color:var(--bg-action)}:host-context([chrome-refresh-2023]):host([disabled]) #background{background-color:var(--disabled-bg)}:host-context([chrome-refresh-2023]):host(.action-button[disabled]) #background{background-color:var(--disabled-bg-action)}:host-context([chrome-refresh-2023]):host(.floating-button) #background,:host-context([chrome-refresh-2023]):host(.tonal-button) #background{background-color:var(--color-button-background-tonal,var(--cr-fallback-color-secondary-container))}:host-context([chrome-refresh-2023]):host([disabled].floating-button) #background,:host-context([chrome-refresh-2023]):host([disabled].tonal-button) #background{background-color:var(--color-button-background-tonal-disabled,rgba(var(--cr-fallback-color-on-surface-rgb),.12))}#content{display:contents}:host-context([chrome-refresh-2023]) #content{display:inline;z-index:2}:host-context([chrome-refresh-2023]) ::slotted(*){z-index:2}#hoverBackground{content:'';display:none;inset:0;pointer-events:none;position:absolute;z-index:1}:host-context([chrome-refresh-2023]):host(:hover) #hoverBackground{background:var(--cr-hover-background-color);display:block}:host(.action-button){--ink-color:var(--ink-color-action);--paper-ripple-opacity:var(--ripple-opacity-action);background-color:var(--bg-action);border:none;color:var(--text-color-action)}:host-context([chrome-refresh-2023]):host(.action-button){background-color:transparent}:host(.action-button:active){box-shadow:var(--active-shadow-action,0 1px 2px 0 rgba(var(--active-shadow-action-rgb),.3),0 3px 6px 2px rgba(var(--active-shadow-action-rgb),.15))}:host(.action-button:hover){background:var(--hover-bg-action)}@media (prefers-color-scheme:light){:host(.action-button:not(:active):hover){box-shadow:0 1px 2px 0 rgba(var(--hover-shadow-action-rgb),.3),0 1px 3px 1px rgba(var(--hover-shadow-action-rgb),.15)}:host-context([chrome-refresh-2023]):host(.action-button:not(:active):hover){box-shadow:none}}:host([disabled]){background-color:var(--disabled-bg);border-color:var(--disabled-border-color);color:var(--disabled-text-color);cursor:auto;pointer-events:none}:host(.action-button[disabled]){background-color:var(--disabled-bg-action);border-color:transparent}:host(.cancel-button){margin-inline-end:8px}:host(.action-button),:host(.cancel-button){line-height:154%}:host-context([chrome-refresh-2023]):host(.floating-button),:host-context([chrome-refresh-2023]):host(.tonal-button){border:none;color:var(--color-button-foreground-tonal,var(--cr-fallback-color-on-secondary-container))}:host-context([chrome-refresh-2023]):host(.floating-button[disabled]),:host-context([chrome-refresh-2023]):host(.tonal-button[disabled]){border:none;color:var(--disabled-text-color)}:host-context([chrome-refresh-2023]):host(.floating-button){border-radius:8px;height:40px}paper-ripple{color:var(--ink-color);height:var(--paper-ripple-height);left:var(--paper-ripple-left,0);top:var(--paper-ripple-top,0);width:var(--paper-ripple-width)}:host-context([chrome-refresh-2023]) paper-ripple{z-index:1}</style>

    <div id="background"></div>
    <slot id="prefixIcon" name="prefix-icon" on-slotchange="onPrefixIconSlotChanged_">
    </slot>
    <span id="content"><slot></slot></span>
    <slot id="suffixIcon" name="suffix-icon" on-slotchange="onSuffixIconSlotChanged_">
    </slot>
    <div id="hoverBackground" part="hoverBackground"></div>
<!--_html_template_end_-->`}
// Copyright 2019 The Chromium Authors
const CrButtonElementBase=mixinBehaviors([PaperRippleBehavior],PolymerElement);class CrButtonElement extends CrButtonElementBase{static get is(){return"cr-button"}static get template(){return getTemplate$12()}static get properties(){return{disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"},customTabIndex:{type:Number,observer:"applyTabIndex_"},circleRipple:{type:Boolean,value:false},hasPrefixIcon_:{type:Boolean,reflectToAttribute:true,value:false},hasSuffixIcon_:{type:Boolean,reflectToAttribute:true,value:false}}}constructor(){super();this.spaceKeyDown_=false;this.timeoutIds_=new Set;this.addEventListener("blur",this.onBlur_.bind(this));this.addEventListener("click",this.onClick_.bind(this));this.addEventListener("keydown",this.onKeyDown_.bind(this));this.addEventListener("keyup",this.onKeyUp_.bind(this));this.addEventListener("pointerdown",this.onPointerDown_.bind(this))}ready(){super.ready();if(!this.hasAttribute("role")){this.setAttribute("role","button")}if(!this.hasAttribute("tabindex")){this.setAttribute("tabindex","0")}if(!this.hasAttribute("aria-disabled")){this.setAttribute("aria-disabled",this.disabled?"true":"false")}FocusOutlineManager.forDocument(document)}disconnectedCallback(){super.disconnectedCallback();this.timeoutIds_.forEach(clearTimeout);this.timeoutIds_.clear()}setTimeout_(fn,delay){if(!this.isConnected){return}const id=setTimeout((()=>{this.timeoutIds_.delete(id);fn()}),delay);this.timeoutIds_.add(id)}disabledChanged_(newValue,oldValue){if(!newValue&&oldValue===undefined){return}if(this.disabled){this.blur()}this.setAttribute("aria-disabled",this.disabled?"true":"false");this.applyTabIndex_()}applyTabIndex_(){let value=this.customTabIndex;if(value===undefined){value=this.disabled?-1:0}this.setAttribute("tabindex",value.toString())}onBlur_(){this.spaceKeyDown_=false}onClick_(e){if(this.disabled){e.stopImmediatePropagation()}}onPrefixIconSlotChanged_(){this.hasPrefixIcon_=this.$.prefixIcon.assignedElements().length>0}onSuffixIconSlotChanged_(){this.hasSuffixIcon_=this.$.suffixIcon.assignedElements().length>0}onKeyDown_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.repeat){return}this.getRipple().uiDownAction();if(e.key==="Enter"){this.click();this.setTimeout_((()=>this.getRipple().uiUpAction()),100)}else if(e.key===" "){this.spaceKeyDown_=true}}onKeyUp_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(this.spaceKeyDown_&&e.key===" "){this.spaceKeyDown_=false;this.click();this.getRipple().uiUpAction()}}onPointerDown_(){this.ensureRipple()}_createRipple(){const ripple=super._createRipple();if(this.circleRipple){ripple.setAttribute("center","");ripple.classList.add("circle")}return ripple}}customElements.define(CrButtonElement.is,CrButtonElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/class IronMeta{constructor(options){IronMeta[" "](options);this.type=options&&options.type||"default";this.key=options&&options.key;if(options&&"value"in options){this.value=options.value}}get value(){var type=this.type;var key=this.key;if(type&&key){return IronMeta.types[type]&&IronMeta.types[type][key]}}set value(value){var type=this.type;var key=this.key;if(type&&key){type=IronMeta.types[type]=IronMeta.types[type]||{};if(value==null){delete type[key]}else{type[key]=value}}}get list(){var type=this.type;if(type){var items=IronMeta.types[this.type];if(!items){return[]}return Object.keys(items).map((function(key){return metaDatas[this.type][key]}),this)}}byKey(key){this.key=key;return this.value}}IronMeta[" "]=function(){};IronMeta.types={};var metaDatas=IronMeta.types;Polymer({is:"iron-meta",properties:{type:{type:String,value:"default"},key:{type:String},value:{type:String,notify:true},self:{type:Boolean,observer:"_selfChanged"},__meta:{type:Boolean,computed:"__computeMeta(type, key, value)"}},hostAttributes:{hidden:true},__computeMeta:function(type,key,value){var meta=new IronMeta({type:type,key:key});if(value!==undefined&&value!==meta.value){meta.value=value}else if(this.value!==meta.value){this.value=meta.value}return meta},get list(){return this.__meta&&this.__meta.list},_selfChanged:function(self){if(self){this.value=this}},byKey:function(key){return new IronMeta({type:this.type,key:key}).value}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`
    <style>
      :host {
        align-items: center;
        display: inline-flex;
        justify-content: center;
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
      }

      :host([hidden]) {
        display: none;
      }
    </style>
`,is:"iron-icon",properties:{icon:{type:String},theme:{type:String},src:{type:String},_meta:{value:Base.create("iron-meta",{type:"iconset"})}},observers:["_updateIcon(_meta, isAttached)","_updateIcon(theme, isAttached)","_srcChanged(src, isAttached)","_iconChanged(icon, isAttached)"],_DEFAULT_ICONSET:"icons",_iconChanged:function(icon){var parts=(icon||"").split(":");this._iconName=parts.pop();this._iconsetName=parts.pop()||this._DEFAULT_ICONSET;this._updateIcon()},_srcChanged:function(src){this._updateIcon()},_usesIconset:function(){return this.icon||!this.src},_updateIcon:function(){if(this._usesIconset()){if(this._img&&this._img.parentNode){dom(this.root).removeChild(this._img)}if(this._iconName===""){if(this._iconset){this._iconset.removeIcon(this)}}else if(this._iconsetName&&this._meta){this._iconset=this._meta.byKey(this._iconsetName);if(this._iconset){this._iconset.applyIcon(this,this._iconName,this.theme);this.unlisten(window,"iron-iconset-added","_updateIcon")}else{this.listen(window,"iron-iconset-added","_updateIcon")}}}else{if(this._iconset){this._iconset.removeIcon(this)}if(!this._img){this._img=document.createElement("img");this._img.style.width="100%";this._img.style.height="100%";this._img.draggable=false}this._img.src=this.src;dom(this.root).appendChild(this._img)}}});function getTemplate$11(){return html`<!--_html_template_start_-->    <style>:host{--cr-icon-button-fill-color:var(--google-grey-700);--cr-icon-button-icon-start-offset:0;--cr-icon-button-icon-size:20px;--cr-icon-button-size:36px;--cr-icon-button-height:var(--cr-icon-button-size);--cr-icon-button-transition:150ms ease-in-out;--cr-icon-button-width:var(--cr-icon-button-size);-webkit-tap-highlight-color:transparent;border-radius:50%;color:var(--cr-icon-button-stroke-color,var(--cr-icon-button-fill-color));cursor:pointer;display:inline-flex;flex-shrink:0;height:var(--cr-icon-button-height);margin-inline-end:var(--cr-icon-button-margin-end,var(--cr-icon-ripple-margin));margin-inline-start:var(--cr-icon-button-margin-start);outline:0;overflow:hidden;user-select:none;vertical-align:middle;width:var(--cr-icon-button-width)}:host-context([chrome-refresh-2023]):host{--cr-icon-button-fill-color:currentColor;--cr-icon-button-size:32px;position:relative}:host(:hover){background-color:var(--cr-icon-button-hover-background-color,var(--cr-hover-background-color))}:host(:focus-visible:focus){box-shadow:inset 0 0 0 2px var(--cr-icon-button-focus-outline-color,var(--cr-focus-outline-color))}@media (forced-colors:active){:host(:focus-visible:focus){outline:var(--cr-focus-outline-hcm)}}:host-context(html:not([chrome-refresh-2023])) :host(:active){background-color:var(--cr-icon-button-active-background-color,var(--cr-active-background-color))}paper-ripple{display:none}:host-context([chrome-refresh-2023]) paper-ripple{--paper-ripple-opacity:1;color:var(--cr-active-background-color);display:block}:host([disabled]){cursor:initial;opacity:var(--cr-disabled-opacity);pointer-events:none}:host(.no-overlap){--cr-icon-button-margin-end:0;--cr-icon-button-margin-start:0}:host-context([dir=rtl]):host(:not([dir=ltr]):not([multiple-icons_])){transform:scaleX(-1)}:host-context([dir=rtl]):host(:not([dir=ltr])[multiple-icons_]) iron-icon{transform:scaleX(-1)}:host(:not([iron-icon])) #maskedImage{-webkit-mask-image:var(--cr-icon-image);-webkit-mask-position:center;-webkit-mask-repeat:no-repeat;-webkit-mask-size:var(--cr-icon-button-icon-size);-webkit-transform:var(--cr-icon-image-transform,none);background-color:var(--cr-icon-button-fill-color);height:100%;transition:background-color var(--cr-icon-button-transition);width:100%}@media (forced-colors:active){:host(:not([iron-icon])) #maskedImage{background-color:ButtonText}}#icon{align-items:center;border-radius:4px;display:flex;height:100%;justify-content:center;padding-inline-start:var(--cr-icon-button-icon-start-offset);position:relative;width:100%}iron-icon{--iron-icon-fill-color:var(--cr-icon-button-fill-color);--iron-icon-stroke-color:var(--cr-icon-button-stroke-color, none);--iron-icon-height:var(--cr-icon-button-icon-size);--iron-icon-width:var(--cr-icon-button-icon-size);transition:fill var(--cr-icon-button-transition),stroke var(--cr-icon-button-transition)}@media (prefers-color-scheme:dark){:host{--cr-icon-button-fill-color:var(--google-grey-500)}}</style>
    <div id="icon">
      <div id="maskedImage"></div>
    </div>
<!--_html_template_end_-->`}
// Copyright 2018 The Chromium Authors
const CrIconbuttonElementBase=mixinBehaviors([PaperRippleBehavior],PolymerElement);class CrIconButtonElement extends CrIconbuttonElementBase{static get is(){return"cr-icon-button"}static get template(){return getTemplate$11()}static get properties(){return{disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"},customTabIndex:{type:Number,observer:"applyTabIndex_"},ironIcon:{type:String,observer:"onIronIconChanged_",reflectToAttribute:true},multipleIcons_:{type:Boolean,reflectToAttribute:true}}}constructor(){super();this.spaceKeyDown_=false;this.addEventListener("blur",this.onBlur_.bind(this));this.addEventListener("click",this.onClick_.bind(this));this.addEventListener("keydown",this.onKeyDown_.bind(this));this.addEventListener("keyup",this.onKeyUp_.bind(this));if(document.documentElement.hasAttribute("chrome-refresh-2023")){this.addEventListener("pointerdown",this.onPointerDown_.bind(this))}}ready(){super.ready();this.setAttribute("aria-disabled",this.disabled?"true":"false");if(!this.hasAttribute("role")){this.setAttribute("role","button")}if(!this.hasAttribute("tabindex")){this.setAttribute("tabindex","0")}}toggleClass(className){this.classList.toggle(className)}disabledChanged_(newValue,oldValue){if(!newValue&&oldValue===undefined){return}if(this.disabled){this.blur()}this.setAttribute("aria-disabled",this.disabled?"true":"false");this.applyTabIndex_()}applyTabIndex_(){let value=this.customTabIndex;if(value===undefined){value=this.disabled?-1:0}this.setAttribute("tabindex",value.toString())}onBlur_(){this.spaceKeyDown_=false}onClick_(e){if(this.disabled){e.stopImmediatePropagation()}}onIronIconChanged_(){this.shadowRoot.querySelectorAll("iron-icon").forEach((el=>el.remove()));if(!this.ironIcon){return}const icons=(this.ironIcon||"").split(",");this.multipleIcons_=icons.length>1;icons.forEach((icon=>{const ironIcon=document.createElement("iron-icon");ironIcon.icon=icon;this.$.icon.appendChild(ironIcon);if(ironIcon.shadowRoot){ironIcon.shadowRoot.querySelectorAll("svg, img").forEach((child=>child.setAttribute("role","none")))}}))}onKeyDown_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.repeat){return}if(e.key==="Enter"){this.click()}else if(e.key===" "){this.spaceKeyDown_=true}}onKeyUp_(e){if(e.key===" "||e.key==="Enter"){e.preventDefault();e.stopPropagation()}if(this.spaceKeyDown_&&e.key===" "){this.spaceKeyDown_=false;this.click()}}onPointerDown_(){this.ensureRipple()}}customElements.define(CrIconButtonElement.is,CrIconButtonElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({is:"iron-iconset-svg",properties:{name:{type:String,observer:"_nameChanged"},size:{type:Number,value:24},rtlMirroring:{type:Boolean,value:false},useGlobalRtlAttribute:{type:Boolean,value:false}},created:function(){this._meta=new IronMeta({type:"iconset",key:null,value:null})},attached:function(){this.style.display="none"},getIconNames:function(){this._icons=this._createIconMap();return Object.keys(this._icons).map((function(n){return this.name+":"+n}),this)},applyIcon:function(element,iconName){this.removeIcon(element);var svg=this._cloneIcon(iconName,this.rtlMirroring&&this._targetIsRTL(element));if(svg){var pde=dom(element.root||element);pde.insertBefore(svg,pde.childNodes[0]);return element._svgIcon=svg}return null},createIcon:function(iconName,targetIsRTL){return this._cloneIcon(iconName,this.rtlMirroring&&targetIsRTL)},removeIcon:function(element){if(element._svgIcon){dom(element.root||element).removeChild(element._svgIcon);element._svgIcon=null}},_targetIsRTL:function(target){if(this.__targetIsRTL==null){if(this.useGlobalRtlAttribute){var globalElement=document.body&&document.body.hasAttribute("dir")?document.body:document.documentElement;this.__targetIsRTL=globalElement.getAttribute("dir")==="rtl"}else{if(target&&target.nodeType!==Node.ELEMENT_NODE){target=target.host}this.__targetIsRTL=target&&window.getComputedStyle(target)["direction"]==="rtl"}}return this.__targetIsRTL},_nameChanged:function(){this._meta.value=null;this._meta.key=this.name;this._meta.value=this;this.async((function(){this.fire("iron-iconset-added",this,{node:window})}))},_createIconMap:function(){var icons=Object.create(null);dom(this).querySelectorAll("[id]").forEach((function(icon){icons[icon.id]=icon}));return icons},_cloneIcon:function(id,mirrorAllowed){this._icons=this._icons||this._createIconMap();return this._prepareSvgClone(this._icons[id],this.size,mirrorAllowed)},_prepareSvgClone:function(sourceSvg,size,mirrorAllowed){if(sourceSvg){var content=sourceSvg.cloneNode(true),svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),viewBox=content.getAttribute("viewBox")||"0 0 "+size+" "+size,cssText="pointer-events: none; display: block; width: 100%; height: 100%;";if(mirrorAllowed&&content.hasAttribute("mirror-in-rtl")){cssText+="-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;"}svg.setAttribute("viewBox",viewBox);svg.setAttribute("preserveAspectRatio","xMidYMid meet");svg.setAttribute("focusable","false");svg.style.cssText=cssText;svg.appendChild(content).removeAttribute("id");return svg}return null}});const template$8=html`
<iron-iconset-svg name="cr20" size="20">
  <svg>
    <defs>
      
      <g id="block">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted">
        </path>
      </g>
      <g id="cloud-off">
        <path d="M16 redacted">
        </path>
      </g>
      <g id="domain">
        <path d="M2 redacted">
        </path>
      </g>
      <g id="kite">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 redacted">
        </path>
      </g>
      <g id="menu">
        <path d="M2 redacted"></path>
      </g>
      
        <g id="banner-warning">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 redacted">
          </path>
        </g>
        <g id="warning">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 redacted">
          </path>
        </g>
      
  </defs></svg>
</iron-iconset-svg>


<iron-iconset-svg name="cr" size="24">
  <svg>
    <defs>
      
      <g id="account-child-invert" viewBox="0 0 48 48">
        <path d="M24 redacted"></path>
        <path fill="none" d="M0 redacted"></path>
        <circle fill="none" cx="24" cy="26" r="4"></circle>
        <path d="M24 redacted">
        </path>
      </g>
      <g id="add">
        <path d="M19 redacted"/>
      </g>
      <g id="arrow-back">
        <path d="M20 redacted"></path>
      </g>
      <g id="arrow-drop-up">
        <path d="M7 redacted">
      </path></g>
      <g id="arrow-drop-down">
        <path d="M7 redacted"></path>
      </g>
      <g id="arrow-forward">
        <path d="M12 redacted"></path>
      </g>
      <g id="arrow-right">
        <path d="M10 redacted"></path>
      </g>
      
        <g id="bluetooth">
          <path d="M17 redacted">
          </path>
        </g>
        <g id="camera-alt">
          <circle cx="12" cy="12" r="3.2"></circle>
          <path d="M9 redacted">
          </path>
        </g>
        <g id="work">
          <path d="M20 redacted">
          </path>
        </g>
      
      <g id="cancel">
        <path d="M12 redacted">
        </path>
      </g>
      <g id="check">
        <path d="M9 redacted"></path>
      </g>
      <g id="check-circle">
        <path d="M12 redacted">
        </path>
      </g>
      <g id="chevron-left">
        <path d="M15 redacted"></path>
      </g>
      <g id="chevron-right">
        <path d="M10 redacted"></path>
      </g>
      <g id="clear">
        <path d="M19 redacted">
        </path>
      </g>
      <g id="close">
        <path d="M19 redacted">
        </path>
      </g>
      <g id="computer">
        <path d="M20 redacted">
        </path>
      </g>
      <g id="create">
        <path d="M3 redacted">
        </path>
      </g>
      <g id="delete">
        <path d="M6 redacted"></path>
      </g>
      <g id="domain">
        <path d="M12 redacted">
        </path>
      </g>
      <g id="error">
        <path d="M12 redacted">
        </path>
      </g>
      <g id="error-outline">
        <path d="M11 redacted">
        </path>
      </g>
      <g id="expand-less">
        <path d="M12 redacted"></path>
      </g>
      <g id="expand-more">
        <path d="M16 redacted"></path>
      </g>
      <g id="extension">
        <path d="M20 redacted">
        </path>
      </g>
      <g id="file-download">
        <path d="M19 redacted"></path>
      </g>
      
        <g id="folder-filled">
          <path d="M10 redacted"></path>
        </g>
      
      <g id="fullscreen">
        <path d="M7 redacted"></path>
      </g>
      <g id="group">
        <path d="M16 redacted">
        </path>
      </g>
      <g id="help-outline">
        <path d="M11 redacted">
        </path>
      </g>
      <g id="info">
        <path d="M12 redacted">
        </path>
      </g>
      <g id="info-outline">
        <path d="M11 redacted">
        </path>
      </g>
      <g id="insert-drive-file">
        <path d="M6 redacted">
        </path>
      </g>
      <g id="location-on">
        <path d="M12 redacted">
        </path>
      </g>
      <g id="mic">
        <path d="M12 redacted">
        </path>
      </g>
      <g id="more-vert">
        <path d="M12 redacted">
        </path>
      </g>
      <g id="open-in-new">
        <path d="M19 redacted">
        </path>
      </g>
      <g id="person">
        <path d="M12 redacted">
        </path>
      </g>
      <g id="phonelink"><path d="M4 redacted"></path></g>
      <g id="print">
        <path d="M19 redacted">
        </path>
      </g>
      <g id="schedule"><path d="M11 redacted"></path></g>
      <g id="search">
        <path d="M15 redacted">
        </path>
      </g>
      <g id="security">
        <path d="M12 redacted">
        </path>
      </g>
      
        <g id="sim-card-alert">
          <path d="M18 redacted">
          </path>
        </g>
        <g id="sim-lock">
          <path d="M18 redacted">
          </path>
        </g>
        <g id="sms-connect">
          <path d="M20 redacted">
          </path>
        </g>
      
      
      <g id="settings_icon">
        <path d="M19 redacted">
        </path>
      </g>
      <g id="star">
        <path d="M12 redacted"></path>
      </g>
      <g id="sync">
        <path d="M12 redacted">
        </path>
      </g>
      <g id="videocam">
        <path d="M17 redacted">
        </path>
      </g>
      <g id="warning">
        <path d="M1 redacted"></path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg>
`;document.head.appendChild(template$8.content);const styleMod$e=document.createElement("dom-module");styleMod$e.appendChild(html`
  <template>
    <style>
.icon-arrow-back{--cr-icon-image:url(chrome://resources/images/icon_arrow_back.svg)}.icon-arrow-dropdown{--cr-icon-image:url(chrome://resources/images/icon_arrow_dropdown.svg)}.icon-cancel{--cr-icon-image:url(chrome://resources/images/icon_cancel.svg)}.icon-clear{--cr-icon-image:url(chrome://resources/images/icon_clear.svg)}.icon-copy-content{--cr-icon-image:url(chrome://resources/images/icon_copy_content.svg)}.icon-delete-gray{--cr-icon-image:url(chrome://resources/images/icon_delete_gray.svg)}.icon-edit{--cr-icon-image:url(chrome://resources/images/icon_edit.svg)}.icon-file{--cr-icon-image:url(chrome://resources/images/icon_filetype_generic.svg)}.icon-folder-open{--cr-icon-image:url(chrome://resources/images/icon_folder_open.svg)}.icon-picture-delete{--cr-icon-image:url(chrome://resources/images/icon_picture_delete.svg)}.icon-expand-less{--cr-icon-image:url(chrome://resources/images/icon_expand_less.svg)}.icon-expand-more{--cr-icon-image:url(chrome://resources/images/icon_expand_more.svg)}.icon-external{--cr-icon-image:url(chrome://resources/images/open_in_new.svg)}.icon-more-vert{--cr-icon-image:url(chrome://resources/images/icon_more_vert.svg)}.icon-refresh{--cr-icon-image:url(chrome://resources/images/icon_refresh.svg)}.icon-search{--cr-icon-image:url(chrome://resources/images/icon_search.svg)}.icon-settings{--cr-icon-image:url(chrome://resources/images/icon_settings.svg)}.icon-visibility{--cr-icon-image:url(chrome://resources/images/icon_visibility.svg)}.icon-visibility-off{--cr-icon-image:url(chrome://resources/images/icon_visibility_off.svg)}.subpage-arrow{--cr-icon-image:url(chrome://resources/images/arrow_right.svg)}.cr-icon{-webkit-mask-image:var(--cr-icon-image);-webkit-mask-position:center;-webkit-mask-repeat:no-repeat;-webkit-mask-size:var(--cr-icon-size);background-color:var(--cr-icon-color,var(--google-grey-700));flex-shrink:0;height:var(--cr-icon-ripple-size);margin-inline-end:var(--cr-icon-ripple-margin);margin-inline-start:var(--cr-icon-button-margin-start);user-select:none;width:var(--cr-icon-ripple-size)}:host-context([dir=rtl]) .cr-icon{transform:scaleX(-1)}.cr-icon.no-overlap{margin-inline-end:0;margin-inline-start:0}@media (prefers-color-scheme:dark){.cr-icon{background-color:var(--cr-icon-color,var(--google-grey-500))}}
    </style>
  </template>
`.content);styleMod$e.register("cr-icons");const styleMod$d=document.createElement("dom-module");styleMod$d.appendChild(html`
  <template>
    <style include="cr-hidden-style cr-icons">
:host,html{--scrollable-border-color:var(--google-grey-300)}@media (prefers-color-scheme:dark){:host,html{--scrollable-border-color:var(--google-grey-700)}}[actionable]{cursor:pointer}.hr{border-top:var(--cr-separator-line)}iron-list.cr-separators>:not([first]){border-top:var(--cr-separator-line)}[scrollable]{border-color:transparent;border-style:solid;border-width:1px 0;overflow-y:auto}[scrollable].is-scrolled{border-top-color:var(--scrollable-border-color)}[scrollable].can-scroll:not(.scrolled-to-bottom){border-bottom-color:var(--scrollable-border-color)}[scrollable] iron-list>:not(.no-outline):focus,[selectable]:focus,[selectable]>:focus{background-color:var(--cr-focused-item-color);outline:0}.scroll-container{display:flex;flex-direction:column;min-height:1px}[selectable]>*{cursor:pointer}.cr-centered-card-container{box-sizing:border-box;display:block;height:inherit;margin:0 auto;max-width:var(--cr-centered-card-max-width);min-width:550px;position:relative;width:calc(100% * var(--cr-centered-card-width-percentage))}.cr-container-shadow{box-shadow:inset 0 5px 6px -3px rgba(0,0,0,.4);height:var(--cr-container-shadow-height);left:0;margin:0 0 var(--cr-container-shadow-margin);opacity:0;pointer-events:none;position:relative;right:0;top:0;transition:opacity .5s;z-index:1}#cr-container-shadow-bottom{margin-bottom:0;margin-top:var(--cr-container-shadow-margin);transform:scaleY(-1)}#cr-container-shadow-bottom.has-shadow,#cr-container-shadow-top.has-shadow{opacity:var(--cr-container-shadow-max-opacity)}.cr-row{align-items:center;border-top:var(--cr-separator-line);display:flex;min-height:var(--cr-section-min-height);padding:0 var(--cr-section-padding)}.cr-row.continuation,.cr-row.first{border-top:none}.cr-row-gap{padding-inline-start:16px}.cr-button-gap{margin-inline-start:8px}paper-tooltip::part(tooltip){border-radius:var(--paper-tooltip-border-radius,2px);font-size:92.31%;font-weight:500;max-width:330px;min-width:var(--paper-tooltip-min-width,200px);padding:var(--paper-tooltip-padding,10px 8px)}.cr-padded-text{padding-block-end:var(--cr-section-vertical-padding);padding-block-start:var(--cr-section-vertical-padding)}.cr-title-text{color:var(--cr-title-text-color);font-size:107.6923%;font-weight:500}.cr-secondary-text{color:var(--cr-secondary-text-color);font-weight:400}.cr-form-field-label{color:var(--cr-form-field-label-color);display:block;font-size:var(--cr-form-field-label-font-size);font-weight:500;letter-spacing:.4px;line-height:var(--cr-form-field-label-line-height);margin-bottom:8px}.cr-vertical-tab{align-items:center;display:flex}.cr-vertical-tab::before{border-radius:0 3px 3px 0;content:'';display:block;flex-shrink:0;height:var(--cr-vertical-tab-height,100%);width:4px}.cr-vertical-tab.selected::before{background:var(--cr-vertical-tab-selected-color,var(--cr-checked-color))}:host-context([dir=rtl]) .cr-vertical-tab::before{transform:scaleX(-1)}.iph-anchor-highlight{background-color:var(--cr-iph-anchor-highlight-color)}
    </style>
  </template>
`.content);styleMod$d.register("cr-shared-style");
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`
    <style>
      :host {
        display: block;
        position: absolute;
        outline: none;
        z-index: 1002;
        user-select: none;
        cursor: default;
      }

      #tooltip {
        display: block;
        outline: none;
        font-size: 10px;
        line-height: 1;
        background-color: var(--paper-tooltip-background, #616161);
        color: var(--paper-tooltip-text-color, white);
        padding: 8px;
        border-radius: 2px;
      }

      @keyframes keyFrameScaleUp {
        0% {
          transform: scale(0.0);
        }
        100% {
          transform: scale(1.0);
        }
      }

      @keyframes keyFrameScaleDown {
        0% {
          transform: scale(1.0);
        }
        100% {
          transform: scale(0.0);
        }
      }

      @keyframes keyFrameFadeInOpacity {
        0% {
          opacity: 0;
        }
        100% {
          opacity: var(--paper-tooltip-opacity, 0.9);
        }
      }

      @keyframes keyFrameFadeOutOpacity {
        0% {
          opacity: var(--paper-tooltip-opacity, 0.9);
        }
        100% {
          opacity: 0;
        }
      }

      @keyframes keyFrameSlideDownIn {
        0% {
          transform: translateY(-2000px);
          opacity: 0;
        }
        10% {
          opacity: 0.2;
        }
        100% {
          transform: translateY(0);
          opacity: var(--paper-tooltip-opacity, 0.9);
        }
      }

      @keyframes keyFrameSlideDownOut {
        0% {
          transform: translateY(0);
          opacity: var(--paper-tooltip-opacity, 0.9);
        }
        10% {
          opacity: 0.2;
        }
        100% {
          transform: translateY(-2000px);
          opacity: 0;
        }
      }

      .fade-in-animation {
        opacity: 0;
        animation-delay: var(--paper-tooltip-delay-in, 500ms);
        animation-name: keyFrameFadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-in, 500ms);
        animation-fill-mode: forwards;
      }

      .fade-out-animation {
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 0ms);
        animation-name: keyFrameFadeOutOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
      }

      .scale-up-animation {
        transform: scale(0);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-in, 500ms);
        animation-name: keyFrameScaleUp;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-in, 500ms);
        animation-fill-mode: forwards;
      }

      .scale-down-animation {
        transform: scale(1);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameScaleDown;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
      }

      .slide-down-animation {
        transform: translateY(-2000px);
        opacity: 0;
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameSlideDownIn;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
      }

      .slide-down-animation-out {
        transform: translateY(0);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameSlideDownOut;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
      }

      .cancel-animation {
        animation-delay: -30s !important;
      }

      /* Thanks IE 10. */

      .hidden {
        display: none !important;
      }
    </style>

    <div id="tooltip" class="hidden" part="tooltip">
      <slot></slot>
    </div>
`,is:"paper-tooltip",hostAttributes:{role:"tooltip",tabindex:-1},properties:{for:{type:String,observer:"_findTarget"},manualMode:{type:Boolean,value:false,observer:"_manualModeChanged"},position:{type:String,value:"bottom"},fitToVisibleBounds:{type:Boolean,value:false},offset:{type:Number,value:14},marginTop:{type:Number,value:14},animationDelay:{type:Number,value:500,observer:"_delayChange"},animationEntry:{type:String,value:""},animationExit:{type:String,value:""},animationConfig:{type:Object,value:function(){return{entry:[{name:"fade-in-animation",node:this,timing:{delay:0}}],exit:[{name:"fade-out-animation",node:this}]}}},_showing:{type:Boolean,value:false}},listeners:{webkitAnimationEnd:"_onAnimationEnd"},get target(){if(this._manualTarget)return this._manualTarget;var parentNode=dom(this).parentNode;var ownerRoot=dom(this).getOwnerRoot();var target;if(this.for){target=dom(ownerRoot).querySelector("#"+this.for)}else{target=parentNode.nodeType==Node.DOCUMENT_FRAGMENT_NODE?ownerRoot.host:parentNode}return target},set target(target){this._manualTarget=target;this._findTarget()},attached:function(){this._findTarget()},detached:function(){if(!this.manualMode)this._removeListeners()},playAnimation:function(type){if(type==="entry"){this.show()}else if(type==="exit"){this.hide()}},cancelAnimation:function(){this.$.tooltip.classList.add("cancel-animation")},show:function(){if(this._showing)return;if(dom(this).textContent.trim()===""){var allChildrenEmpty=true;var effectiveChildren=dom(this).getEffectiveChildNodes();for(var i=0;i<effectiveChildren.length;i++){if(effectiveChildren[i].textContent.trim()!==""){allChildrenEmpty=false;break}}if(allChildrenEmpty){return}}this._showing=true;this.$.tooltip.classList.remove("hidden");this.$.tooltip.classList.remove("cancel-animation");this.$.tooltip.classList.remove(this._getAnimationType("exit"));this.updatePosition();this._animationPlaying=true;this.$.tooltip.classList.add(this._getAnimationType("entry"))},hide:function(){if(!this._showing){return}if(this._animationPlaying){this._showing=false;this._cancelAnimation();return}else{this._onAnimationFinish()}this._showing=false;this._animationPlaying=true},updatePosition:function(){if(!this._target)return;var offsetParent=this._composedOffsetParent();if(!offsetParent)return;var offset=this.offset;if(this.marginTop!=14&&this.offset==14)offset=this.marginTop;var parentRect=offsetParent.getBoundingClientRect();var targetRect=this._target.getBoundingClientRect();var thisRect=this.getBoundingClientRect();var horizontalCenterOffset=(targetRect.width-thisRect.width)/2;var verticalCenterOffset=(targetRect.height-thisRect.height)/2;var targetLeft=targetRect.left-parentRect.left;var targetTop=targetRect.top-parentRect.top;var tooltipLeft,tooltipTop;switch(this.position){case"top":tooltipLeft=targetLeft+horizontalCenterOffset;tooltipTop=targetTop-thisRect.height-offset;break;case"bottom":tooltipLeft=targetLeft+horizontalCenterOffset;tooltipTop=targetTop+targetRect.height+offset;break;case"left":tooltipLeft=targetLeft-thisRect.width-offset;tooltipTop=targetTop+verticalCenterOffset;break;case"right":tooltipLeft=targetLeft+targetRect.width+offset;tooltipTop=targetTop+verticalCenterOffset;break}if(this.fitToVisibleBounds){if(parentRect.left+tooltipLeft+thisRect.width>window.innerWidth){this.style.right="0px";this.style.left="auto"}else{this.style.left=Math.max(0,tooltipLeft)+"px";this.style.right="auto"}if(parentRect.top+tooltipTop+thisRect.height>window.innerHeight){this.style.bottom=parentRect.height-targetTop+offset+"px";this.style.top="auto"}else{this.style.top=Math.max(-parentRect.top,tooltipTop)+"px";this.style.bottom="auto"}}else{this.style.left=tooltipLeft+"px";this.style.top=tooltipTop+"px"}},_addListeners:function(){if(this._target){this.listen(this._target,"mouseenter","show");this.listen(this._target,"focus","show");this.listen(this._target,"mouseleave","hide");this.listen(this._target,"blur","hide");this.listen(this._target,"tap","hide")}this.listen(this.$.tooltip,"animationend","_onAnimationEnd");this.listen(this,"mouseenter","hide")},_findTarget:function(){if(!this.manualMode)this._removeListeners();this._target=this.target;if(!this.manualMode)this._addListeners()},_delayChange:function(newValue){if(newValue!==500){this.updateStyles({"--paper-tooltip-delay-in":newValue+"ms"})}},_manualModeChanged:function(){if(this.manualMode)this._removeListeners();else this._addListeners()},_cancelAnimation:function(){this.$.tooltip.classList.remove(this._getAnimationType("entry"));this.$.tooltip.classList.remove(this._getAnimationType("exit"));this.$.tooltip.classList.remove("cancel-animation");this.$.tooltip.classList.add("hidden")},_onAnimationFinish:function(){if(this._showing){this.$.tooltip.classList.remove(this._getAnimationType("entry"));this.$.tooltip.classList.remove("cancel-animation");this.$.tooltip.classList.add(this._getAnimationType("exit"))}},_onAnimationEnd:function(){this._animationPlaying=false;if(!this._showing){this.$.tooltip.classList.remove(this._getAnimationType("exit"));this.$.tooltip.classList.add("hidden")}},_getAnimationType:function(type){if(type==="entry"&&this.animationEntry!==""){return this.animationEntry}if(type==="exit"&&this.animationExit!==""){return this.animationExit}if(this.animationConfig[type]&&typeof this.animationConfig[type][0].name==="string"){if(this.animationConfig[type][0].timing&&this.animationConfig[type][0].timing.delay&&this.animationConfig[type][0].timing.delay!==0){var timingDelay=this.animationConfig[type][0].timing.delay;if(type==="entry"){this.updateStyles({"--paper-tooltip-delay-in":timingDelay+"ms"})}else if(type==="exit"){this.updateStyles({"--paper-tooltip-delay-out":timingDelay+"ms"})}}return this.animationConfig[type][0].name}},_removeListeners:function(){if(this._target){this.unlisten(this._target,"mouseenter","show");this.unlisten(this._target,"focus","show");this.unlisten(this._target,"mouseleave","hide");this.unlisten(this._target,"blur","hide");this.unlisten(this._target,"tap","hide")}this.unlisten(this.$.tooltip,"animationend","_onAnimationEnd");this.unlisten(this,"mouseenter","hide")},_composedOffsetParent:function(){for(let ancestor=this;ancestor;ancestor=flatTreeParent(ancestor)){if(!(ancestor instanceof Element))continue;if(getComputedStyle(ancestor).display==="none")return null}for(let ancestor=flatTreeParent(this);ancestor;ancestor=flatTreeParent(ancestor)){if(!(ancestor instanceof Element))continue;const style=getComputedStyle(ancestor);if(style.display==="contents"){continue}if(style.position!=="static"){return ancestor}if(ancestor.tagName==="BODY")return ancestor}return null;function flatTreeParent(element){if(element.assignedSlot){return element.assignedSlot}if(element.parentNode instanceof ShadowRoot){return element.parentNode.host}return element.parentNode}}});function getTemplate$10(){return html`<!--_html_template_start_-->    <style include="cr-shared-style">:host{display:flex}iron-icon{--iron-icon-width:var(--cr-icon-size);--iron-icon-height:var(--cr-icon-size);--iron-icon-fill-color:var(--cr-tooltip-icon-fill-color, var(--google-grey-700))}@media (prefers-color-scheme:dark){iron-icon{--iron-icon-fill-color:var(--cr-tooltip-icon-fill-color, var(--google-grey-500))}}</style>
    <iron-icon id="indicator" tabindex="0" aria-label$="[[iconAriaLabel]]" aria-describedby="tooltip" icon="[[iconClass]]" role="img"></iron-icon>
    <paper-tooltip id="tooltip" for="indicator" position="[[tooltipPosition]]" fit-to-visible-bounds part="tooltip">
      <slot name="tooltip-text">[[tooltipText]]</slot>
    </paper-tooltip>
<!--_html_template_end_-->`}
// Copyright 2017 The Chromium Authors
class CrTooltipIconElement extends PolymerElement{static get is(){return"cr-tooltip-icon"}static get template(){return getTemplate$10()}static get properties(){return{iconAriaLabel:String,iconClass:String,tooltipText:String,tooltipPosition:{type:String,value:"top"}}}getFocusableElement(){return this.$.indicator}}customElements.define(CrTooltipIconElement.is,CrTooltipIconElement);function getTemplate$$(){return html`<!--_html_template_start_-->    <style include="cr-hidden-style"></style>
    <cr-tooltip-icon hidden$="[[!indicatorVisible]]" tooltip-text="[[indicatorTooltip_]]" icon-class="[[indicatorIcon]]" icon-aria-label="[[iconAriaLabel]]">
    </cr-tooltip-icon>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function assert$1(value,message){if(value){return}throw new Error("Assertion failed"+(message?`: ${message}`:""))}function assertInstanceof$1(value,type,message){if(value instanceof type){return}throw new Error(message||`Value ${value} is not of type ${type.name||typeof type}`)}function assertNotReached$1(message="Unreachable code hit"){assert$1(false,message)}
// Copyright 2022 The Chromium Authors
var CrPolicyIndicatorType$1;(function(CrPolicyIndicatorType){CrPolicyIndicatorType["DEVICE_POLICY"]="devicePolicy";CrPolicyIndicatorType["EXTENSION"]="extension";CrPolicyIndicatorType["NONE"]="none";CrPolicyIndicatorType["OWNER"]="owner";CrPolicyIndicatorType["PRIMARY_USER"]="primary_user";CrPolicyIndicatorType["RECOMMENDED"]="recommended";CrPolicyIndicatorType["USER_POLICY"]="userPolicy";CrPolicyIndicatorType["PARENT"]="parent";CrPolicyIndicatorType["CHILD_RESTRICTION"]="childRestriction"})(CrPolicyIndicatorType$1||(CrPolicyIndicatorType$1={}));const CrPolicyIndicatorMixin=dedupingMixin((superClass=>{class CrPolicyIndicatorMixin extends superClass{static get properties(){return{indicatorType:{type:String,value:CrPolicyIndicatorType$1.NONE},indicatorSourceName:{type:String,value:""},indicatorVisible:{type:Boolean,computed:"getIndicatorVisible_(indicatorType)"},indicatorIcon:{type:String,computed:"getIndicatorIcon_(indicatorType)"}}}getIndicatorVisible_(type){return type!==CrPolicyIndicatorType$1.NONE}getIndicatorIcon_(type){switch(type){case CrPolicyIndicatorType$1.EXTENSION:return"cr:extension";case CrPolicyIndicatorType$1.NONE:return"";case CrPolicyIndicatorType$1.PRIMARY_USER:return"cr:group";case CrPolicyIndicatorType$1.OWNER:return"cr:person";case CrPolicyIndicatorType$1.USER_POLICY:case CrPolicyIndicatorType$1.DEVICE_POLICY:case CrPolicyIndicatorType$1.RECOMMENDED:return"cr20:domain";case CrPolicyIndicatorType$1.PARENT:case CrPolicyIndicatorType$1.CHILD_RESTRICTION:return"cr20:kite";default:assertNotReached$1()}}getIndicatorTooltip(type,name,matches){if(!window.CrPolicyStrings){return""}const CrPolicyStrings=window.CrPolicyStrings;switch(type){case CrPolicyIndicatorType$1.EXTENSION:return name.length>0?CrPolicyStrings.controlledSettingExtension.replace("$1",name):CrPolicyStrings.controlledSettingExtensionWithoutName;case CrPolicyIndicatorType$1.PRIMARY_USER:return CrPolicyStrings.controlledSettingShared.replace("$1",name);case CrPolicyIndicatorType$1.OWNER:return name.length>0?CrPolicyStrings.controlledSettingWithOwner.replace("$1",name):CrPolicyStrings.controlledSettingNoOwner;case CrPolicyIndicatorType$1.USER_POLICY:case CrPolicyIndicatorType$1.DEVICE_POLICY:return CrPolicyStrings.controlledSettingPolicy;case CrPolicyIndicatorType$1.RECOMMENDED:return matches?CrPolicyStrings.controlledSettingRecommendedMatches:CrPolicyStrings.controlledSettingRecommendedDiffers;case CrPolicyIndicatorType$1.PARENT:return CrPolicyStrings.controlledSettingParent;case CrPolicyIndicatorType$1.CHILD_RESTRICTION:return CrPolicyStrings.controlledSettingChildRestriction}return""}}return CrPolicyIndicatorMixin}));
// Copyright 2017 The Chromium Authors
const CrPolicyIndicatorElementBase=CrPolicyIndicatorMixin(PolymerElement);class CrPolicyIndicatorElement extends CrPolicyIndicatorElementBase{static get is(){return"cr-policy-indicator"}static get template(){return getTemplate$$()}static get properties(){return{iconAriaLabel:String,indicatorTooltip_:{type:String,computed:"getIndicatorTooltip_(indicatorType, indicatorSourceName)"}}}getIndicatorTooltip_(indicatorType,indicatorSourceName){return this.getIndicatorTooltip(indicatorType,indicatorSourceName)}}customElements.define(CrPolicyIndicatorElement.is,CrPolicyIndicatorElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var ORPHANS=new Set;const IronResizableBehavior={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:false}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[];this._boundNotifyResize=this.notifyResize.bind(this);this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){if(this._parentResizable){this._parentResizable.stopResizeNotificationsFor(this)}else{ORPHANS.delete(this);window.removeEventListener("resize",this._boundNotifyResize)}this._parentResizable=null},notifyResize:function(){if(!this.isAttached){return}this._interestedResizables.forEach((function(resizable){if(this.resizerShouldNotify(resizable)){this._notifyDescendant(resizable)}}),this);this._fireResize()},assignParentResizable:function(parentResizable){if(this._parentResizable){this._parentResizable.stopResizeNotificationsFor(this)}this._parentResizable=parentResizable;if(parentResizable&&parentResizable._interestedResizables.indexOf(this)===-1){parentResizable._interestedResizables.push(this);parentResizable._subscribeIronResize(this)}},stopResizeNotificationsFor:function(target){var index=this._interestedResizables.indexOf(target);if(index>-1){this._interestedResizables.splice(index,1);this._unsubscribeIronResize(target)}},_subscribeIronResize:function(target){target.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(target){target.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(element){return true},_onDescendantIronResize:function(event){if(this._notifyingDescendant){event.stopPropagation();return}if(!useShadow){this._fireResize()}},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:false})},_onIronRequestResizeNotifications:function(event){var target=dom(event).rootTarget;if(target===this){return}target.assignParentResizable(this);this._notifyDescendant(target);event.stopPropagation()},_parentResizableChanged:function(parentResizable){if(parentResizable){window.removeEventListener("resize",this._boundNotifyResize)}},_notifyDescendant:function(descendant){if(!this.isAttached){return}this._notifyingDescendant=true;descendant.notifyResize();this._notifyingDescendant=false},_requestResizeNotifications:function(){if(!this.isAttached){return}if(document.readyState==="loading"){var _requestResizeNotifications=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",(function readystatechanged(){document.removeEventListener("readystatechange",readystatechanged);_requestResizeNotifications()}))}else{this._findParent();if(!this._parentResizable){ORPHANS.forEach((function(orphan){if(orphan!==this){orphan._findParent()}}),this);window.addEventListener("resize",this._boundNotifyResize);this.notifyResize()}else{this._parentResizable._interestedResizables.forEach((function(resizable){if(resizable!==this){resizable._findParent()}}),this)}}},_findParent:function(){this.assignParentResizable(null);this.fire("iron-request-resize-notifications",null,{node:this,bubbles:true,cancelable:true});if(!this._parentResizable){ORPHANS.add(this)}else{ORPHANS.delete(this)}}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/class IronSelection{constructor(selectCallback){this.selection=[];this.selectCallback=selectCallback}get(){return this.multi?this.selection.slice():this.selection[0]}clear(excludes){this.selection.slice().forEach((function(item){if(!excludes||excludes.indexOf(item)<0){this.setItemSelected(item,false)}}),this)}isSelected(item){return this.selection.indexOf(item)>=0}setItemSelected(item,isSelected){if(item!=null){if(isSelected!==this.isSelected(item)){if(isSelected){this.selection.push(item)}else{var i=this.selection.indexOf(item);if(i>=0){this.selection.splice(i,1)}}if(this.selectCallback){this.selectCallback(item,isSelected)}}}}select(item){if(this.multi){this.toggle(item)}else if(this.get()!==item){this.setItemSelected(this.get(),false);this.setItemSelected(item,true)}}toggle(item){this.setItemSelected(item,!this.isSelected(item))}}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronSelectableBehavior={properties:{attrForSelected:{type:String,value:null},selected:{type:String,notify:true},selectedItem:{type:Object,readOnly:true,notify:true},activateEvent:{type:String,value:"tap",observer:"_activateEventChanged"},selectable:String,selectedClass:{type:String,value:"iron-selected"},selectedAttribute:{type:String,value:null},fallbackSelection:{type:String,value:null},items:{type:Array,readOnly:true,notify:true,value:function(){return[]}},_excludedLocalNames:{type:Object,value:function(){return{template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1}}}},observers:["_updateAttrForSelected(attrForSelected)","_updateSelected(selected)","_checkFallback(fallbackSelection)"],created:function(){this._bindFilterItem=this._filterItem.bind(this);this._selection=new IronSelection(this._applySelection.bind(this))},attached:function(){this._observer=this._observeItems(this);this._addListener(this.activateEvent)},detached:function(){if(this._observer){dom(this).unobserveNodes(this._observer)}this._removeListener(this.activateEvent)},indexOf:function(item){return this.items?this.items.indexOf(item):-1},select:function(value){this.selected=value},selectPrevious:function(){var length=this.items.length;var index=length-1;if(this.selected!==undefined){index=(Number(this._valueToIndex(this.selected))-1+length)%length}this.selected=this._indexToValue(index)},selectNext:function(){var index=0;if(this.selected!==undefined){index=(Number(this._valueToIndex(this.selected))+1)%this.items.length}this.selected=this._indexToValue(index)},selectIndex:function(index){this.select(this._indexToValue(index))},forceSynchronousItemUpdate:function(){if(this._observer&&typeof this._observer.flush==="function"){this._observer.flush()}else{this._updateItems()}},get _shouldUpdateSelection(){return this.selected!=null},_checkFallback:function(){this._updateSelected()},_addListener:function(eventName){this.listen(this,eventName,"_activateHandler")},_removeListener:function(eventName){this.unlisten(this,eventName,"_activateHandler")},_activateEventChanged:function(eventName,old){this._removeListener(old);this._addListener(eventName)},_updateItems:function(){var nodes=dom(this).queryDistributedElements(this.selectable||"*");nodes=Array.prototype.filter.call(nodes,this._bindFilterItem);this._setItems(nodes)},_updateAttrForSelected:function(){if(this.selectedItem){this.selected=this._valueForItem(this.selectedItem)}},_updateSelected:function(){this._selectSelected(this.selected)},_selectSelected:function(selected){if(!this.items){return}var item=this._valueToItem(this.selected);if(item){this._selection.select(item)}else{this._selection.clear()}if(this.fallbackSelection&&this.items.length&&this._selection.get()===undefined){this.selected=this.fallbackSelection}},_filterItem:function(node){return!this._excludedLocalNames[node.localName]},_valueToItem:function(value){return value==null?null:this.items[this._valueToIndex(value)]},_valueToIndex:function(value){if(this.attrForSelected){for(var i=0,item;item=this.items[i];i++){if(this._valueForItem(item)==value){return i}}}else{return Number(value)}},_indexToValue:function(index){if(this.attrForSelected){var item=this.items[index];if(item){return this._valueForItem(item)}}else{return index}},_valueForItem:function(item){if(!item){return null}if(!this.attrForSelected){var i=this.indexOf(item);return i===-1?null:i}var propValue=item[dashToCamelCase(this.attrForSelected)];return propValue!=undefined?propValue:item.getAttribute(this.attrForSelected)},_applySelection:function(item,isSelected){if(this.selectedClass){this.toggleClass(this.selectedClass,isSelected,item)}if(this.selectedAttribute){this.toggleAttribute(this.selectedAttribute,isSelected,item)}this._selectionChange();this.fire("iron-"+(isSelected?"select":"deselect"),{item:item})},_selectionChange:function(){this._setSelectedItem(this._selection.get())},_observeItems:function(node){return dom(node).observeNodes((function(mutation){this._updateItems();this._updateSelected();this.fire("iron-items-changed",mutation,{bubbles:false,cancelable:false})}))},_activateHandler:function(e){var t=e.target;var items=this.items;while(t&&t!=this){var i=items.indexOf(t);if(i>=0){var value=this._indexToValue(i);this._itemActivate(value,t);return}t=t.parentNode}},_itemActivate:function(value,item){if(!this.fire("iron-activate",{selected:value,item:item},{cancelable:true}).defaultPrevented){this.select(value)}}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`
    <style>
      :host {
        display: block;
      }

      :host > ::slotted(:not(slot):not(.iron-selected)) {
        display: none !important;
      }
    </style>

    <slot></slot>
`,is:"iron-pages",behaviors:[IronResizableBehavior,IronSelectableBehavior],properties:{activateEvent:{type:String,value:null}},observers:["_selectedPageChanged(selected)"],_selectedPageChanged:function(selected,old){this.async(this.notifyResize)}});
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const isMac=/Mac/.test(navigator.platform);const isWindows=/Win/.test(navigator.platform);const isAndroid=/Android/.test(navigator.userAgent);const isIOS=/CriOS/.test(navigator.userAgent);
// Copyright 2017 The Chromium Authors
let hideInk$1=false;assert$1(!isIOS,"pointerdown doesn't work on iOS");document.addEventListener("pointerdown",(function(){hideInk$1=true}),true);document.addEventListener("keydown",(function(){hideInk$1=false}),true);function focusWithoutInk$1(toFocus){if(!("noink"in toFocus)||!hideInk$1){toFocus.focus();return}const toFocusWithNoInk=toFocus;assert$1(document===toFocusWithNoInk.ownerDocument);const{noink:noink}=toFocusWithNoInk;toFocusWithNoInk.noink=true;toFocusWithNoInk.focus();toFocusWithNoInk.noink=noink}
// Copyright 2022 The Chromium Authors
function assertExists(arg,message=`Expected ${arg} to be defined.`){assert$1(arg!==undefined&&arg!==null,message)}function assertExhaustive(value,message=`Unexpected value ${value}.`){assertNotReached$1(message)}function cast(arg,type,message){assertInstanceof$1(arg,type,message);return arg}function castExists(arg,message){assertExists(arg,message);return arg}const NETWORK_SECTION_PATH="internet";const ETHERNET_DETAILS_SUBPAGE_PATH="networkDetail";const WIFI_NETWORKS_SUBPAGE_PATH="networks?type=WiFi";const WIFI_DETAILS_SUBPAGE_PATH="networkDetail";const KNOWN_NETWORKS_SUBPAGE_PATH="knownNetworks";const CELLULAR_NETWORKS_SUBPAGE_PATH="networks?type=Cellular";const MOBILE_DATA_NETWORKS_SUBPAGE_PATH="networks?type=Tether";const CELLULAR_DETAILS_SUBPAGE_PATH="networkDetail";const TETHER_DETAILS_SUBPAGE_PATH="networkDetail";const VPN_DETAILS_SUBPAGE_PATH="networkDetail";const APN_SUBPAGE_PATH="apn";const HOTSPOT_SUBPAGE_PATH="hotspotDetail";const BLUETOOTH_SECTION_PATH="bluetooth";const BLUETOOTH_DEVICES_SUBPAGE_PATH="bluetoothDevices";const BLUETOOTH_DEVICE_DETAIL_SUBPAGE_PATH="bluetoothDeviceDetail";const BLUETOOTH_SAVED_DEVICES_SUBPAGE_PATH="bluetoothSavedDevices";const MULTI_DEVICE_SECTION_PATH="multidevice";const MULTI_DEVICE_FEATURES_SUBPAGE_PATH="multidevice/features";const NEARBY_SHARE_SUBPAGE_PATH="multidevice/nearbyshare";const PEOPLE_SECTION_PATH="osPeople";const MY_ACCOUNTS_SUBPAGE_PATH="accountManager";const SYNC_SUBPAGE_PATH="osSync";const SYNC_SETUP_SUBPAGE_PATH="osSyncSetup";const SYNC_DEPRECATED_ADVANCED_SUBPAGE_PATH="osSyncSetup/advanced";const DEVICE_SECTION_PATH="device";const POINTERS_SUBPAGE_PATH="pointer-overlay";const PER_DEVICE_KEYBOARD_SUBPAGE_PATH="per-device-keyboard";const PER_DEVICE_KEYBOARD_REMAP_KEYS_SUBPAGE_PATH="per-device-keyboard/remap-keys";const PER_DEVICE_MOUSE_SUBPAGE_PATH="per-device-mouse";const PER_DEVICE_POINTING_STICK_SUBPAGE_PATH="per-device-pointing-stick";const PER_DEVICE_TOUCHPAD_SUBPAGE_PATH="per-device-touchpad";const KEYBOARD_SUBPAGE_PATH="keyboard-overlay";const STYLUS_SUBPAGE_PATH="stylus";const DISPLAY_SUBPAGE_PATH="display";const AUDIO_SUBPAGE_PATH="audio";const STORAGE_SUBPAGE_PATH="storage";const EXTERNAL_STORAGE_SUBPAGE_PATH="storage/externalStoragePreferences";const POWER_SUBPAGE_PATH="power";const PERSONALIZATION_SECTION_PATH="personalization";const SEARCH_AND_ASSISTANT_SECTION_PATH="osSearch";const ASSISTANT_SUBPAGE_PATH="googleAssistant";const SEARCH_SUBPAGE_PATH="osSearch/search";const APPS_SECTION_PATH="apps";const APP_MANAGEMENT_SUBPAGE_PATH="app-management";const APP_NOTIFICATIONS_SUBPAGE_PATH="app-notifications";const APP_DETAILS_SUBPAGE_PATH="app-management/detail";const GOOGLE_PLAY_STORE_SUBPAGE_PATH="androidAppsDetails";const PLUGIN_VM_SHARED_PATHS_SUBPAGE_PATH="app-management/pluginVm/sharedPaths";const PLUGIN_VM_USB_PREFERENCES_SUBPAGE_PATH="app-management/pluginVm/sharedUsbDevices";const ARC_VM_USB_PREFERENCES_SUBPAGE_PATH="androidAppsDetails/sharedUsbDevices";const CROSTINI_SECTION_PATH="crostini";const CROSTINI_DETAILS_SUBPAGE_PATH="crostini/details";const CROSTINI_MANAGE_SHARED_FOLDERS_SUBPAGE_PATH="crostini/sharedPaths";const CROSTINI_USB_PREFERENCES_SUBPAGE_PATH="crostini/sharedUsbDevices";const CROSTINI_BACKUP_AND_RESTORE_SUBPAGE_PATH="crostini/exportImport";const CROSTINI_DEVELOP_ANDROID_APPS_SUBPAGE_PATH="crostini/androidAdb";const CROSTINI_PORT_FORWARDING_SUBPAGE_PATH="crostini/portForwarding";const CROSTINI_EXTRA_CONTAINERS_SUBPAGE_PATH="crostini/extraContainers";const BRUSCHETTA_DETAILS_SUBPAGE_PATH="bruschetta/details";const BRUSCHETTA_USB_PREFERENCES_SUBPAGE_PATH="bruschetta/sharedUsbDevices";const BRUSCHETTA_MANAGE_SHARED_FOLDERS_SUBPAGE_PATH="bruschetta/sharedPaths";const DATE_AND_TIME_SECTION_PATH="dateTime";const TIME_ZONE_SUBPAGE_PATH="dateTime/timeZone";const PRIVACY_AND_SECURITY_SECTION_PATH="osPrivacy";const MANAGE_OTHER_PEOPLE_SUBPAGE_PATH_V2="osPrivacy/accounts";const SECURITY_AND_SIGN_IN_SUBPAGE_PATH_V2="osPrivacy/lockScreen";const FINGERPRINT_SUBPAGE_PATH_V2="osPrivacy/lockScreen/fingerprint";const SMART_PRIVACY_SUBPAGE_PATH="osPrivacy/smartPrivacy";const PRIVACY_HUB_SUBPAGE_PATH="osPrivacy/privacyHub";const LANGUAGES_AND_INPUT_SECTION_PATH="osLanguages";const SMART_INPUTS_SUBPAGE_PATH="osLanguages/smartInputs";const INPUT_METHOD_OPTIONS_SUBPAGE_PATH="osLanguages/inputMethodOptions";const LANGUAGES_SUBPAGE_PATH="osLanguages/languages";const INPUT_SUBPAGE_PATH="osLanguages/input";const EDIT_DICTIONARY_SUBPAGE_PATH="osLanguages/editDictionary";const JAPANESE_MANAGE_USER_DICTIONARY_SUBPAGE_PATH="osLanguages/japaneseManageUserDictionary";const FILES_SECTION_PATH="files";const GOOGLE_DRIVE_SUBPAGE_PATH="googleDrive";const NETWORK_FILE_SHARES_SUBPAGE_PATH="smbShares";const OFFICE_FILES_SUBPAGE_PATH="officeFiles";const PRINTING_SECTION_PATH="osPrinting";const PRINTING_DETAILS_SUBPAGE_PATH="cupsPrinters";const ACCESSIBILITY_SECTION_PATH="osAccessibility";const MANAGE_ACCESSIBILITY_SUBPAGE_PATH="manageAccessibility";const TEXT_TO_SPEECH_PAGE_PATH="textToSpeech";const DISPLAY_AND_MAGNIFICATION_SUBPAGE_PATH="displayAndMagnification";const KEYBOARD_AND_TEXT_INPUT_SUBPAGE_PATH="keyboardAndTextInput";const CURSOR_AND_TOUCHPAD_SUBPAGE_PATH="cursorAndTouchpad";const SELECT_TO_SPEAK_SUBPAGE_PATH="textToSpeech/selectToSpeak";const CHROME_VOX_SUBPAGE_PATH="textToSpeech/chromeVox";const AUDIO_AND_CAPTIONS_SUBPAGE_PATH="audioAndCaptions";const TEXT_TO_SPEECH_SUBPAGE_PATH="manageAccessibility/tts";const SWITCH_ACCESS_OPTIONS_SUBPAGE_PATH="manageAccessibility/switchAccess";const RESET_SECTION_PATH="osReset";const ABOUT_CHROME_OS_SECTION_PATH="help";const ABOUT_CHROME_OS_DETAILS_SUBPAGE_PATH="help/about";const DETAILED_BUILD_INFO_SUBPAGE_PATH="help/details";const KERBEROS_SECTION_PATH="kerberos";const KERBEROS_ACCOUNTS_V2_SUBPAGE_PATH="kerberos/kerberosAccounts";const SectionSpec={$:mojo.internal.Enum()};var Section;(function(Section){Section[Section["kNetwork"]=0]="kNetwork";Section[Section["kBluetooth"]=1]="kBluetooth";Section[Section["kMultiDevice"]=2]="kMultiDevice";Section[Section["kPeople"]=3]="kPeople";Section[Section["kDevice"]=4]="kDevice";Section[Section["kPersonalization"]=5]="kPersonalization";Section[Section["kSearchAndAssistant"]=6]="kSearchAndAssistant";Section[Section["kApps"]=7]="kApps";Section[Section["kCrostini"]=8]="kCrostini";Section[Section["kDateAndTime"]=10]="kDateAndTime";Section[Section["kPrivacyAndSecurity"]=11]="kPrivacyAndSecurity";Section[Section["kLanguagesAndInput"]=12]="kLanguagesAndInput";Section[Section["kFiles"]=13]="kFiles";Section[Section["kPrinting"]=14]="kPrinting";Section[Section["kAccessibility"]=15]="kAccessibility";Section[Section["kReset"]=16]="kReset";Section[Section["kAboutChromeOs"]=17]="kAboutChromeOs";Section[Section["kKerberos"]=18]="kKerberos";Section[Section["MIN_VALUE"]=0]="MIN_VALUE";Section[Section["MAX_VALUE"]=18]="MAX_VALUE"})(Section||(Section={}));const SubpageSpec={$:mojo.internal.Enum()};var Subpage;(function(Subpage){Subpage[Subpage["kEthernetDetails"]=0]="kEthernetDetails";Subpage[Subpage["kWifiNetworks"]=1]="kWifiNetworks";Subpage[Subpage["kWifiDetails"]=2]="kWifiDetails";Subpage[Subpage["kKnownNetworks"]=3]="kKnownNetworks";Subpage[Subpage["kMobileDataNetworks"]=4]="kMobileDataNetworks";Subpage[Subpage["kCellularDetails"]=5]="kCellularDetails";Subpage[Subpage["kTetherDetails"]=6]="kTetherDetails";Subpage[Subpage["kVpnDetails"]=7]="kVpnDetails";Subpage[Subpage["kApn"]=8]="kApn";Subpage[Subpage["kHotspotDetails"]=9]="kHotspotDetails";Subpage[Subpage["kBluetoothDevices"]=100]="kBluetoothDevices";Subpage[Subpage["kBluetoothDeviceDetail"]=101]="kBluetoothDeviceDetail";Subpage[Subpage["kBluetoothSavedDevices"]=102]="kBluetoothSavedDevices";Subpage[Subpage["kMultiDeviceFeatures"]=200]="kMultiDeviceFeatures";Subpage[Subpage["kNearbyShare"]=202]="kNearbyShare";Subpage[Subpage["kMyAccounts"]=300]="kMyAccounts";Subpage[Subpage["kSync"]=301]="kSync";Subpage[Subpage["kSyncSetup"]=302]="kSyncSetup";Subpage[Subpage["kSyncDeprecatedAdvanced"]=303]="kSyncDeprecatedAdvanced";Subpage[Subpage["kPointers"]=400]="kPointers";Subpage[Subpage["kKeyboard"]=401]="kKeyboard";Subpage[Subpage["kStylus"]=402]="kStylus";Subpage[Subpage["kDisplay"]=403]="kDisplay";Subpage[Subpage["kStorage"]=404]="kStorage";Subpage[Subpage["kExternalStorage"]=405]="kExternalStorage";Subpage[Subpage["kPower"]=407]="kPower";Subpage[Subpage["kAudio"]=408]="kAudio";Subpage[Subpage["kPerDeviceKeyboard"]=409]="kPerDeviceKeyboard";Subpage[Subpage["kPerDeviceMouse"]=410]="kPerDeviceMouse";Subpage[Subpage["kPerDeviceTouchpad"]=411]="kPerDeviceTouchpad";Subpage[Subpage["kPerDevicePointingStick"]=412]="kPerDevicePointingStick";Subpage[Subpage["kPerDeviceKeyboardRemapKeys"]=413]="kPerDeviceKeyboardRemapKeys";Subpage[Subpage["kAssistant"]=600]="kAssistant";Subpage[Subpage["kSearch"]=601]="kSearch";Subpage[Subpage["kAppManagement"]=700]="kAppManagement";Subpage[Subpage["kAppDetails"]=701]="kAppDetails";Subpage[Subpage["kGooglePlayStore"]=702]="kGooglePlayStore";Subpage[Subpage["kPluginVmSharedPaths"]=703]="kPluginVmSharedPaths";Subpage[Subpage["kPluginVmUsbPreferences"]=704]="kPluginVmUsbPreferences";Subpage[Subpage["kAppNotifications"]=706]="kAppNotifications";Subpage[Subpage["kArcVmUsbPreferences"]=707]="kArcVmUsbPreferences";Subpage[Subpage["kCrostiniDetails"]=800]="kCrostiniDetails";Subpage[Subpage["kCrostiniManageSharedFolders"]=801]="kCrostiniManageSharedFolders";Subpage[Subpage["kCrostiniUsbPreferences"]=802]="kCrostiniUsbPreferences";Subpage[Subpage["kCrostiniBackupAndRestore"]=803]="kCrostiniBackupAndRestore";Subpage[Subpage["kCrostiniDevelopAndroidApps"]=804]="kCrostiniDevelopAndroidApps";Subpage[Subpage["kCrostiniPortForwarding"]=805]="kCrostiniPortForwarding";Subpage[Subpage["kCrostiniExtraContainers"]=806]="kCrostiniExtraContainers";Subpage[Subpage["kBruschettaDetails"]=850]="kBruschettaDetails";Subpage[Subpage["kBruschettaUsbPreferences"]=851]="kBruschettaUsbPreferences";Subpage[Subpage["kBruschettaManageSharedFolders"]=852]="kBruschettaManageSharedFolders";Subpage[Subpage["kTimeZone"]=1e3]="kTimeZone";Subpage[Subpage["kManageOtherPeopleV2"]=1100]="kManageOtherPeopleV2";Subpage[Subpage["kSecurityAndSignInV2"]=1101]="kSecurityAndSignInV2";Subpage[Subpage["kFingerprintV2"]=1102]="kFingerprintV2";Subpage[Subpage["kSmartPrivacy"]=1103]="kSmartPrivacy";Subpage[Subpage["kPrivacyHub"]=1104]="kPrivacyHub";Subpage[Subpage["kSmartInputs"]=1202]="kSmartInputs";Subpage[Subpage["kInputMethodOptions"]=1203]="kInputMethodOptions";Subpage[Subpage["kLanguages"]=1204]="kLanguages";Subpage[Subpage["kInput"]=1205]="kInput";Subpage[Subpage["kEditDictionary"]=1206]="kEditDictionary";Subpage[Subpage["kJapaneseManageUserDictionary"]=1207]="kJapaneseManageUserDictionary";Subpage[Subpage["kNetworkFileShares"]=1300]="kNetworkFileShares";Subpage[Subpage["kOfficeFiles"]=1301]="kOfficeFiles";Subpage[Subpage["kGoogleDrive"]=1302]="kGoogleDrive";Subpage[Subpage["kPrintingDetails"]=1400]="kPrintingDetails";Subpage[Subpage["kManageAccessibility"]=1500]="kManageAccessibility";Subpage[Subpage["kTextToSpeech"]=1502]="kTextToSpeech";Subpage[Subpage["kSwitchAccessOptions"]=1503]="kSwitchAccessOptions";Subpage[Subpage["kTextToSpeechPage"]=1505]="kTextToSpeechPage";Subpage[Subpage["kDisplayAndMagnification"]=1506]="kDisplayAndMagnification";Subpage[Subpage["kKeyboardAndTextInput"]=1507]="kKeyboardAndTextInput";Subpage[Subpage["kCursorAndTouchpad"]=1508]="kCursorAndTouchpad";Subpage[Subpage["kAudioAndCaptions"]=1509]="kAudioAndCaptions";Subpage[Subpage["kSelectToSpeak"]=1510]="kSelectToSpeak";Subpage[Subpage["kChromeVox"]=1511]="kChromeVox";Subpage[Subpage["kAboutChromeOsDetails"]=1700]="kAboutChromeOsDetails";Subpage[Subpage["kDetailedBuildInfo"]=1701]="kDetailedBuildInfo";Subpage[Subpage["kKerberosAccountsV2"]=1800]="kKerberosAccountsV2";Subpage[Subpage["MIN_VALUE"]=0]="MIN_VALUE";Subpage[Subpage["MAX_VALUE"]=1800]="MAX_VALUE"})(Subpage||(Subpage={}));var routesMojom=Object.freeze({__proto__:null,ABOUT_CHROME_OS_DETAILS_SUBPAGE_PATH:ABOUT_CHROME_OS_DETAILS_SUBPAGE_PATH,ABOUT_CHROME_OS_SECTION_PATH:ABOUT_CHROME_OS_SECTION_PATH,ACCESSIBILITY_SECTION_PATH:ACCESSIBILITY_SECTION_PATH,APN_SUBPAGE_PATH:APN_SUBPAGE_PATH,APPS_SECTION_PATH:APPS_SECTION_PATH,APP_DETAILS_SUBPAGE_PATH:APP_DETAILS_SUBPAGE_PATH,APP_MANAGEMENT_SUBPAGE_PATH:APP_MANAGEMENT_SUBPAGE_PATH,APP_NOTIFICATIONS_SUBPAGE_PATH:APP_NOTIFICATIONS_SUBPAGE_PATH,ARC_VM_USB_PREFERENCES_SUBPAGE_PATH:ARC_VM_USB_PREFERENCES_SUBPAGE_PATH,ASSISTANT_SUBPAGE_PATH:ASSISTANT_SUBPAGE_PATH,AUDIO_AND_CAPTIONS_SUBPAGE_PATH:AUDIO_AND_CAPTIONS_SUBPAGE_PATH,AUDIO_SUBPAGE_PATH:AUDIO_SUBPAGE_PATH,BLUETOOTH_DEVICES_SUBPAGE_PATH:BLUETOOTH_DEVICES_SUBPAGE_PATH,BLUETOOTH_DEVICE_DETAIL_SUBPAGE_PATH:BLUETOOTH_DEVICE_DETAIL_SUBPAGE_PATH,BLUETOOTH_SAVED_DEVICES_SUBPAGE_PATH:BLUETOOTH_SAVED_DEVICES_SUBPAGE_PATH,BLUETOOTH_SECTION_PATH:BLUETOOTH_SECTION_PATH,BRUSCHETTA_DETAILS_SUBPAGE_PATH:BRUSCHETTA_DETAILS_SUBPAGE_PATH,BRUSCHETTA_MANAGE_SHARED_FOLDERS_SUBPAGE_PATH:BRUSCHETTA_MANAGE_SHARED_FOLDERS_SUBPAGE_PATH,BRUSCHETTA_USB_PREFERENCES_SUBPAGE_PATH:BRUSCHETTA_USB_PREFERENCES_SUBPAGE_PATH,CELLULAR_DETAILS_SUBPAGE_PATH:CELLULAR_DETAILS_SUBPAGE_PATH,CELLULAR_NETWORKS_SUBPAGE_PATH:CELLULAR_NETWORKS_SUBPAGE_PATH,CHROME_VOX_SUBPAGE_PATH:CHROME_VOX_SUBPAGE_PATH,CROSTINI_BACKUP_AND_RESTORE_SUBPAGE_PATH:CROSTINI_BACKUP_AND_RESTORE_SUBPAGE_PATH,CROSTINI_DETAILS_SUBPAGE_PATH:CROSTINI_DETAILS_SUBPAGE_PATH,CROSTINI_DEVELOP_ANDROID_APPS_SUBPAGE_PATH:CROSTINI_DEVELOP_ANDROID_APPS_SUBPAGE_PATH,CROSTINI_EXTRA_CONTAINERS_SUBPAGE_PATH:CROSTINI_EXTRA_CONTAINERS_SUBPAGE_PATH,CROSTINI_MANAGE_SHARED_FOLDERS_SUBPAGE_PATH:CROSTINI_MANAGE_SHARED_FOLDERS_SUBPAGE_PATH,CROSTINI_PORT_FORWARDING_SUBPAGE_PATH:CROSTINI_PORT_FORWARDING_SUBPAGE_PATH,CROSTINI_SECTION_PATH:CROSTINI_SECTION_PATH,CROSTINI_USB_PREFERENCES_SUBPAGE_PATH:CROSTINI_USB_PREFERENCES_SUBPAGE_PATH,CURSOR_AND_TOUCHPAD_SUBPAGE_PATH:CURSOR_AND_TOUCHPAD_SUBPAGE_PATH,DATE_AND_TIME_SECTION_PATH:DATE_AND_TIME_SECTION_PATH,DETAILED_BUILD_INFO_SUBPAGE_PATH:DETAILED_BUILD_INFO_SUBPAGE_PATH,DEVICE_SECTION_PATH:DEVICE_SECTION_PATH,DISPLAY_AND_MAGNIFICATION_SUBPAGE_PATH:DISPLAY_AND_MAGNIFICATION_SUBPAGE_PATH,DISPLAY_SUBPAGE_PATH:DISPLAY_SUBPAGE_PATH,EDIT_DICTIONARY_SUBPAGE_PATH:EDIT_DICTIONARY_SUBPAGE_PATH,ETHERNET_DETAILS_SUBPAGE_PATH:ETHERNET_DETAILS_SUBPAGE_PATH,EXTERNAL_STORAGE_SUBPAGE_PATH:EXTERNAL_STORAGE_SUBPAGE_PATH,FILES_SECTION_PATH:FILES_SECTION_PATH,FINGERPRINT_SUBPAGE_PATH_V2:FINGERPRINT_SUBPAGE_PATH_V2,GOOGLE_DRIVE_SUBPAGE_PATH:GOOGLE_DRIVE_SUBPAGE_PATH,GOOGLE_PLAY_STORE_SUBPAGE_PATH:GOOGLE_PLAY_STORE_SUBPAGE_PATH,HOTSPOT_SUBPAGE_PATH:HOTSPOT_SUBPAGE_PATH,INPUT_METHOD_OPTIONS_SUBPAGE_PATH:INPUT_METHOD_OPTIONS_SUBPAGE_PATH,INPUT_SUBPAGE_PATH:INPUT_SUBPAGE_PATH,JAPANESE_MANAGE_USER_DICTIONARY_SUBPAGE_PATH:JAPANESE_MANAGE_USER_DICTIONARY_SUBPAGE_PATH,KERBEROS_ACCOUNTS_V2_SUBPAGE_PATH:KERBEROS_ACCOUNTS_V2_SUBPAGE_PATH,KERBEROS_SECTION_PATH:KERBEROS_SECTION_PATH,KEYBOARD_AND_TEXT_INPUT_SUBPAGE_PATH:KEYBOARD_AND_TEXT_INPUT_SUBPAGE_PATH,KEYBOARD_SUBPAGE_PATH:KEYBOARD_SUBPAGE_PATH,KNOWN_NETWORKS_SUBPAGE_PATH:KNOWN_NETWORKS_SUBPAGE_PATH,LANGUAGES_AND_INPUT_SECTION_PATH:LANGUAGES_AND_INPUT_SECTION_PATH,LANGUAGES_SUBPAGE_PATH:LANGUAGES_SUBPAGE_PATH,MANAGE_ACCESSIBILITY_SUBPAGE_PATH:MANAGE_ACCESSIBILITY_SUBPAGE_PATH,MANAGE_OTHER_PEOPLE_SUBPAGE_PATH_V2:MANAGE_OTHER_PEOPLE_SUBPAGE_PATH_V2,MOBILE_DATA_NETWORKS_SUBPAGE_PATH:MOBILE_DATA_NETWORKS_SUBPAGE_PATH,MULTI_DEVICE_FEATURES_SUBPAGE_PATH:MULTI_DEVICE_FEATURES_SUBPAGE_PATH,MULTI_DEVICE_SECTION_PATH:MULTI_DEVICE_SECTION_PATH,MY_ACCOUNTS_SUBPAGE_PATH:MY_ACCOUNTS_SUBPAGE_PATH,NEARBY_SHARE_SUBPAGE_PATH:NEARBY_SHARE_SUBPAGE_PATH,NETWORK_FILE_SHARES_SUBPAGE_PATH:NETWORK_FILE_SHARES_SUBPAGE_PATH,NETWORK_SECTION_PATH:NETWORK_SECTION_PATH,OFFICE_FILES_SUBPAGE_PATH:OFFICE_FILES_SUBPAGE_PATH,PEOPLE_SECTION_PATH:PEOPLE_SECTION_PATH,PERSONALIZATION_SECTION_PATH:PERSONALIZATION_SECTION_PATH,PER_DEVICE_KEYBOARD_REMAP_KEYS_SUBPAGE_PATH:PER_DEVICE_KEYBOARD_REMAP_KEYS_SUBPAGE_PATH,PER_DEVICE_KEYBOARD_SUBPAGE_PATH:PER_DEVICE_KEYBOARD_SUBPAGE_PATH,PER_DEVICE_MOUSE_SUBPAGE_PATH:PER_DEVICE_MOUSE_SUBPAGE_PATH,PER_DEVICE_POINTING_STICK_SUBPAGE_PATH:PER_DEVICE_POINTING_STICK_SUBPAGE_PATH,PER_DEVICE_TOUCHPAD_SUBPAGE_PATH:PER_DEVICE_TOUCHPAD_SUBPAGE_PATH,PLUGIN_VM_SHARED_PATHS_SUBPAGE_PATH:PLUGIN_VM_SHARED_PATHS_SUBPAGE_PATH,PLUGIN_VM_USB_PREFERENCES_SUBPAGE_PATH:PLUGIN_VM_USB_PREFERENCES_SUBPAGE_PATH,POINTERS_SUBPAGE_PATH:POINTERS_SUBPAGE_PATH,POWER_SUBPAGE_PATH:POWER_SUBPAGE_PATH,PRINTING_DETAILS_SUBPAGE_PATH:PRINTING_DETAILS_SUBPAGE_PATH,PRINTING_SECTION_PATH:PRINTING_SECTION_PATH,PRIVACY_AND_SECURITY_SECTION_PATH:PRIVACY_AND_SECURITY_SECTION_PATH,PRIVACY_HUB_SUBPAGE_PATH:PRIVACY_HUB_SUBPAGE_PATH,RESET_SECTION_PATH:RESET_SECTION_PATH,SEARCH_AND_ASSISTANT_SECTION_PATH:SEARCH_AND_ASSISTANT_SECTION_PATH,SEARCH_SUBPAGE_PATH:SEARCH_SUBPAGE_PATH,SECURITY_AND_SIGN_IN_SUBPAGE_PATH_V2:SECURITY_AND_SIGN_IN_SUBPAGE_PATH_V2,SELECT_TO_SPEAK_SUBPAGE_PATH:SELECT_TO_SPEAK_SUBPAGE_PATH,SMART_INPUTS_SUBPAGE_PATH:SMART_INPUTS_SUBPAGE_PATH,SMART_PRIVACY_SUBPAGE_PATH:SMART_PRIVACY_SUBPAGE_PATH,STORAGE_SUBPAGE_PATH:STORAGE_SUBPAGE_PATH,STYLUS_SUBPAGE_PATH:STYLUS_SUBPAGE_PATH,SWITCH_ACCESS_OPTIONS_SUBPAGE_PATH:SWITCH_ACCESS_OPTIONS_SUBPAGE_PATH,SYNC_DEPRECATED_ADVANCED_SUBPAGE_PATH:SYNC_DEPRECATED_ADVANCED_SUBPAGE_PATH,SYNC_SETUP_SUBPAGE_PATH:SYNC_SETUP_SUBPAGE_PATH,SYNC_SUBPAGE_PATH:SYNC_SUBPAGE_PATH,get Section(){return Section},SectionSpec:SectionSpec,get Subpage(){return Subpage},SubpageSpec:SubpageSpec,TETHER_DETAILS_SUBPAGE_PATH:TETHER_DETAILS_SUBPAGE_PATH,TEXT_TO_SPEECH_PAGE_PATH:TEXT_TO_SPEECH_PAGE_PATH,TEXT_TO_SPEECH_SUBPAGE_PATH:TEXT_TO_SPEECH_SUBPAGE_PATH,TIME_ZONE_SUBPAGE_PATH:TIME_ZONE_SUBPAGE_PATH,VPN_DETAILS_SUBPAGE_PATH:VPN_DETAILS_SUBPAGE_PATH,WIFI_DETAILS_SUBPAGE_PATH:WIFI_DETAILS_SUBPAGE_PATH,WIFI_NETWORKS_SUBPAGE_PATH:WIFI_NETWORKS_SUBPAGE_PATH});
// Copyright 2016 The Chromium Authors
class Route{constructor(path,title){this.path=path;this.title=title;this.parent=null;this.depth=0;this.isNavigableDialog=false;this.section=""}createChild(path,title){assert$1(path);const childPath=path[0]==="/"?path:`${this.path}/${path}`;const route=new Route(childPath,title);route.parent=this;route.section=this.section;route.depth=this.depth+1;return route}createSection(path,section,title){const route=this.createChild(path,title);route.section=section;return route}getAbsolutePath(){return window.location.origin+this.path}contains(route){for(let curr=route;curr!==null;curr=curr.parent){if(this===curr){return true}}return false}isSubpage(){return!this.isNavigableDialog&&!!this.parent&&!!this.section&&this.parent.section===this.section}}function createSection(parent,path,_section){return parent.createSection(`/${path}`,path)}function createSubpage(parent,path,_subpage){return parent.createChild("/"+path)}function createOsSettingsRoutes(){const r={};const{Section:Section,Subpage:Subpage}=routesMojom;r.BASIC=new Route("/");r.ADVANCED=new Route("/advanced");r.INTERNET=createSection(r.BASIC,NETWORK_SECTION_PATH,Section.kNetwork);r.INTERNET_NETWORKS=createSubpage(r.INTERNET,"networks",Subpage.kWifiNetworks);r.NETWORK_DETAIL=createSubpage(r.INTERNET,"networkDetail",Subpage.kWifiDetails);r.KNOWN_NETWORKS=createSubpage(r.INTERNET,KNOWN_NETWORKS_SUBPAGE_PATH,Subpage.kKnownNetworks);if(loadTimeData.getBoolean("isHotspotEnabled")){r.HOTSPOT_DETAIL=createSubpage(r.INTERNET,"hotspotDetail",Subpage.kHotspotDetails)}if(loadTimeData.getBoolean("isApnRevampEnabled")){r.APN=createSubpage(r.INTERNET,APN_SUBPAGE_PATH,Subpage.kApn)}r.BLUETOOTH=createSection(r.BASIC,BLUETOOTH_SECTION_PATH,Section.kBluetooth);r.BLUETOOTH_DEVICES=createSubpage(r.BLUETOOTH,BLUETOOTH_DEVICES_SUBPAGE_PATH,Subpage.kBluetoothDevices);r.BLUETOOTH_DEVICE_DETAIL=createSubpage(r.BLUETOOTH,BLUETOOTH_DEVICE_DETAIL_SUBPAGE_PATH,Subpage.kBluetoothDeviceDetail);if(loadTimeData.getBoolean("enableSavedDevicesFlag")){r.BLUETOOTH_SAVED_DEVICES=createSubpage(r.BLUETOOTH,BLUETOOTH_SAVED_DEVICES_SUBPAGE_PATH,Subpage.kBluetoothSavedDevices)}if(!loadTimeData.getBoolean("isGuest")){r.MULTIDEVICE=createSection(r.BASIC,MULTI_DEVICE_SECTION_PATH,Section.kMultiDevice);r.MULTIDEVICE_FEATURES=createSubpage(r.MULTIDEVICE,MULTI_DEVICE_FEATURES_SUBPAGE_PATH,Subpage.kMultiDeviceFeatures);if(loadTimeData.getBoolean("isNearbyShareSupported")){r.NEARBY_SHARE=createSubpage(r.MULTIDEVICE,NEARBY_SHARE_SUBPAGE_PATH,Subpage.kNearbyShare)}}if(!loadTimeData.getBoolean("isGuest")){r.OS_PEOPLE=createSection(r.BASIC,PEOPLE_SECTION_PATH,Section.kPeople);r.ACCOUNT_MANAGER=createSubpage(r.OS_PEOPLE,MY_ACCOUNTS_SUBPAGE_PATH,Subpage.kMyAccounts);r.OS_SYNC=createSubpage(r.OS_PEOPLE,SYNC_SUBPAGE_PATH,Subpage.kSync);r.SYNC=createSubpage(r.OS_PEOPLE,SYNC_SETUP_SUBPAGE_PATH,Subpage.kSyncSetup)}if(loadTimeData.valueExists("isKerberosEnabled")&&loadTimeData.getBoolean("isKerberosEnabled")){r.KERBEROS=createSection(r.BASIC,KERBEROS_SECTION_PATH,Section.kKerberos);r.KERBEROS_ACCOUNTS_V2=createSubpage(r.KERBEROS,KERBEROS_ACCOUNTS_V2_SUBPAGE_PATH,Subpage.kKerberosAccountsV2)}r.DEVICE=createSection(r.BASIC,DEVICE_SECTION_PATH,Section.kDevice);r.POINTERS=createSubpage(r.DEVICE,POINTERS_SUBPAGE_PATH,Subpage.kPointers);r.KEYBOARD=createSubpage(r.DEVICE,KEYBOARD_SUBPAGE_PATH,Subpage.kKeyboard);r.STYLUS=createSubpage(r.DEVICE,STYLUS_SUBPAGE_PATH,Subpage.kStylus);r.DISPLAY=createSubpage(r.DEVICE,DISPLAY_SUBPAGE_PATH,Subpage.kDisplay);if(loadTimeData.getBoolean("enableAudioSettingsPage")){r.AUDIO=createSubpage(r.DEVICE,AUDIO_SUBPAGE_PATH,Subpage.kAudio)}if(loadTimeData.getBoolean("enableInputDeviceSettingsSplit")){r.PER_DEVICE_KEYBOARD=createSubpage(r.DEVICE,PER_DEVICE_KEYBOARD_SUBPAGE_PATH,Subpage.kPerDeviceKeyboard);r.PER_DEVICE_MOUSE=createSubpage(r.DEVICE,PER_DEVICE_MOUSE_SUBPAGE_PATH,Subpage.kPerDeviceMouse);r.PER_DEVICE_POINTING_STICK=createSubpage(r.DEVICE,PER_DEVICE_POINTING_STICK_SUBPAGE_PATH,Subpage.kPerDevicePointingStick);r.PER_DEVICE_TOUCHPAD=createSubpage(r.DEVICE,PER_DEVICE_TOUCHPAD_SUBPAGE_PATH,Subpage.kPerDeviceTouchpad);r.PER_DEVICE_KEYBOARD_REMAP_KEYS=createSubpage(r.PER_DEVICE_KEYBOARD,PER_DEVICE_KEYBOARD_REMAP_KEYS_SUBPAGE_PATH,Subpage.kPerDeviceKeyboardRemapKeys)}r.STORAGE=createSubpage(r.DEVICE,STORAGE_SUBPAGE_PATH,Subpage.kStorage);r.EXTERNAL_STORAGE_PREFERENCES=createSubpage(r.STORAGE,EXTERNAL_STORAGE_SUBPAGE_PATH,Subpage.kExternalStorage);r.POWER=createSubpage(r.DEVICE,POWER_SUBPAGE_PATH,Subpage.kPower);if(!loadTimeData.getBoolean("isGuest")){r.PERSONALIZATION=createSection(r.BASIC,PERSONALIZATION_SECTION_PATH,Section.kPersonalization)}r.OS_SEARCH=createSection(r.BASIC,SEARCH_AND_ASSISTANT_SECTION_PATH,Section.kSearchAndAssistant);r.GOOGLE_ASSISTANT=createSubpage(r.OS_SEARCH,ASSISTANT_SUBPAGE_PATH,Subpage.kAssistant);r.SEARCH_SUBPAGE=createSubpage(r.OS_SEARCH,SEARCH_SUBPAGE_PATH,Subpage.kSearch);r.APPS=createSection(r.BASIC,APPS_SECTION_PATH,Section.kApps);r.APP_NOTIFICATIONS=createSubpage(r.APPS,APP_NOTIFICATIONS_SUBPAGE_PATH,Subpage.kAppNotifications);r.APP_MANAGEMENT=createSubpage(r.APPS,APP_MANAGEMENT_SUBPAGE_PATH,Subpage.kAppManagement);r.APP_MANAGEMENT_DETAIL=createSubpage(r.APP_MANAGEMENT,APP_DETAILS_SUBPAGE_PATH,Subpage.kAppDetails);if(loadTimeData.valueExists("androidAppsVisible")&&loadTimeData.getBoolean("androidAppsVisible")){r.ANDROID_APPS_DETAILS=createSubpage(r.APPS,GOOGLE_PLAY_STORE_SUBPAGE_PATH,Subpage.kGooglePlayStore);if(loadTimeData.valueExists("showArcvmManageUsb")&&loadTimeData.getBoolean("showArcvmManageUsb")){r.ANDROID_APPS_DETAILS_ARC_VM_SHARED_USB_DEVICES=createSubpage(r.ANDROID_APPS_DETAILS,ARC_VM_USB_PREFERENCES_SUBPAGE_PATH,Subpage.kArcVmUsbPreferences)}}if(loadTimeData.valueExists("showPluginVm")&&loadTimeData.getBoolean("showPluginVm")){r.APP_MANAGEMENT_PLUGIN_VM_SHARED_PATHS=createSubpage(r.APP_MANAGEMENT,PLUGIN_VM_SHARED_PATHS_SUBPAGE_PATH,Subpage.kPluginVmSharedPaths);r.APP_MANAGEMENT_PLUGIN_VM_SHARED_USB_DEVICES=createSubpage(r.APP_MANAGEMENT,PLUGIN_VM_USB_PREFERENCES_SUBPAGE_PATH,Subpage.kPluginVmUsbPreferences)}r.OS_ACCESSIBILITY=createSection(r.BASIC,ACCESSIBILITY_SECTION_PATH,Section.kAccessibility);r.MANAGE_ACCESSIBILITY=createSubpage(r.OS_ACCESSIBILITY,MANAGE_ACCESSIBILITY_SUBPAGE_PATH,Subpage.kManageAccessibility);r.A11Y_TEXT_TO_SPEECH=createSubpage(r.OS_ACCESSIBILITY,TEXT_TO_SPEECH_PAGE_PATH,Subpage.kTextToSpeechPage);r.A11Y_DISPLAY_AND_MAGNIFICATION=createSubpage(r.OS_ACCESSIBILITY,DISPLAY_AND_MAGNIFICATION_SUBPAGE_PATH,Subpage.kDisplayAndMagnification);r.A11Y_KEYBOARD_AND_TEXT_INPUT=createSubpage(r.OS_ACCESSIBILITY,KEYBOARD_AND_TEXT_INPUT_SUBPAGE_PATH,Subpage.kKeyboardAndTextInput);r.A11Y_CURSOR_AND_TOUCHPAD=createSubpage(r.OS_ACCESSIBILITY,CURSOR_AND_TOUCHPAD_SUBPAGE_PATH,Subpage.kCursorAndTouchpad);r.A11Y_AUDIO_AND_CAPTIONS=createSubpage(r.OS_ACCESSIBILITY,AUDIO_AND_CAPTIONS_SUBPAGE_PATH,Subpage.kAudioAndCaptions);if(loadTimeData.valueExists("isAccessibilityChromeVoxPageMigrationEnabled")&&loadTimeData.getBoolean("isAccessibilityChromeVoxPageMigrationEnabled")){r.A11Y_CHROMEVOX=createSubpage(r.A11Y_TEXT_TO_SPEECH,CHROME_VOX_SUBPAGE_PATH,Subpage.kChromeVox)}if(loadTimeData.valueExists("isAccessibilitySelectToSpeakPageMigrationEnabled")&&loadTimeData.getBoolean("isAccessibilitySelectToSpeakPageMigrationEnabled")){r.A11Y_SELECT_TO_SPEAK=createSubpage(r.A11Y_TEXT_TO_SPEECH,SELECT_TO_SPEAK_SUBPAGE_PATH,Subpage.kSelectToSpeak)}r.MANAGE_TTS_SETTINGS=createSubpage(loadTimeData.getBoolean("isKioskModeActive")?r.MANAGE_ACCESSIBILITY:r.A11Y_TEXT_TO_SPEECH,TEXT_TO_SPEECH_SUBPAGE_PATH,Subpage.kTextToSpeech);r.MANAGE_SWITCH_ACCESS_SETTINGS=createSubpage(r.A11Y_KEYBOARD_AND_TEXT_INPUT,SWITCH_ACCESS_OPTIONS_SUBPAGE_PATH,Subpage.kSwitchAccessOptions);r.CROSTINI=createSection(r.ADVANCED,CROSTINI_SECTION_PATH,Section.kCrostini);if(loadTimeData.valueExists("showCrostini")&&loadTimeData.getBoolean("showCrostini")){r.CROSTINI_DETAILS=createSubpage(r.CROSTINI,CROSTINI_DETAILS_SUBPAGE_PATH,Subpage.kCrostiniDetails);r.CROSTINI_SHARED_PATHS=createSubpage(r.CROSTINI_DETAILS,CROSTINI_MANAGE_SHARED_FOLDERS_SUBPAGE_PATH,Subpage.kCrostiniManageSharedFolders);r.CROSTINI_SHARED_USB_DEVICES=createSubpage(r.CROSTINI_DETAILS,CROSTINI_USB_PREFERENCES_SUBPAGE_PATH,Subpage.kCrostiniUsbPreferences);if(loadTimeData.valueExists("showCrostiniExportImport")&&loadTimeData.getBoolean("showCrostiniExportImport")){r.CROSTINI_EXPORT_IMPORT=createSubpage(r.CROSTINI_DETAILS,CROSTINI_BACKUP_AND_RESTORE_SUBPAGE_PATH,Subpage.kCrostiniBackupAndRestore)}if(loadTimeData.valueExists("showCrostiniExtraContainers")&&loadTimeData.getBoolean("showCrostiniExtraContainers")){r.CROSTINI_EXTRA_CONTAINERS=createSubpage(r.CROSTINI_DETAILS,CROSTINI_EXTRA_CONTAINERS_SUBPAGE_PATH,Subpage.kCrostiniExtraContainers)}r.CROSTINI_ANDROID_ADB=createSubpage(r.CROSTINI_DETAILS,CROSTINI_DEVELOP_ANDROID_APPS_SUBPAGE_PATH,Subpage.kCrostiniDevelopAndroidApps);r.CROSTINI_PORT_FORWARDING=createSubpage(r.CROSTINI_DETAILS,CROSTINI_PORT_FORWARDING_SUBPAGE_PATH,Subpage.kCrostiniPortForwarding);r.BRUSCHETTA_DETAILS=createSubpage(r.CROSTINI,BRUSCHETTA_DETAILS_SUBPAGE_PATH,Subpage.kBruschettaDetails);r.BRUSCHETTA_SHARED_USB_DEVICES=createSubpage(r.BRUSCHETTA_DETAILS,BRUSCHETTA_USB_PREFERENCES_SUBPAGE_PATH,Subpage.kBruschettaUsbPreferences);r.BRUSCHETTA_SHARED_PATHS=createSubpage(r.BRUSCHETTA_DETAILS,BRUSCHETTA_MANAGE_SHARED_FOLDERS_SUBPAGE_PATH,Subpage.kBruschettaManageSharedFolders)}r.DATETIME=createSection(r.ADVANCED,DATE_AND_TIME_SECTION_PATH,Section.kDateAndTime);r.DATETIME_TIMEZONE_SUBPAGE=createSubpage(r.DATETIME,TIME_ZONE_SUBPAGE_PATH,Subpage.kTimeZone);r.OS_PRIVACY=createSection(r.BASIC,PRIVACY_AND_SECURITY_SECTION_PATH,Section.kPrivacyAndSecurity);r.LOCK_SCREEN=createSubpage(r.OS_PRIVACY,SECURITY_AND_SIGN_IN_SUBPAGE_PATH_V2,Subpage.kSecurityAndSignInV2);r.FINGERPRINT=createSubpage(r.LOCK_SCREEN,FINGERPRINT_SUBPAGE_PATH_V2,Subpage.kFingerprintV2);r.ACCOUNTS=createSubpage(r.OS_PRIVACY,MANAGE_OTHER_PEOPLE_SUBPAGE_PATH_V2,Subpage.kManageOtherPeopleV2);r.SMART_PRIVACY=createSubpage(r.OS_PRIVACY,SMART_PRIVACY_SUBPAGE_PATH,Subpage.kSmartPrivacy);r.PRIVACY_HUB=createSubpage(r.OS_PRIVACY,PRIVACY_HUB_SUBPAGE_PATH,Subpage.kPrivacyHub);r.OS_LANGUAGES=createSection(r.ADVANCED,LANGUAGES_AND_INPUT_SECTION_PATH,Section.kLanguagesAndInput);r.OS_LANGUAGES_LANGUAGES=createSubpage(r.OS_LANGUAGES,LANGUAGES_SUBPAGE_PATH,Subpage.kLanguages);r.OS_LANGUAGES_INPUT=createSubpage(r.OS_LANGUAGES,INPUT_SUBPAGE_PATH,Subpage.kInput);r.OS_LANGUAGES_INPUT_METHOD_OPTIONS=createSubpage(r.OS_LANGUAGES_INPUT,INPUT_METHOD_OPTIONS_SUBPAGE_PATH,Subpage.kInputMethodOptions);r.OS_LANGUAGES_EDIT_DICTIONARY=createSubpage(r.OS_LANGUAGES_INPUT,EDIT_DICTIONARY_SUBPAGE_PATH,Subpage.kEditDictionary);r.OS_LANGUAGES_JAPANESE_MANAGE_USER_DICTIONARY=createSubpage(r.OS_LANGUAGES_INPUT,JAPANESE_MANAGE_USER_DICTIONARY_SUBPAGE_PATH,Subpage.kJapaneseManageUserDictionary);r.OS_LANGUAGES_SMART_INPUTS=createSubpage(r.OS_LANGUAGES,SMART_INPUTS_SUBPAGE_PATH,Subpage.kSmartInputs);if(!loadTimeData.getBoolean("isGuest")){r.FILES=createSection(r.ADVANCED,FILES_SECTION_PATH,Section.kFiles);r.SMB_SHARES=createSubpage(r.FILES,NETWORK_FILE_SHARES_SUBPAGE_PATH,Subpage.kNetworkFileShares);if(loadTimeData.getBoolean("enableDriveFsBulkPinning")){r.GOOGLE_DRIVE=createSubpage(r.FILES,GOOGLE_DRIVE_SUBPAGE_PATH,Subpage.kGoogleDrive)}r.OFFICE=createSubpage(r.FILES,OFFICE_FILES_SUBPAGE_PATH,Subpage.kOfficeFiles)}r.OS_PRINTING=createSection(r.ADVANCED,PRINTING_SECTION_PATH,Section.kPrinting);r.CUPS_PRINTERS=createSubpage(r.OS_PRINTING,PRINTING_DETAILS_SUBPAGE_PATH,Subpage.kPrintingDetails);if(loadTimeData.valueExists("allowPowerwash")&&loadTimeData.getBoolean("allowPowerwash")){r.OS_RESET=createSection(r.ADVANCED,RESET_SECTION_PATH,Section.kReset)}r.ABOUT=new Route("/"+ABOUT_CHROME_OS_SECTION_PATH);r.ABOUT_ABOUT=r.ABOUT.createSection("/"+ABOUT_CHROME_OS_DETAILS_SUBPAGE_PATH,"about");r.DETAILED_BUILD_INFO=createSubpage(r.ABOUT_ABOUT,DETAILED_BUILD_INFO_SUBPAGE_PATH,Subpage.kDetailedBuildInfo);return r}const routes=createOsSettingsRoutes();
// Copyright 2019 The Chromium Authors
const CANONICAL_PATH_REGEX=/(^\/)([\/-\w]+)(\/$)/;let routerInstance=null;class Router{static getInstance(){assert$1(routerInstance,"Router instance has not been set yet.");return routerInstance}static setInstance(instance){assert$1(routerInstance===null,"Router instance has already been set.");routerInstance=instance}static resetInstanceForTesting(instance){if(routerInstance){instance.routeObservers_=routerInstance.routeObservers_}routerInstance=instance}constructor(availableRoutes){this.routes_=availableRoutes;this.currentRoute_=this.routes_.BASIC;this.currentQueryParameters_=new URLSearchParams;this.lastRouteChangeWasPopstate_=false;this.initializeRouteFromUrlCalled_=false;this.routeObservers_=new Set}get routesMap_(){return this.routes_}get routes(){return this.routes_}get currentRoute(){return this.currentRoute_}addObserver(observer){assert$1(!this.routeObservers_.has(observer));this.routeObservers_.add(observer)}removeObserver(observer){assert$1(this.routeObservers_.delete(observer))}getRoute(route){return this.routesMap_[route]}setCurrentRoute(route,queryParameters,isPopstate){this.recordMetrics_(route.path);const prevRoute=this.currentRoute_;this.currentRoute_=route;this.currentQueryParameters_=queryParameters;this.lastRouteChangeWasPopstate_=isPopstate;this.routeObservers_.forEach((observer=>{observer.currentRouteChanged(this.currentRoute_,prevRoute)}));this.updateTitle_()}updateTitle_(){if(this.currentRoute_.title){document.title=loadTimeData.getStringF("settingsAltPageTitle",this.currentRoute_.title)}else if(this.currentRoute_.isNavigableDialog&&this.currentRoute_.parent?.title){document.title=loadTimeData.getStringF("settingsAltPageTitle",this.currentRoute_.parent.title)}else if(!this.currentRoute_.isSubpage()&&!this.routes_.ABOUT.contains(this.currentRoute_)){document.title=loadTimeData.getString("settings")}}getQueryParameters(){return new URLSearchParams(this.currentQueryParameters_)}lastRouteChangeWasPopstate(){return this.lastRouteChangeWasPopstate_}getRouteForPath(path){const canonicalPath=path.replace(CANONICAL_PATH_REGEX,"$1$2");const matchingRoute=Object.values(this.routesMap_).find((route=>route.path===canonicalPath));return matchingRoute||null}updateUrlParams(params){let url=this.currentRoute_.path;const queryString=params.toString();if(queryString){url+="?"+queryString}window.history.replaceState(window.history.state,"",url);this.currentQueryParameters_=params;this.routeObservers_.forEach((observer=>{observer.currentRouteChanged(this.currentRoute_,this.currentRoute_)}))}navigateTo(route,dynamicParameters,removeSearch){if(route===this.routes_.ADVANCED){route=this.routes_.BASIC}const params=dynamicParameters||new URLSearchParams;const oldSearchParam=this.getQueryParameters().get("search")||"";const newSearchParam=params.get("search")||"";if(!removeSearch&&oldSearchParam&&!newSearchParam){params.append("search",oldSearchParam)}let url=route.path;const queryString=params.toString();if(queryString){url+="?"+queryString}window.history.pushState(this.currentRoute_.path,"",url);this.setCurrentRoute(route,params,false)}navigateToPreviousRoute(){let previousRoute=null;if(window.history.state){previousRoute=castExists(this.getRouteForPath(window.history.state))}if(previousRoute&&previousRoute.depth<=this.currentRoute_.depth){window.history.back()}else{this.navigateTo(this.currentRoute_.parent||this.routes_.BASIC)}}initializeRouteFromUrl(){assert$1(!this.initializeRouteFromUrlCalled_,"initializeRouteFromUrl() can only be called once.");this.initializeRouteFromUrlCalled_=true;const route=this.getRouteForPath(window.location.pathname);this.recordMetrics_(route?route.path:this.routes_.BASIC.path);if(route&&route!==this.routes_.ADVANCED){this.currentRoute_=route;this.currentQueryParameters_=new URLSearchParams(window.location.search)}else{window.history.replaceState(undefined,"",this.routes_.BASIC.path)}this.updateTitle_()}resetRouteForTesting(){this.initializeRouteFromUrlCalled_=false;this.lastRouteChangeWasPopstate_=false;this.currentRoute_=this.routes_.BASIC;this.currentQueryParameters_=new URLSearchParams}recordMetrics_(urlPath){assert$1(!urlPath.startsWith("chrome://"));assert$1(!urlPath.startsWith("os-settings"));assert$1(urlPath.startsWith("/"));assert$1(!urlPath.match(/\?/g));const METRIC_NAME="ChromeOS.Settings.PathVisited";chrome.metricsPrivate.recordSparseValueWithPersistentHash(METRIC_NAME,urlPath)}}function buildRouter(){return new Router(routes)}Router.setInstance(buildRouter());window.addEventListener("popstate",(()=>{const router=Router.getInstance();router.setCurrentRoute(router.getRouteForPath(window.location.pathname)||router.routes.BASIC,new URLSearchParams(window.location.search),true)}));
// Copyright 2022 The Chromium Authors
const RouteObserverMixin=dedupingMixin((superClass=>{class RouteObserverMixin extends superClass{constructor(...args){super(...args);this.routerInstance_=Router.getInstance()}connectedCallback(){super.connectedCallback();this.routerInstance_.addObserver(this);this.currentRouteChanged(this.routerInstance_.currentRoute,undefined)}disconnectedCallback(){super.disconnectedCallback();this.routerInstance_.removeObserver(this)}currentRouteChanged(_newRoute,_oldRoute){assertNotReached$1("Element must implement currentRouteChanged().")}}return RouteObserverMixin}));
// Copyright 2020 The Chromium Authors
const SETTING_ID_URL_PARAM_NAME="settingId";function getSettingIdParameter(){return Router.getInstance().getQueryParameters().get(SETTING_ID_URL_PARAM_NAME)}function getTemplate$_(){return html`<!--_html_template_start_--><iron-pages id="animatedPages" attr-for-selected="route-path"
    on-iron-select="onIronSelect_">
  <slot></slot>
</iron-pages>
<!--_html_template_end_-->`}
// Copyright 2015 The Chromium Authors
const OsSettingsAnimatedPagesElementBase=RouteObserverMixin(PolymerElement);class OsSettingsAnimatedPagesElement extends OsSettingsAnimatedPagesElementBase{static get is(){return"os-settings-animated-pages"}static get template(){return getTemplate$_()}static get properties(){return{section:String,focusConfig:Object}}constructor(){super();this.focusConfig=null;this.lightDomReady_=false;this.queuedRouteChange_=null;this.lightDomObserver_=new FlattenedNodesObserver(this,this.lightDomChanged_.bind(this));this.previousRoute_=null}onIronSelect_(e){if(e.target!==this.$.animatedPages){return}if(getSettingIdParameter()){return}if(this.previousRoute_&&!Router.getInstance().lastRouteChangeWasPopstate()){const subpage=this.querySelector("os-settings-subpage.iron-selected");if(subpage){subpage.focusBackButton();return}}if(!Router.getInstance().lastRouteChangeWasPopstate()){return}if(!this.focusConfig||!this.previousRoute_){return}assert$1(this.focusConfig instanceof Map);const currentRoute=Router.getInstance().currentRoute;const fromToKey=`${this.previousRoute_.path}_${currentRoute.path}`;let pathConfig=this.focusConfig.get(fromToKey)||this.focusConfig.get(this.previousRoute_.path);if(pathConfig){let handler;if(typeof pathConfig==="function"){handler=pathConfig}else{handler=()=>{if(typeof pathConfig==="string"){const element=this.querySelector(pathConfig);assert$1(element);pathConfig=element}focusWithoutInk$1(pathConfig)}}handler()}}lightDomChanged_(){if(this.lightDomReady_){return}this.lightDomReady_=true;this.lightDomObserver_.disconnect();this.lightDomObserver_=null;this.runQueuedRouteChange_()}runQueuedRouteChange_(){if(!this.queuedRouteChange_){return}microTask.run((()=>{this.currentRouteChanged(this.queuedRouteChange_.newRoute,this.queuedRouteChange_.oldRoute)}))}currentRouteChanged(newRoute,oldRoute){this.previousRoute_=oldRoute||null;if(newRoute.section===this.section&&newRoute.isSubpage()){this.switchToSubpage_(newRoute,oldRoute)}else{this.$.animatedPages.selected="default"}}switchToSubpage_(newRoute,oldRoute){if(!this.lightDomReady_){this.queuedRouteChange_=this.queuedRouteChange_||{oldRoute:oldRoute,newRoute:newRoute};this.queuedRouteChange_.newRoute=newRoute;return}this.ensureSubpageInstance_();this.$.animatedPages.selected=newRoute.path}ensureSubpageInstance_(){const routePath=Router.getInstance().currentRoute.path;const domIf=this.querySelector(`dom-if[route-path='${routePath}']`);if(!domIf||domIf.if){return}const content=DomIf._contentForTemplate(domIf.firstElementChild);const subpage=content.querySelector("os-settings-subpage");subpage.setAttribute("route-path",routePath);if(domIf.hasAttribute("no-search")||domIf["noSearch"]){subpage.setAttribute("no-search","")}domIf.if=true;domIf.render()}}customElements.define(OsSettingsAnimatedPagesElement.is,OsSettingsAnimatedPagesElement);const styleMod$c=document.createElement("dom-module");styleMod$c.appendChild(html`
  <template>
    <style>
:host{--cr-input-background-color:var(--google-grey-100);--cr-input-color:var(--cr-primary-text-color);--cr-input-error-color:var(--google-red-600);--cr-input-focus-color:var(--google-blue-600);display:block;outline:0}@media (prefers-color-scheme:dark){:host{--cr-input-background-color:rgba(0, 0, 0, .3);--cr-input-error-color:var(--google-red-300);--cr-input-focus-color:var(--google-blue-300)}}:host([focused_]:not([readonly]):not([invalid])) #label{color:var(--cr-input-focus-color)}#input-container{border-radius:var(--cr-input-border-radius,4px);overflow:hidden;position:relative;width:var(--cr-input-width,100%)}#inner-input-container{background-color:var(--cr-input-background-color);box-sizing:border-box;padding:0}#input{-webkit-appearance:none;background-color:transparent;border:none;box-sizing:border-box;caret-color:var(--cr-input-focus-color);color:var(--cr-input-color);font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;min-height:var(--cr-input-min-height,auto);outline:0;padding-bottom:var(--cr-input-padding-bottom,6px);padding-inline-end:var(--cr-input-padding-end,8px);padding-inline-start:var(--cr-input-padding-start,8px);padding-top:var(--cr-input-padding-top,6px);text-align:inherit;text-overflow:ellipsis;width:100%}#underline{border-bottom:2px solid var(--cr-input-focus-color);border-radius:var(--cr-input-underline-border-radius,0);bottom:0;box-sizing:border-box;display:var(--cr-input-underline-display);height:var(--cr-input-underline-height,0);left:0;margin:auto;opacity:0;position:absolute;right:0;transition:opacity 120ms ease-out,width 0s linear 180ms;width:0}:host([focused_]) #underline,:host([force-underline]) #underline,:host([invalid]) #underline{opacity:1;transition:opacity 120ms ease-in,width 180ms ease-out;width:100%}
    </style>
  </template>
`.content);styleMod$c.register("cr-input-style");function getTemplate$Z(){return html`<!--_html_template_start_-->    <style include="cr-hidden-style cr-input-style cr-shared-style">:host([disabled]) :-webkit-any(#label,#error,#input-container){opacity:var(--cr-disabled-opacity);pointer-events:none}:host ::slotted(cr-button[slot=suffix]){margin-inline-start:var(--cr-button-edge-spacing)!important}:host([invalid]) #label{color:var(--cr-input-error-color)}#input{border-bottom:var(--cr-input-border-bottom,none);letter-spacing:var(--cr-input-letter-spacing)}:host-context([chrome-refresh-2023]) #input-container{border:var(--cr-input-border,none)}#input::placeholder{color:var(--cr-input-placeholder-color,var(--cr-secondary-text-color));letter-spacing:var(--cr-input-placeholder-letter-spacing)}:host([invalid]) #input{caret-color:var(--cr-input-error-color)}:host([readonly]) #input{opacity:var(--cr-input-readonly-opacity,.6)}:host([invalid]) #underline{border-color:var(--cr-input-error-color)}#error{color:var(--cr-input-error-color);display:var(--cr-input-error-display,block);font-size:var(--cr-form-field-label-font-size);height:var(--cr-form-field-label-height);line-height:var(--cr-form-field-label-line-height);margin:8px 0;visibility:hidden;white-space:var(--cr-input-error-white-space)}:host([invalid]) #error{visibility:visible}#inner-input-container,#row-container{align-items:center;display:flex;justify-content:space-between;position:relative}#input[type=search]::-webkit-search-cancel-button{display:none}:host-context([dir=rtl]) #input[type=url]{text-align:right}#input[type=url]{direction:ltr}</style>
    <div id="label" class="cr-form-field-label" hidden="[[!label]]" aria-hidden="true">
      [[label]]
    </div>
    <div id="row-container" part="row-container">
      <div id="input-container">
        <div id="inner-input-container">
          <slot name="inline-prefix"></slot>
          
          <input id="input" disabled="[[disabled]]" autofocus="[[autofocus]]" value="{{value::input}}" tabindex$="[[inputTabindex]]" type="[[type]]" readonly$="[[readonly]]" maxlength$="[[maxlength]]" pattern$="[[pattern]]" required="[[required]]" minlength$="[[minlength]]" inputmode$="[[inputmode]]" aria-description$="[[ariaDescription]]" aria-label$="[[getAriaLabel_(ariaLabel, label, placeholder)]]" aria-invalid$="[[getAriaInvalid_(invalid)]]" max="[[max]]" min="[[min]]" on-focus="onInputFocus_" on-blur="onInputBlur_" on-change="onInputChange_" part="input" autocomplete="off">
          <slot name="inline-suffix"></slot>
        </div>
        <div id="underline"></div>
      </div>
      <slot name="suffix"></slot>
    </div>
    <div id="error" aria-live="assertive">[[displayErrorMessage_]]</div>
<!--_html_template_end_-->`}
// Copyright 2018 The Chromium Authors
const SUPPORTED_INPUT_TYPES=new Set(["number","password","search","text","url"]);class CrInputElement extends PolymerElement{static get is(){return"cr-input"}static get template(){return getTemplate$Z()}static get properties(){return{ariaDescription:{type:String},ariaLabel:{type:String,value:""},autofocus:{type:Boolean,value:false,reflectToAttribute:true},autoValidate:Boolean,disabled:{type:Boolean,value:false,reflectToAttribute:true},errorMessage:{type:String,value:"",observer:"onInvalidOrErrorMessageChanged_"},displayErrorMessage_:{type:String,value:""},focused_:{type:Boolean,value:false,reflectToAttribute:true},invalid:{type:Boolean,value:false,notify:true,reflectToAttribute:true,observer:"onInvalidOrErrorMessageChanged_"},max:{type:Number,reflectToAttribute:true},min:{type:Number,reflectToAttribute:true},maxlength:{type:Number,reflectToAttribute:true},minlength:{type:Number,reflectToAttribute:true},pattern:{type:String,reflectToAttribute:true},inputmode:String,label:{type:String,value:""},placeholder:{type:String,value:null,observer:"placeholderChanged_"},readonly:{type:Boolean,reflectToAttribute:true},required:{type:Boolean,reflectToAttribute:true},inputTabindex:{type:Number,value:0,observer:"onInputTabindexChanged_"},type:{type:String,value:"text",observer:"onTypeChanged_"},value:{type:String,value:"",notify:true,observer:"onValueChanged_"}}}ready(){super.ready();assert$1(!this.hasAttribute("tabindex"))}onInputTabindexChanged_(){assert$1(this.inputTabindex===0||this.inputTabindex===-1)}onTypeChanged_(){assert$1(SUPPORTED_INPUT_TYPES.has(this.type))}get inputElement(){return this.$.input}getAriaLabel_(ariaLabel,label,placeholder){return ariaLabel||label||placeholder}getAriaInvalid_(invalid){return invalid?"true":"false"}onInvalidOrErrorMessageChanged_(){this.displayErrorMessage_=this.invalid?this.errorMessage:"";const ERROR_ID="error";const errorElement=this.shadowRoot.querySelector(`#${ERROR_ID}`);assert$1(errorElement);if(this.invalid){errorElement.setAttribute("role","alert");this.inputElement.setAttribute("aria-errormessage",ERROR_ID)}else{errorElement.removeAttribute("role");this.inputElement.removeAttribute("aria-errormessage")}}placeholderChanged_(){if(this.placeholder||this.placeholder===""){this.inputElement.setAttribute("placeholder",this.placeholder)}else{this.inputElement.removeAttribute("placeholder")}}focus(){this.focusInput()}focusInput(){if(this.shadowRoot.activeElement===this.inputElement){return false}this.inputElement.focus();return true}onValueChanged_(newValue,oldValue){if(!newValue&&!oldValue){return}if(this.autoValidate){this.validate()}}onInputChange_(e){this.dispatchEvent(new CustomEvent("change",{bubbles:true,composed:true,detail:{sourceEvent:e}}))}onInputFocus_(){this.focused_=true}onInputBlur_(){this.focused_=false}select(start,end){this.inputElement.focus();if(start!==undefined&&end!==undefined){this.inputElement.setSelectionRange(start,end)}else{assert$1(start===undefined&&end===undefined);this.inputElement.select()}}validate(){this.invalid=!this.inputElement.checkValidity();return!this.invalid}}customElements.define(CrInputElement.is,CrInputElement);function getTemplate$Y(){return html`<!--_html_template_start_-->    <style include="cr-shared-style cr-input-style">:host{display:flex;user-select:none;--cr-search-field-clear-icon-fill:var(--google-grey-700);--cr-search-field-clear-icon-margin-end:-4px;--cr-search-field-input-border-bottom:1px solid var(--cr-secondary-text-color)}#searchIcon{align-self:center;display:var(--cr-search-field-search-icon-display,inherit);height:16px;padding:4px;vertical-align:middle;width:16px}#searchIconInline{--iron-icon-fill-color:var(--cr-search-field-search-icon-fill, inherit);display:var(--cr-search-field-search-icon-inline-display,none);margin-inline-start:var(--cr-search-field-search-icon-inline-margin-start,0)}#searchInput{--cr-input-background-color:transparent;--cr-input-border-bottom:var(--cr-search-field-input-border-bottom);--cr-input-border-radius:0;--cr-input-error-display:none;--cr-input-min-height:var(--cr-search-field-input-min-height, 24px);--cr-input-padding-end:0;--cr-input-padding-start:var(--cr-search-field-input-padding-start, 0);--cr-input-padding-bottom:var(--cr-search-field-input-padding-bottom, 2px);--cr-input-padding-top:var(--cr-search-field-input-padding-top, 2px);--cr-input-placeholder-color:var(--cr-search-field-placeholder-color);--cr-input-underline-display:var(--cr-search-field-underline-display);--cr-input-underline-border-radius:var(--cr-search-field-input-underline-border-radius, 0);--cr-input-underline-height:var(--cr-search-field-input-underline-height, 0);align-self:stretch;color:var(--cr-primary-text-color);display:block;font-size:92.3076923%;width:var(--cr-search-field-input-width,160px)}:host([has-search-text]) #searchInput{--cr-input-padding-end:calc(24px +
          var(--cr-search-field-clear-icon-margin-end))}#clearSearch{--cr-icon-button-fill-color:var(--cr-search-field-clear-icon-fill);--cr-icon-button-icon-size:var(--cr-search-field-clear-icon-size, 16px);--cr-icon-button-size:24px;margin-inline-end:var(--cr-search-field-clear-icon-margin-end);margin-inline-start:4px;position:absolute;right:0}:host-context([dir=rtl]) #clearSearch{left:0;right:auto}</style>
    <iron-icon id="searchIcon" icon="cr:search" part="searchIcon"></iron-icon>
    <cr-input id="searchInput" part="searchInput" on-search="onSearchTermSearch" on-input="onSearchTermInput" aria-label$="[[label]]" type="search" autofocus="[[autofocus]]" placeholder="[[label]]" spellcheck="false">
      <iron-icon id="searchIconInline" slot="inline-prefix" icon="cr:search"></iron-icon>
      <cr-icon-button id="clearSearch" class="icon-cancel" hidden$="[[!hasSearchText]]" slot="suffix" on-click="onTapClear_" title="[[clearLabel]]">
      </cr-icon-button>
    </cr-input>
<!--_html_template_end_-->`}
// Copyright 2016 The Chromium Authors
const CrSearchFieldMixin=dedupingMixin((superClass=>{class CrSearchFieldMixin extends superClass{constructor(){super(...arguments);this.effectiveValue_="";this.searchDelayTimer_=-1}static get properties(){return{label:{type:String,value:""},clearLabel:{type:String,value:""},hasSearchText:{type:Boolean,reflectToAttribute:true,value:false}}}getSearchInput(){assertNotReached$1()}getValue(){return this.getSearchInput().value}fire_(eventName,detail){this.dispatchEvent(new CustomEvent(eventName,{bubbles:true,composed:true,detail:detail}))}setValue(value,noEvent){const updated=this.updateEffectiveValue_(value);this.getSearchInput().value=this.effectiveValue_;if(!updated){if(value===""&&this.hasSearchText){this.hasSearchText=false}return}this.onSearchTermInput();if(!noEvent){this.fire_("search-changed",this.effectiveValue_)}}scheduleSearch_(){if(this.searchDelayTimer_>=0){clearTimeout(this.searchDelayTimer_)}const length=this.getValue().length;const timeoutMs=length>0?500-100*(Math.min(length,4)-1):0;this.searchDelayTimer_=setTimeout((()=>{this.getSearchInput().dispatchEvent(new CustomEvent("search",{composed:true,detail:this.getValue()}));this.searchDelayTimer_=-1}),timeoutMs)}onSearchTermSearch(){this.onValueChanged_(this.getValue(),false)}onSearchTermInput(){this.hasSearchText=this.getSearchInput().value!=="";this.scheduleSearch_()}onValueChanged_(newValue,noEvent){const updated=this.updateEffectiveValue_(newValue);if(updated&&!noEvent){this.fire_("search-changed",this.effectiveValue_)}}updateEffectiveValue_(value){const effectiveValue=value.replace(/\s+/g," ").replace(/^\s/,"");if(effectiveValue===this.effectiveValue_){return false}this.effectiveValue_=effectiveValue;return true}}return CrSearchFieldMixin}));
// Copyright 2016 The Chromium Authors
const CrSearchFieldElementBase=CrSearchFieldMixin(PolymerElement);class CrSearchFieldElement extends CrSearchFieldElementBase{static get is(){return"cr-search-field"}static get template(){return getTemplate$Y()}static get properties(){return{autofocus:{type:Boolean,value:false}}}getSearchInput(){return this.$.searchInput}onTapClear_(){this.setValue("");setTimeout((()=>{this.$.searchInput.focus()}))}}customElements.define(CrSearchFieldElement.is,CrSearchFieldElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const template$7=html`<dom-module id="paper-spinner-styles">
  <template>
    <style>
      /*
      /**************************/
      /* STYLES FOR THE SPINNER */
      /**************************/

      /*
       * Constants:
       *      ARCSIZE     = 270 degrees (amount of circle the arc takes up)
       *      ARCTIME     = 1333ms (time it takes to expand and contract arc)
       *      ARCSTARTROT = 216 degrees (how much the start location of the arc
       *                                should rotate each time, 216 gives us a
       *                                5 pointed star shape (it's 360/5 * 3).
       *                                For a 7 pointed star, we might do
       *                                360/7 * 3 = 154.286)
       *      SHRINK_TIME = 400ms
       */

      :host {
        display: inline-block;
        position: relative;
        width: 28px;
        height: 28px;

        /* 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */
        --paper-spinner-container-rotation-duration: 1568ms;

        /* ARCTIME */
        --paper-spinner-expand-contract-duration: 1333ms;

        /* 4 * ARCTIME */
        --paper-spinner-full-cycle-duration: 5332ms;

        /* SHRINK_TIME */
        --paper-spinner-cooldown-duration: 400ms;
      }

      #spinnerContainer {
        width: 100%;
        height: 100%;

        /* The spinner does not have any contents that would have to be
         * flipped if the direction changes. Always use ltr so that the
         * style works out correctly in both cases. */
        direction: ltr;
      }

      #spinnerContainer.active {
        animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;
      }

      @-webkit-keyframes container-rotate {
        to { -webkit-transform: rotate(360deg) }
      }

      @keyframes container-rotate {
        to { transform: rotate(360deg) }
      }

      .spinner-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        white-space: nowrap;
        color: var(--paper-spinner-color, var(--google-blue-500));
      }

      .layer-1 {
        color: var(--paper-spinner-layer-1-color, var(--google-blue-500));
      }

      .layer-2 {
        color: var(--paper-spinner-layer-2-color, var(--google-red-500));
      }

      .layer-3 {
        color: var(--paper-spinner-layer-3-color, var(--google-yellow-500));
      }

      .layer-4 {
        color: var(--paper-spinner-layer-4-color, var(--google-green-500));
      }

      /**
       * IMPORTANT NOTE ABOUT CSS ANIMATION PROPERTIES (keanulee):
       *
       * iOS Safari (tested on iOS 8.1) does not handle animation-delay very well - it doesn't
       * guarantee that the animation will start _exactly_ after that value. So we avoid using
       * animation-delay and instead set custom keyframes for each color (as layer-2undant as it
       * seems).
       */
      .active .spinner-layer {
        animation-name: fill-unfill-rotate;
        animation-duration: var(--paper-spinner-full-cycle-duration);
        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        animation-iteration-count: infinite;
        opacity: 1;
      }

      .active .spinner-layer.layer-1 {
        animation-name: fill-unfill-rotate, layer-1-fade-in-out;
      }

      .active .spinner-layer.layer-2 {
        animation-name: fill-unfill-rotate, layer-2-fade-in-out;
      }

      .active .spinner-layer.layer-3 {
        animation-name: fill-unfill-rotate, layer-3-fade-in-out;
      }

      .active .spinner-layer.layer-4 {
        animation-name: fill-unfill-rotate, layer-4-fade-in-out;
      }

      @-webkit-keyframes fill-unfill-rotate {
        12.5% { -webkit-transform: rotate(135deg) } /* 0.5 * ARCSIZE */
        25%   { -webkit-transform: rotate(270deg) } /* 1   * ARCSIZE */
        37.5% { -webkit-transform: rotate(405deg) } /* 1.5 * ARCSIZE */
        50%   { -webkit-transform: rotate(540deg) } /* 2   * ARCSIZE */
        62.5% { -webkit-transform: rotate(675deg) } /* 2.5 * ARCSIZE */
        75%   { -webkit-transform: rotate(810deg) } /* 3   * ARCSIZE */
        87.5% { -webkit-transform: rotate(945deg) } /* 3.5 * ARCSIZE */
        to    { -webkit-transform: rotate(1080deg) } /* 4   * ARCSIZE */
      }

      @keyframes fill-unfill-rotate {
        12.5% { transform: rotate(135deg) } /* 0.5 * ARCSIZE */
        25%   { transform: rotate(270deg) } /* 1   * ARCSIZE */
        37.5% { transform: rotate(405deg) } /* 1.5 * ARCSIZE */
        50%   { transform: rotate(540deg) } /* 2   * ARCSIZE */
        62.5% { transform: rotate(675deg) } /* 2.5 * ARCSIZE */
        75%   { transform: rotate(810deg) } /* 3   * ARCSIZE */
        87.5% { transform: rotate(945deg) } /* 3.5 * ARCSIZE */
        to    { transform: rotate(1080deg) } /* 4   * ARCSIZE */
      }

      @-webkit-keyframes layer-1-fade-in-out {
        0% { opacity: 1 }
        25% { opacity: 1 }
        26% { opacity: 0 }
        89% { opacity: 0 }
        90% { opacity: 1 }
        to { opacity: 1 }
      }

      @keyframes layer-1-fade-in-out {
        0% { opacity: 1 }
        25% { opacity: 1 }
        26% { opacity: 0 }
        89% { opacity: 0 }
        90% { opacity: 1 }
        to { opacity: 1 }
      }

      @-webkit-keyframes layer-2-fade-in-out {
        0% { opacity: 0 }
        15% { opacity: 0 }
        25% { opacity: 1 }
        50% { opacity: 1 }
        51% { opacity: 0 }
        to { opacity: 0 }
      }

      @keyframes layer-2-fade-in-out {
        0% { opacity: 0 }
        15% { opacity: 0 }
        25% { opacity: 1 }
        50% { opacity: 1 }
        51% { opacity: 0 }
        to { opacity: 0 }
      }

      @-webkit-keyframes layer-3-fade-in-out {
        0% { opacity: 0 }
        40% { opacity: 0 }
        50% { opacity: 1 }
        75% { opacity: 1 }
        76% { opacity: 0 }
        to { opacity: 0 }
      }

      @keyframes layer-3-fade-in-out {
        0% { opacity: 0 }
        40% { opacity: 0 }
        50% { opacity: 1 }
        75% { opacity: 1 }
        76% { opacity: 0 }
        to { opacity: 0 }
      }

      @-webkit-keyframes layer-4-fade-in-out {
        0% { opacity: 0 }
        65% { opacity: 0 }
        75% { opacity: 1 }
        90% { opacity: 1 }
        to { opacity: 0 }
      }

      @keyframes layer-4-fade-in-out {
        0% { opacity: 0 }
        65% { opacity: 0 }
        75% { opacity: 1 }
        90% { opacity: 1 }
        to { opacity: 0 }
      }

      .circle-clipper {
        display: inline-block;
        position: relative;
        width: 50%;
        height: 100%;
        overflow: hidden;
      }

      /**
       * Patch the gap that appear between the two adjacent div.circle-clipper while the
       * spinner is rotating (appears on Chrome 50, Safari 9.1.1, and Edge).
       */
      .spinner-layer::after {
        content: '';
        left: 45%;
        width: 10%;
        border-top-style: solid;
      }

      .spinner-layer::after,
      .circle-clipper .circle {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        border-width: var(--paper-spinner-stroke-width, 3px);
        border-radius: 50%;
      }

      .circle-clipper .circle {
        bottom: 0;
        width: 200%;
        border-style: solid;
        border-bottom-color: transparent !important;
      }

      .circle-clipper.left .circle {
        left: 0;
        border-right-color: transparent !important;
        transform: rotate(129deg);
      }

      .circle-clipper.right .circle {
        left: -100%;
        border-left-color: transparent !important;
        transform: rotate(-129deg);
      }

      .active .gap-patch::after,
      .active .circle-clipper .circle {
        animation-duration: var(--paper-spinner-expand-contract-duration);
        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        animation-iteration-count: infinite;
      }

      .active .circle-clipper.left .circle {
        animation-name: left-spin;
      }

      .active .circle-clipper.right .circle {
        animation-name: right-spin;
      }

      @-webkit-keyframes left-spin {
        0% { -webkit-transform: rotate(130deg) }
        50% { -webkit-transform: rotate(-5deg) }
        to { -webkit-transform: rotate(130deg) }
      }

      @keyframes left-spin {
        0% { transform: rotate(130deg) }
        50% { transform: rotate(-5deg) }
        to { transform: rotate(130deg) }
      }

      @-webkit-keyframes right-spin {
        0% { -webkit-transform: rotate(-130deg) }
        50% { -webkit-transform: rotate(5deg) }
        to { -webkit-transform: rotate(-130deg) }
      }

      @keyframes right-spin {
        0% { transform: rotate(-130deg) }
        50% { transform: rotate(5deg) }
        to { transform: rotate(-130deg) }
      }

      #spinnerContainer.cooldown {
        animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);
      }

      @-webkit-keyframes fade-out {
        0% { opacity: 1 }
        to { opacity: 0 }
      }

      @keyframes fade-out {
        0% { opacity: 1 }
        to { opacity: 0 }
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(template$7.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const PaperSpinnerBehavior={properties:{active:{type:Boolean,value:false,reflectToAttribute:true,observer:"__activeChanged"},alt:{type:String,value:"loading",observer:"__altChanged"},__coolingDown:{type:Boolean,value:false}},__computeContainerClasses:function(active,coolingDown){return[active||coolingDown?"active":"",coolingDown?"cooldown":""].join(" ")},__activeChanged:function(active,old){this.__setAriaHidden(!active);this.__coolingDown=!active&&old},__altChanged:function(alt){if(alt==="loading"){this.alt=this.getAttribute("aria-label")||alt}else{this.__setAriaHidden(alt==="");this.setAttribute("aria-label",alt)}},__setAriaHidden:function(hidden){var attr="aria-hidden";if(hidden){this.setAttribute(attr,"true")}else{this.removeAttribute(attr)}},__reset:function(){this.active=false;this.__coolingDown=false}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const template$6=html`
  <style include="paper-spinner-styles"></style>

  <div id="spinnerContainer" class-name="[[__computeContainerClasses(active, __coolingDown)]]" on-animationend="__reset" on-webkit-animation-end="__reset">
    <div class="spinner-layer">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
`;template$6.setAttribute("strip-whitespace","");Polymer({_template:template$6,is:"paper-spinner-lite",behaviors:[PaperSpinnerBehavior]});const styleMod$b=document.createElement("dom-module");styleMod$b.appendChild(html`
  <template>
    <style>
.search-bubble{--search-bubble-color:var(--paper-yellow-500);position:absolute;z-index:1}.search-bubble-innards{align-items:center;background-color:var(--search-bubble-color);border-radius:2px;color:var(--google-grey-900);max-width:100px;min-width:64px;overflow:hidden;padding:4px 10px;text-align:center;text-overflow:ellipsis;white-space:nowrap}.search-bubble-innards::after{background-color:var(--search-bubble-color);content:'';height:10px;left:calc(50% - 5px);position:absolute;top:-5px;transform:rotate(-45deg);width:10px;z-index:-1}.search-bubble-innards.above::after{bottom:-5px;top:auto;transform:rotate(-135deg)}
    </style>
  </template>
`.content);styleMod$b.register("search-highlight-style");const template$5=html`
<custom-style>
  <style>

/* We keep our vars in sort order, though some vars must be defined prior to
 * others. The --settings-* vars are defined explicitly prior to the --paper-*
 * and --iron-* vars.
 */
html {
  /* Some colors use non-MD colors.  These custom colors are specified by
   * UX design (bettes@). */

  --settings-error-color: var(--google-red-700);

  --iron-icon-fill-color: var(--google-grey-700);
  --iron-icon-height: var(--cr-icon-size);
  --iron-icon-width: var(--cr-icon-size);

  --cr-radio-group-item-padding: 0;
}

@media (prefers-color-scheme: dark) {
  html {
    --iron-icon-fill-color: var(--google-grey-500);
    --settings-error-color: var(--google-red-300);
  }
}
  </style>
</custom-style>
`;document.head.appendChild(template$5.content);const styleMod$a=document.createElement("dom-module");styleMod$a.appendChild(html`
  <template>
    <style>
:host-context([cros]) a:not(.item)[href]{color:var(--cros-link-color)}:host-context([cros]) cr-button[has-prefix-icon_],:host-context([cros]) cr-button[has-suffix-icon_]{--iron-icon-fill-color:currentColor}:host-context([cros]) cr-dialog::part(dialog){--cr-dialog-background-color:var(--cros-bg-color-elevation-3);background-image:none;box-shadow:var(--cros-elevation-3-shadow)}:host-context([cros]) cr-radio-button{--cr-radio-button-checked-color:var(--cros-radio-button-color);--cr-radio-button-checked-ripple-color:var(--cros-radio-button-ripple-color);--cr-radio-button-unchecked-color:var(--cros-radio-button-color-unchecked);--cr-radio-button-unchecked-ripple-color:var(--cros-radio-button-ripple-color-unchecked)}:host-context([cros]) cr-toast{--cr-toast-background-color:var(--cros-toast-background-color);--cr-toast-background:var(--cros-toast-background-color);--cr-toast-text-color:var(--cros-toast-text-color);--iron-icon-fill-color:var(--cros-toast-icon-color)}:host-context([cros]) cr-toast .error-message{color:var(--cros-toast-text-color)}:host-context([cros]) cr-toggle{--cr-toggle-checked-bar-color:var(--cros-switch-track-color-active);--cr-toggle-checked-bar-opacity:100%;--cr-toggle-checked-button-color:var(--cros-switch-knob-color-active);--cr-toggle-checked-ripple-color:var(--cros-focus-aura-color);--cr-toggle-unchecked-bar-color:var(--cros-switch-track-color-inactive);--cr-toggle-unchecked-button-color:var(--cros-switch-knob-color-inactive);--cr-toggle-unchecked-ripple-color:var(--cros-ripple-color);--cr-toggle-box-shadow:var(--cros-elevation-1-shadow);--cr-toggle-ripple-diameter:32px}:host-context([cros]) cr-toggle:focus{--cr-toggle-ripple-ring:2px solid var(--cros-focus-ring-color)}:host-context([cros]) .primary-toggle{color:var(--cros-text-color-secondary)}:host-context([cros]) .primary-toggle[checked]{color:var(--cros-text-color-prominent)}:host-context([cros]) paper-spinner-lite{--paper-spinner-color:var(--cros-icon-color-prominent)}:host-context([cros]) cr-tooltip-icon{--cr-link-color:var(--cros-tooltip-link-color)}:host-context(body.jelly-enabled){--cros-button-label-color-primary:var(--cros-sys-on_primary);--cros-link-color:var(--cros-sys-primary);--cros-separator-color:var(--cros-sys-separator);--cros-tab-slider-track-color:var(--cros-sys-surface_variant, 80%);--cr-form-field-label-color:var(--cros-sys-on_surface);--cr-link-color:var(--cros-sys-primary);--cr-primary-text-color:var(--cros-sys-on_surface);--cr-secondary-text-color:var(--cros-sys-secondary)}:host-context(body.jelly-enabled) cr-button{--text-color:var(--cros-sys-on_primary_container);--ink-color:var(--cros-sys-ripple_primary);--iron-icon-fill-color:currentColor;--hover-bg-color:var(--cros-sys-hover_on_subtle);--ripple-opacity:.1;--bg-action:var(--cros-sys-primary);--ink-color-action:var(--cros-sys-ripple_primary);--text-color-action:var(--cros-sys-on_primary);--hover-bg-action:var(--cros-sys-hover_on_prominent);--ripple-opacity-action:1;--disabled-bg:var(--cros-sys-disabled_container);--disabled-bg-action:var(--cros-sys-disabled_container);--disabled-text-color:var(--cros-sys-disabled);background-color:var(--cros-sys-primary_container);border:none}:host-context(body.jelly-enabled) cr-button:hover::part(hoverBackground){background-color:var(--hover-bg-color);display:block}:host-context(body.jelly-enabled) cr-button.action-button{background-color:var(--bg-action)}:host-context(body.jelly-enabled) cr-button.action-button:hover::part(hoverBackground){background-color:var(--hover-bg-action)}:host-context(body.jelly-enabled) cr-button[disabled]{background-color:var(--cros-sys-disabled_container)}:host-context(body.jelly-enabled):host-context(.focus-outline-visible) cr-button:focus{box-shadow:none;outline:2px solid var(--cros-sys-focus_ring)}:host-context(body.jelly-enabled) cr-checkbox{--cr-checkbox-checked-box-color:var(--cros-sys-primary);--cr-checkbox-ripple-checked-color:var(--cros-sys-ripple_primary);--cr-checkbox-checked-ripple-opacity:1;--cr-checkbox-mark-color:var(--cros-sys-inverse_on_surface);--cr-checkbox-ripple-unchecked-color:var(--cros-sys-ripple_primary);--cr-checkbox-unchecked-box-color:var(--cros-sys-on_surface);--cr-checkbox-unchecked-ripple-opacity:1}:host-context(body.jelly-enabled) cr-dialog::part(dialog){--cr-dialog-background-color:var(--cros-sys-base_elevated);background-image:none;box-shadow:0 0 12px 0 var(--cros-sys-shadow)}:host-context(body.jelly-enabled) cr-expand-button::part(icon),:host-context(body.jelly-enabled) cr-icon-button,:host-context(body.jelly-enabled) cr-link-row::part(icon){--cr-icon-button-fill-color:var(--cros-sys-secondary)}:host-context(body.jelly-enabled) cr-input,:host-context(body.jelly-enabled) cr-search-field::part(searchInput),:host-context(body.jelly-enabled) cr-textarea{--cr-input-background-color:var(--cros-sys-input_field_on_base);--cr-input-error-color:var(--cros-sys-error);--cr-input-focus-color:var(--cros-sys-primary);--cr-input-placeholder-color:var(--cros-sys-secondary)}:host-context(body.jelly-enabled) .md-select{--md-select-bg-color:var(--cros-sys-input_field_on_base);--md-select-focus-shadow-color:var(--cros-sys-primary);--md-select-option-bg-color:var(--cros-sys-base_elevated);--md-select-text-color:var(--cros-sys-on_surface)}:host-context(body.jelly-enabled),:host-context(body.jelly-enabled) cr-radio-button{--cr-radio-button-checked-color:var(--cros-sys-primary);--cr-radio-button-checked-ripple-color:var(--cros-sys-ripple_primary);--cr-radio-button-unchecked-color:var(--cros-sys-on_surface);--cr-radio-button-unchecked-ripple-color:var(--cros-sys-ripple_neutral_on_subtle)}:host-context(body.jelly-enabled) cr-card-radio-button{--cr-card-background-color:var(--cros-sys-app_base);--cr-checked-color:var(--cros-sys-primary);--cr-radio-button-checked-ripple-color:var(--cros-sys-ripple_primary);--hover-bg-color:var(--cros-sys-hover_on_subtle)}:host-context(body.jelly-enabled) cr-search-field{--cr-search-field-clear-icon-fill:var(--cros-sys-primary);--cr-search-field-clear-icon-margin-end:6px;--cr-search-field-input-border-bottom:none;--cr-search-field-input-padding-start:8px;--cr-search-field-input-underline-border-radius:4px;--cr-search-field-search-icon-display:none;--cr-search-field-search-icon-fill:var(--cros-sys-primary);--cr-search-field-search-icon-inline-display:block;--cr-search-field-search-icon-inline-margin-start:6px;border-radius:4px}:host-context(body.jelly-enabled) cr-slider{--cr-slider-active-color:var(--cros-sys-primary);--cr-slider-container-color:var(--cros-sys-primary_container);--cr-slider-container-disabled-color:var(--cros-sys-disabled_container);--cr-slider-disabled-color:var(--cros-sys-disabled);--cr-slider-knob-active-color:var(--cros-sys-primary);--cr-slider-knob-disabled-color:var(--cros-sys-disabled);--cr-slider-marker-active-color:var(--cros-sys-primary_container);--cr-slider-marker-color:var(--cros-sys-primary);--cr-slider-marker-disabled-color:var(--cros-sys-disabled);--cr-slider-ripple-color:var(--cros-sys-hover_on_prominent)}:host-context(body.jelly-enabled) cr-slider:not([disabled])::part(knob){background-color:var(--cros-sys-primary)}:host-context(body.jelly-enabled) cr-slider[disabled]::part(knob){border:none}:host-context(body.jelly-enabled) cr-slider::part(label){background:var(--cros-sys-primary);color:var(--cros-sys-on_primary)}:host-context(body.jelly-enabled) cr-tabs{--cr-tabs-selected-color:var(--cros-sys-primary)}:host-context(body.jelly-enabled) cr-toggle{--cr-toggle-checked-bar-color:var(--cros-sys-primary_container);--cr-toggle-checked-bar-opacity:100%;--cr-toggle-checked-button-color:var(--cros-sys-primary);--cr-toggle-checked-ripple-color:var(--cros-sys-hover_on_prominent);--cr-toggle-unchecked-bar-color:var(--cros-sys-secondary);--cr-toggle-unchecked-button-color:var(--cros-sys-on_secondary);--cr-toggle-unchecked-ripple-color:var(--cros-sys-hover_on_prominent);--cr-toggle-box-shadow:var(--cros-elevation-1-shadow);--cr-toggle-ripple-diameter:32px}:host-context(body.jelly-enabled) cr-toggle:focus{--cr-toggle-ripple-ring:2px solid var(--cros-sys-focus_ring)}
    </style>
  </template>
`.content);styleMod$a.register("cros-color-overrides");const styleMod$9=document.createElement("dom-module");styleMod$9.appendChild(html`
  <template>
    <style include="cr-shared-style search-highlight-style cros-color-overrides">

/* Common styles for Material Design settings. */

/* Prevent action-links from being selected to avoid accidental
 * selection when trying to click it. */
a[is=action-link] {
  user-select: none;
}

/* Use <h2> as the "sub-header" mentioned in the UX design docs. */
h2 {
  align-items: center;
  align-self: flex-start;
  color: var(--cr-secondary-text-color);
  display: flex;
  font-size: inherit;
  font-weight: 500;
  margin: 0;
  padding-bottom: 12px;
  padding-top: 32px;
}

iron-icon {
  flex-shrink: 0;  /* Prevent distortion of icons in cramped UI. */
}

iron-icon.policy {
  margin-inline-end: var(--cr-controlled-by-spacing);
}

iron-list {
  /* Text selection in an iron-list is problematic because the items are
   * reused. The result is the selection happens somewhat arbitrarily.
   * Add a |risk-selection| attribute to enabled selection in an
   * iron-list. */
  user-select: none;
}

iron-list[risk-selection] {
  /* On short lists where selection is likely desired, we'll risk having
   * text selection enabled. If the list is short enough that items are
   * not actually reused, the bugs with selection are not evident. */
  user-select: text;
}

.separator + cr-icon-button {
  margin-inline-start: var(--cr-icon-ripple-margin);
}

/* Special case for buttons inside of toggle-buttons. */
.settings-box settings-toggle-button cr-button:last-of-type {
  margin-inline-end: 16px;
}

/* Space out multiple buttons in the same row. */
.settings-box cr-button + cr-button,
.settings-box cr-button + controlled-button,
.settings-box controlled-button + controlled-button,
.settings-box controlled-button + cr-button {
  margin-inline-start: 8px;
}

a[href] {
  color: var(--cr-link-color);
}

/* For elements that are simple out-links but don't look like anchors. */
.inherit-color {
  color: inherit !important;
}

.primary-toggle {
  color: var(--cr-secondary-text-color);
  font-weight: 500;
}

.primary-toggle[checked] {
  color: var(--google-blue-500);
}

collapse-radio-button,
controlled-radio-button,
cr-radio-button {
  min-height: var(--cr-section-min-height);
}

cr-radio-group {
  width: 100%;
}

/* See also: .no-min-width below. */
.text-elide {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* By default, flexbox children have min-width calculated to be the width
 * of the content. However, in some cases we might want to allow the
 * width to be smaller than the content (i.e. for long text to ellipsis).
 * In such cases this class should be applied.
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=1108514#c5) */
.no-min-width {
  min-width: 0;
}

.header-aligned-button {
  margin-top: 12px;  /* Align cr-button with <h2>. */
}

.link-wrapper {
  align-items: center;
  display: flex;
  flex-grow: 1;
}

/* A list-frame is an outer container for list-items. It is intended to be
 * outside of a settings-box. A list-frame is likely to follow a
 * settings box. */
.list-frame {
  display: block;
  padding-block-end: 0;
  padding-block-start: 0;
  padding-inline-end: var(--cr-section-padding);
  padding-inline-start: var(--cr-section-indent-padding);
}

/* A list-item is intended to be contained within a list-frame. The list
 * frame will set up the initial start margin. */
.list-item {
  align-items: center;
  display: flex;
  min-height: var(--cr-section-min-height);
  padding: 0;
}

/* A thin separator line under a list item. */
.list-item.underbar {
  border-bottom: var(--cr-separator-line);
}

.list-item.selected {
  font-weight: 500;
}

/* The middle part (horizontally) of a list item. */
.list-item .middle {
  flex: 1;
  margin: 8px 16px;
}

/* The start (left in LTR) part (horizontally) of a list item. */
.list-item > .start {
  flex: 1;
}

/* This button has no ink ripple. */
.list-button[is='action-link'] {
  align-items: center;
  display: flex;
  flex: 1;
  font-weight: 500;
  min-height: inherit;
}

/* Link buttons use FocusOutlineManager to only show outlines when focus
 * was triggered by keyboard. */
:host-context(html:not(.focus-outline-visible))
    .list-button[is='action-link'] {
  outline: none;
}

/* A row with two lines of text. Often the lower line will be .secondary.
 */
.two-line {
  min-height: var(--cr-section-two-line-min-height);
}

/* A settings-box is a horizontal row of text or controls within a
 * setting section (page or subpage). */
.settings-box {
  align-items: center;
  border-top: var(--cr-separator-line);
  display: flex;
  min-height: var(--cr-section-min-height);
  padding: 0 var(--cr-section-padding);
}

.settings-box.no-padding {
  padding: 0;
}

.settings-box.no-padding .margin-matches-padding {
  margin: 0 var(--cr-section-padding);
}

.settings-box.no-padding > .link-wrapper {
  padding: 0 var(--cr-section-padding);
}

.settings-box.two-line {
  min-height: var(--cr-section-two-line-min-height);
}

.settings-box-text {
  box-sizing: border-box;
  padding-bottom: var(--cr-section-vertical-padding);
  padding-top: var(--cr-section-vertical-padding);
}

/* We use an explicit tag to remove the top border, rather than a
 * :first-of-type modifier. This is a conscious choice, please consult
 * with dbeam@ or dschuyler@ prior to changing it. */
.settings-box.first,
.settings-box.continuation {
  border-top: none;
}

h2.first {
  padding-top: 0;
}

.settings-box.block {
  display: block;
}

/* A start-aligned column. */
.single-column {
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}

/* A settings-box with no height other than the separator line. */
.settings-box.line-only {
  min-height: 0;
}

/* A settings-box that is embedded in another settings-box (e.g. a control
 * that is associated with a toggle button). */
.settings-box.embedded {
  padding-inline-start: var(--cr-section-indent-padding);
}

/* The lower line of text in a two-line row. */
/* TODO: Remove and merge with .cr-secondary-text. */
.secondary {
  color: var(--cr-secondary-text-color);
  font-weight: 400;
}

/* The |:empty| CSS selector only works when there is no whitespace.
 * E.g. <div>[[foo]]</div> will be |:empty| when foo === ""; and
 * <div> [[foo]] </div> will not be |:empty| when foo === "". Ensure there
 * is no extra whitespace when the contents of .secondary may be "".
 */
.secondary:empty {
  margin: 0;
}

/* The middle part (horizontally) of a row. */
.settings-box .middle {
  align-items: center;
  flex: auto;
  padding-inline-start: 16px;
}

.settings-box .middle.two-line,
.settings-box .start.two-line {
  display: flex;
}

/* The start (left in LTR) part (horizontally) of a row. */
.settings-box .start {
  align-items: center;
  flex: auto;
}

/* For grouping elements with common flex options. */
.settings-row {
  align-items: center;
  display: flex;
  flex-direction: row;
  max-width: 100%;
  min-width: 0;  /* Workaround for text elision in sub-elements. */
}

.no-outline {
  background: none;
  outline: none;
}

/* Prevent icon-button's ripples from fighting with potential scrollbars.
 * Also apply to all iron-lists to align the buttons across them all.*/
[scrollable],
iron-list,
.list-item {
  --cr-icon-button-margin-end: 0;
}

/* Helper for a list frame to automatically avoid the separator line. */
.vertical-list > *:not(:first-of-type) {
  border-top: var(--cr-separator-line);
}

/* The separator a vertical line like a horizontal rule <hr> tag, but goes
 * the other way. An example is near the |sign out| button on the People
 * settings. */
.separator {
  border-inline-start: var(--cr-separator-line);
  flex-shrink: 0;
  /* Match cr-button's default height. */
  height: 32px;
  margin: 0 16px;
}

.settings-box.no-padding > .link-wrapper ~ .separator {
  margin: 0;
}

.column-header {
  color: var(--cr-secondary-text-color);
  font-size: inherit;
  font-weight: 400;
}

/* Error message that appears in a toast to indicate the success or
 * failure of an operation. An example is when adding a printer. */
.error-message {
  color: white;
  font: 13px;
  padding-bottom: 15px;
  padding-top: 15px;
  text-align: center;
  white-space: normal;
}

/* URLs should always be displayed using a LTR embedding - see
 * https://url.spec.whatwg.org/#url-rendering. */
.url-directionality {
  direction: ltr;
  unicode-bidi: embed;
}
    </style>
  </template>
`.content);styleMod$9.register("settings-shared");
// Copyright 2019 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class KeyboardShortcut{constructor(shortcut){this.useKeyCode_=false;this.mods_={};this.key_=null;this.keyCode_=null;shortcut.split("|").forEach((part=>{const partLc=part.toLowerCase();switch(partLc){case"alt":case"ctrl":case"meta":case"shift":this.mods_[partLc+"Key"]=true;break;default:if(this.key_){throw Error("Invalid shortcut")}this.key_=part;if(part.match(/^[a-z]$/)){this.useKeyCode_=true;this.keyCode_=part.toUpperCase().charCodeAt(0)}}}))}matchesEvent(e){if(this.useKeyCode_&&e.keyCode===this.keyCode_||e.key===this.key_){const mods=this.mods_;return["altKey","ctrlKey","metaKey","shiftKey"].every((function(k){return e[k]===!!mods[k]}))}return false}}class KeyboardShortcutList{constructor(shortcuts){this.shortcuts_=shortcuts.split(/\s+/).map((function(shortcut){return new KeyboardShortcut(shortcut)}))}matchesEvent(e){return this.shortcuts_.some((function(keyboardShortcut){return keyboardShortcut.matchesEvent(e)}))}}
// Copyright 2021 The Chromium Authors
const FindShortcutManager=(()=>{const listeners=[];let modalContextOpen=false;const shortcutCtrlF=new KeyboardShortcutList(isMac?"meta|f":"ctrl|f");const shortcutSlash=new KeyboardShortcutList("/");window.addEventListener("keydown",(e=>{if(e.defaultPrevented||listeners.length===0){return}const element=e.composedPath()[0];if(!shortcutCtrlF.matchesEvent(e)&&(element.tagName==="INPUT"||element.tagName==="TEXTAREA"||!shortcutSlash.matchesEvent(e))){return}const focusIndex=listeners.findIndex((listener=>listener.searchInputHasFocus()));const index=focusIndex<=0?listeners.length-1:focusIndex-1;if(listeners[index].handleFindShortcut(modalContextOpen)){e.preventDefault()}}));window.addEventListener("cr-dialog-open",(()=>{modalContextOpen=true}));window.addEventListener("cr-drawer-opened",(()=>{modalContextOpen=true}));window.addEventListener("close",(e=>{if(["CR-DIALOG","CR-DRAWER"].includes(e.composedPath()[0].nodeName)){modalContextOpen=false}}));return Object.freeze({listeners:listeners})})();const FindShortcutMixin=dedupingMixin((superClass=>{class FindShortcutMixin extends superClass{constructor(){super(...arguments);this.findShortcutListenOnAttach=true}connectedCallback(){super.connectedCallback();if(this.findShortcutListenOnAttach){this.becomeActiveFindShortcutListener()}}disconnectedCallback(){super.disconnectedCallback();if(this.findShortcutListenOnAttach){this.removeSelfAsFindShortcutListener()}}becomeActiveFindShortcutListener(){const listeners=FindShortcutManager.listeners;assert$1(!listeners.includes(this),"Already listening for find shortcuts.");listeners.push(this)}handleFindShortcutInternal_(){assertNotReached$1("Must override handleFindShortcut()")}handleFindShortcut(_modalContextOpen){this.handleFindShortcutInternal_();return false}removeSelfAsFindShortcutListener(){const listeners=FindShortcutManager.listeners;const index=listeners.indexOf(this);assert$1(listeners.includes(this),"Find shortcut listener not found.");listeners.splice(index,1)}searchInputHasFocusInternal_(){assertNotReached$1("Must override searchInputHasFocus()")}searchInputHasFocus(){this.searchInputHasFocusInternal_();return false}}return FindShortcutMixin}));
// Copyright 2012 The Chromium Authors
function sanitizeInnerHtmlInternal(rawString,opts){opts=opts||{};const html=parseHtmlSubset$1(`<b>${rawString}</b>`,opts.tags,opts.attrs).firstElementChild;return html.innerHTML}let sanitizedPolicy=null;function sanitizeInnerHtml$1(rawString,opts){assert$1(window.trustedTypes);if(sanitizedPolicy===null){sanitizedPolicy=window.trustedTypes.createPolicy("sanitize-inner-html",{createHTML:sanitizeInnerHtmlInternal,createScript:()=>assertNotReached$1(),createScriptURL:()=>assertNotReached$1()})}return sanitizedPolicy.createHTML(rawString,opts)}const allowAttribute=(_node,_value)=>true;const allowedAttributes=new Map([["href",(node,value)=>node.tagName==="A"&&(value.startsWith("chrome://")||value.startsWith("https://")||value==="#")],["target",(node,value)=>node.tagName==="A"&&value==="_blank"]]);const allowedOptionalAttributes=new Map([["class",allowAttribute],["id",allowAttribute],["is",(_node,value)=>value==="action-link"||value===""],["role",(_node,value)=>value==="link"],["src",(node,value)=>node.tagName==="IMG"&&value.startsWith("chrome://")],["tabindex",allowAttribute],["aria-hidden",allowAttribute],["aria-label",allowAttribute],["aria-labelledby",allowAttribute]]);const allowedTags=new Set(["A","B","BR","DIV","KBD","P","PRE","SPAN","STRONG"]);const allowedOptionalTags=new Set(["IMG","LI","UL"]);let unsanitizedPolicy;function mergeTags(optTags){const clone=new Set(allowedTags);optTags.forEach((str=>{const tag=str.toUpperCase();if(allowedOptionalTags.has(tag)){clone.add(tag)}}));return clone}function mergeAttrs(optAttrs){const clone=new Map(allowedAttributes);optAttrs.forEach((key=>{if(allowedOptionalAttributes.has(key)){clone.set(key,allowedOptionalAttributes.get(key))}}));return clone}function walk(n,f){f(n);for(let i=0;i<n.childNodes.length;i++){walk(n.childNodes[i],f)}}function assertElement(tags,node){if(!tags.has(node.tagName)){throw Error(node.tagName+" is not supported")}}function assertAttribute(attrs,attrNode,node){const n=attrNode.nodeName;const v=attrNode.nodeValue||"";if(!attrs.has(n)||!attrs.get(n)(node,v)){throw Error(node.tagName+"["+n+'="'+v+'"] is not supported')}}function parseHtmlSubset$1(s,extraTags,extraAttrs){const tags=extraTags?mergeTags(extraTags):allowedTags;const attrs=extraAttrs?mergeAttrs(extraAttrs):allowedAttributes;const doc=document.implementation.createHTMLDocument("");const r=doc.createRange();r.selectNode(doc.body);if(window.trustedTypes){if(!unsanitizedPolicy){unsanitizedPolicy=window.trustedTypes.createPolicy("parse-html-subset",{createHTML:untrustedHTML=>untrustedHTML,createScript:()=>assertNotReached$1(),createScriptURL:()=>assertNotReached$1()})}s=unsanitizedPolicy.createHTML(s)}const df=r.createContextualFragment(s);walk(df,(function(node){switch(node.nodeType){case Node.ELEMENT_NODE:assertElement(tags,node);const nodeAttrs=node.attributes;for(let i=0;i<nodeAttrs.length;++i){assertAttribute(attrs,nodeAttrs[i],node)}break;case Node.COMMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:case Node.TEXT_NODE:break;default:throw Error("Node type "+node.nodeType+" is not supported")}}));return df}
// Copyright 2021 The Chromium Authors
const i16nMixin=dedupingMixin((superClass=>{class i16nMixin extends superClass{i16nRaw_(id,...varArgs){return varArgs.length===0?loadTimeData.getString(id):loadTimeData.getStringF(id,...varArgs)}i16n(id,...varArgs){const rawString=this.i16nRaw_(id,...varArgs);return parseHtmlSubset$1(`<b>${rawString}</b>`).firstChild.textContent}i16nAdvanced(id,opts){opts=opts||{};const rawString=this.i16nRaw_(id,...opts.substitutions||[]);return sanitizeInnerHtml$1(rawString,opts)}i16nDynamic(_locale,id,...varArgs){return this.i16n(id,...varArgs)}i16nRecursive(locale,id,...varArgs){let args=varArgs;if(args.length>0){args=args.map((str=>this.i16nExists(str)?loadTimeData.getString(str):str))}return this.i16nDynamic(locale,id,...args)}i16nExists(id){return loadTimeData.valueExists(id)}}return i16nMixin}));
// Copyright 2022 The Chromium Authors
function getDeepActiveElement(){let a=document.activeElement;while(a&&a.shadowRoot&&a.shadowRoot.activeElement){a=a.shadowRoot.activeElement}return a}function isRTL$1(){return document.documentElement.dir==="rtl"}function htmlEscape(original){return original.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function listenOnce(target,eventNames,callback){const eventNamesArray=Array.isArray(eventNames)?eventNames:eventNames.split(/ +/);const removeAllAndCallCallback=function(event){eventNamesArray.forEach((function(eventName){target.removeEventListener(eventName,removeAllAndCallCallback,false)}));return callback(event)};eventNamesArray.forEach((function(eventName){target.addEventListener(eventName,removeAllAndCallCallback,false)}))}function hasKeyModifiers$1(e){return!!(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)}
// Copyright 2011 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let EventTracker$1=class EventTracker{constructor(){this.listeners_=[]}add(target,eventType,listener,capture=false){const h={target:target,eventType:eventType,listener:listener,capture:capture};this.listeners_.push(h);target.addEventListener(eventType,listener,capture)}remove(target,eventType){this.listeners_=this.listeners_.filter((listener=>{if(listener.target===target&&(!eventType||listener.eventType===eventType)){EventTracker$1.removeEventListener(listener);return false}return true}))}removeAll(){this.listeners_.forEach((listener=>EventTracker$1.removeEventListener(listener)));this.listeners_=[]}static removeEventListener(entry){entry.target.removeEventListener(entry.eventType,entry.listener,entry.capture)}};function getTemplate$X(){return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared">
  :host {
    box-sizing: border-box;
    display: block;
    left: 0;
    /* Do not shorten '0px' below to '0' as the calc function requires
     * units. */
    min-height: calc(100vh - var(--cr-toolbar-height) -
        var(--cr-toolbar-padding-top, 0));
    padding-bottom: 60px;
    position: absolute;
    right: 0;
    top: 0;
  }

  :host(:not(.multi-card)) {
    background-color: var(--cr-card-background-color);
    box-shadow: var(--cr-card-shadow);
  }

  :host-context(body.jelly-enabled):host {
    background-color: var(--cros-sys-app_base);
  }

  @media (forced-colors: active) {
    /* Use border instead of box-shadow (which does not work) in Windows
       HCM. */
    :host(:not(.multi-card)) {
      border-inline-end: var(--cr-border-hcm);
      border-inline-start: var(--cr-border-hcm);
    }
  }

  #headerLine {
    min-height: 40px;
    padding-bottom: 24px;
    padding-top: 8px;
  }

  #learnMore {
    align-items: center;
    display: flex;
    height: var(--cr-icon-ripple-size);
    justify-content: center;
    margin-inline-end: var(--cr-icon-ripple-margin);
    margin-inline-start: var(--cr-icon-button-margin-start);
    position: relative;  /* Needed for paper-ripple. */
    width: var(--cr-icon-ripple-size);
  }

  #title-icon {
    height: 36px;
    margin-inline-end: 12px;
    margin-inline-start: 2px;
    width: 36px;
  }

  #closeButton {
    /* Centers the ripple on the icon with appropriate margin on right. */
    margin-inline-end: 10px;
    margin-inline-start: -10px;
  }

  paper-spinner-lite {
    height: var(--cr-icon-size);
    width: var(--cr-icon-size);
  }

  h1 {
    flex: 1;  /* Push other items to the end. */
  }

  cr-search-field {
    /* Keep normal icon spacing from subpage-title-extra controls. */
    margin-inline-start: 16px;
  }
</style>
<div class="cr-row first" id="headerLine">
  <cr-icon-button class="icon-arrow-back" id="closeButton"
      hidden="[[hideCloseButton]]" on-click="onBackClick_"
      aria-label$="[[getBackButtonAriaLabel_(pageTitle)]]"
      aria-roledescription$=
          "[[getBackButtonAriaRoleDescription_(pageTitle)]]">
  </cr-icon-button>
  <template is="dom-if" if="[[titleIcon]]">
    <img id="title-icon" src="[[titleIcon]]" aria-hidden="true">
  </template>
  <h1 class="cr-title-text">[[pageTitle]]</h1>
  <template is="dom-if" if="[[learnMoreUrl]]">
    <cr-icon-button iron-icon="cr:help-outline" dir="ltr"
        aria-label="[[getLearnMoreAriaLabel_(pageTitle)]]" on-click="onHelpClick_">
    </cr-icon-button>
  </template>
  <template is="dom-if" if="[[searchLabel]]">
    <cr-search-field label="[[searchLabel]]"
        on-search-changed="onSearchChanged_"
        clear-label="Clear search">
    </cr-search-field>
  </template>
  <template is="dom-if" if="[[showSpinner]]">
    <paper-spinner-lite active title$="[[spinnerTitle]]">
    </paper-spinner-lite>
  </template>
  <slot name="subpage-title-extra"></slot>
</div>
<slot></slot>
<!--_html_template_end_-->`}
// Copyright 2016 The Chromium Authors
const OsSettingsSubpageElementBase=mixinBehaviors([IronResizableBehavior],RouteObserverMixin(FindShortcutMixin(i16nMixin(PolymerElement))));class OsSettingsSubpageElement extends OsSettingsSubpageElementBase{static get is(){return"os-settings-subpage"}static get properties(){return{pageTitle:String,titleIcon:String,learnMoreUrl:String,searchLabel:String,searchTerm:{type:String,notify:true,value:""},showSpinner:{type:Boolean,value:false},spinnerTitle:{type:String,value:""},hideCloseButton:{type:Boolean,value:false},associatedControl:{type:Object,value:null},preserveSearchTerm:{type:Boolean,value:false},active_:{type:Boolean,value:false,observer:"onActiveChanged_"}}}constructor(){super();this.lastActiveValue_=false;this.eventTracker_=null;this.findShortcutListenOnAttach=false}connectedCallback(){super.connectedCallback();if(this.searchLabel){this.eventTracker_=new EventTracker$1;this.eventTracker_.add(this,"clear-subpage-search",this.onClearSubpageSearch_)}}disconnectedCallback(){super.disconnectedCallback();if(this.eventTracker_){this.eventTracker_.removeAll()}}getSearchField_(){let searchField=this.shadowRoot.querySelector("cr-search-field");if(searchField){return Promise.resolve(searchField)}return new Promise((resolve=>{listenOnce(this,"dom-change",(()=>{searchField=this.shadowRoot.querySelector("cr-search-field");assert$1(!!searchField);resolve(searchField)}))}))}restoreSearchInput_(){const searchField=this.shadowRoot.querySelector("cr-search-field");const urlSearchQuery=Router.getInstance().getQueryParameters().get("searchSubpage")||"";this.searchTerm=urlSearchQuery;searchField.setValue(urlSearchQuery)}preserveSearchInput_(){const query=this.searchTerm;const searchParams=query.length>0?new URLSearchParams("searchSubpage="+encodeURIComponent(query)):undefined;const currentRoute=Router.getInstance().currentRoute;Router.getInstance().navigateTo(currentRoute,searchParams)}focusBackButton(){if(this.hideCloseButton){return}afterNextRender(this,(()=>focusWithoutInk$1(this.$.closeButton)))}currentRouteChanged(newRoute,oldRoute){this.active_=this.getAttribute("route-path")===newRoute.path;if(this.active_&&this.searchLabel&&this.preserveSearchTerm){this.getSearchField_().then((()=>this.restoreSearchInput_()))}if(!oldRoute&&!getSettingIdParameter()){this.focusBackButton()}}onActiveChanged_(){if(this.lastActiveValue_===this.active_){return}this.lastActiveValue_=this.active_;if(this.active_&&this.pageTitle){document.title=loadTimeData.getStringF("settingsAltPageTitle",this.pageTitle)}if(!this.searchLabel){return}const searchField=this.shadowRoot.querySelector("cr-search-field");if(searchField){searchField.setValue("")}if(this.active_){this.becomeActiveFindShortcutListener()}else{this.removeSelfAsFindShortcutListener()}}onClearSubpageSearch_(e){e.stopPropagation();this.shadowRoot.querySelector("cr-search-field").setValue("")}onBackClick_(){Router.getInstance().navigateToPreviousRoute()}onHelpClick_(){window.open(this.learnMoreUrl)}onSearchChanged_(e){if(this.searchTerm===e.detail){return}this.searchTerm=e.detail;if(this.preserveSearchTerm&&this.active_){this.preserveSearchInput_()}}getBackButtonAriaLabel_(){return this.i16n("subpageBackButtonAriaLabel",this.pageTitle)}getBackButtonAriaRoleDescription_(){return this.i16n("subpageBackButtonAriaRoleDescription",this.pageTitle)}getLearnMoreAriaLabel_(){return this.i16n("subpageLearnMoreAriaLabel",this.pageTitle)}handleFindShortcut(modalContextOpen){if(modalContextOpen){return false}this.shadowRoot.querySelector("cr-search-field").getSearchInput().focus();return true}searchInputHasFocus(){const field=this.shadowRoot.querySelector("cr-search-field");return field.getSearchInput()===field.shadowRoot.activeElement}static get template(){return getTemplate$X()}}customElements.define(OsSettingsSubpageElement.is,OsSettingsSubpageElement);
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronScrollTargetBehavior={properties:{scrollTarget:{type:HTMLElement,value:function(){return this._defaultScrollTarget}}},observers:["_scrollTargetChanged(scrollTarget, isAttached)"],_shouldHaveListener:true,_scrollTargetChanged:function(scrollTarget,isAttached){if(this._oldScrollTarget){this._toggleScrollListener(false,this._oldScrollTarget);this._oldScrollTarget=null}if(!isAttached){return}if(scrollTarget==="document"){this.scrollTarget=this._doc}else if(typeof scrollTarget==="string"){var domHost=this.domHost;this.scrollTarget=domHost&&domHost.$?domHost.$[scrollTarget]:dom(this.ownerDocument).querySelector("#"+scrollTarget)}else if(this._isValidScrollTarget()){this._oldScrollTarget=scrollTarget;this._toggleScrollListener(this._shouldHaveListener,scrollTarget)}},_scrollHandler:function scrollHandler(){},get _defaultScrollTarget(){return this._doc},get _doc(){return this.ownerDocument.documentElement},get _scrollTop(){if(this._isValidScrollTarget()){return this.scrollTarget===this._doc?window.pageYOffset:this.scrollTarget.scrollTop}return 0},get _scrollLeft(){if(this._isValidScrollTarget()){return this.scrollTarget===this._doc?window.pageXOffset:this.scrollTarget.scrollLeft}return 0},set _scrollTop(top){if(this.scrollTarget===this._doc){window.scrollTo(window.pageXOffset,top)}else if(this._isValidScrollTarget()){this.scrollTarget.scrollTop=top}},set _scrollLeft(left){if(this.scrollTarget===this._doc){window.scrollTo(left,window.pageYOffset)}else if(this._isValidScrollTarget()){this.scrollTarget.scrollLeft=left}},scroll:function(leftOrOptions,top){var left;if(typeof leftOrOptions==="object"){left=leftOrOptions.left;top=leftOrOptions.top}else{left=leftOrOptions}left=left||0;top=top||0;if(this.scrollTarget===this._doc){window.scrollTo(left,top)}else if(this._isValidScrollTarget()){this.scrollTarget.scrollLeft=left;this.scrollTarget.scrollTop=top}},get _scrollTargetWidth(){if(this._isValidScrollTarget()){return this.scrollTarget===this._doc?window.innerWidth:this.scrollTarget.offsetWidth}return 0},get _scrollTargetHeight(){if(this._isValidScrollTarget()){return this.scrollTarget===this._doc?window.innerHeight:this.scrollTarget.offsetHeight}return 0},_isValidScrollTarget:function(){return this.scrollTarget instanceof HTMLElement},_toggleScrollListener:function(yes,scrollTarget){var eventTarget=scrollTarget===this._doc?window:scrollTarget;if(yes){if(!this._boundScrollHandler){this._boundScrollHandler=this._scrollHandler.bind(this);eventTarget.addEventListener("scroll",this._boundScrollHandler)}}else{if(this._boundScrollHandler){eventTarget.removeEventListener("scroll",this._boundScrollHandler);this._boundScrollHandler=null}}},toggleScrollListener:function(yes){this._shouldHaveListener=yes;this._toggleScrollListener(yes,this.scrollTarget)}};
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var IOS=navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/);var IOS_TOUCH_SCROLLING=IOS&&IOS[1]>=8;var DEFAULT_PHYSICAL_COUNT=3;var HIDDEN_Y="-10000px";var SECRET_TABINDEX=-100;Polymer({_template:html`
    <style>
      :host {
        display: block;
      }

      @media only screen and (-webkit-max-device-pixel-ratio: 1) {
        :host {
          will-change: transform;
        }
      }

      #items {
        position: relative;
      }

      :host(:not([grid])) #items > ::slotted(*) {
        width: 100%;
      }

      #items > ::slotted(*) {
        box-sizing: border-box;
        margin: 0;
        position: absolute;
        top: 0;
        will-change: transform;
      }
    </style>

    <array-selector id="selector" items="{{items}}" selected="{{selectedItems}}" selected-item="{{selectedItem}}"></array-selector>

    <div id="items">
      <slot></slot>
    </div>
`,is:"iron-list",properties:{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},selectedAs:{type:String,value:"selected"},grid:{type:Boolean,value:false,reflectToAttribute:true,observer:"_gridChanged"},selectionEnabled:{type:Boolean,value:false},selectedItem:{type:Object,notify:true},selectedItems:{type:Object,notify:true},multiSelection:{type:Boolean,value:false},scrollOffset:{type:Number,value:0},preserveFocus:{type:Boolean,value:false}},observers:["_itemsChanged(items.*)","_selectionEnabledChanged(selectionEnabled)","_multiSelectionChanged(multiSelection)","_setOverflow(scrollTarget, scrollOffset)"],behaviors:[Templatizer,IronResizableBehavior,IronScrollTargetBehavior,OptionalMutableDataBehavior],_ratio:.5,_scrollerPaddingTop:0,_scrollPosition:0,_physicalSize:0,_physicalAverage:0,_physicalAverageCount:0,_physicalTop:0,_virtualCount:0,_estScrollHeight:0,_scrollHeight:0,_viewportHeight:0,_viewportWidth:0,_physicalItems:null,_physicalSizes:null,_firstVisibleIndexVal:null,_lastVisibleIndexVal:null,_maxPages:2,_focusedItem:null,_focusedVirtualIndex:-1,_focusedPhysicalIndex:-1,_offscreenFocusedItem:null,_focusBackfillItem:null,_itemsPerRow:1,_itemWidth:0,_rowHeight:0,_templateCost:0,_parentModel:true,get _physicalBottom(){return this._physicalTop+this._physicalSize},get _scrollBottom(){return this._scrollPosition+this._viewportHeight},get _virtualEnd(){return this._virtualStart+this._physicalCount-1},get _hiddenContentSize(){var size=this.grid?this._physicalRows*this._rowHeight:this._physicalSize;return size-this._viewportHeight},get _itemsParent(){return dom(dom(this._userTemplate).parentNode)},get _maxScrollTop(){return this._estScrollHeight-this._viewportHeight+this._scrollOffset},get _maxVirtualStart(){var virtualCount=this._convertIndexToCompleteRow(this._virtualCount);return Math.max(0,virtualCount-this._physicalCount)},set _virtualStart(val){val=this._clamp(val,0,this._maxVirtualStart);if(this.grid){val=val-val%this._itemsPerRow}this._virtualStartVal=val},get _virtualStart(){return this._virtualStartVal||0},set _physicalStart(val){val=val%this._physicalCount;if(val<0){val=this._physicalCount+val}if(this.grid){val=val-val%this._itemsPerRow}this._physicalStartVal=val},get _physicalStart(){return this._physicalStartVal||0},get _physicalEnd(){return(this._physicalStart+this._physicalCount-1)%this._physicalCount},set _physicalCount(val){this._physicalCountVal=val},get _physicalCount(){return this._physicalCountVal||0},get _optPhysicalSize(){return this._viewportHeight===0?Infinity:this._viewportHeight*this._maxPages},get _isVisible(){return Boolean(this.offsetWidth||this.offsetHeight)},get firstVisibleIndex(){var idx=this._firstVisibleIndexVal;if(idx==null){var physicalOffset=this._physicalTop+this._scrollOffset;idx=this._iterateItems((function(pidx,vidx){physicalOffset+=this._getPhysicalSizeIncrement(pidx);if(physicalOffset>this._scrollPosition){return this.grid?vidx-vidx%this._itemsPerRow:vidx}if(this.grid&&this._virtualCount-1===vidx){return vidx-vidx%this._itemsPerRow}}))||0;this._firstVisibleIndexVal=idx}return idx},get lastVisibleIndex(){var idx=this._lastVisibleIndexVal;if(idx==null){if(this.grid){idx=Math.min(this._virtualCount,this.firstVisibleIndex+this._estRowsInView*this._itemsPerRow-1)}else{var physicalOffset=this._physicalTop+this._scrollOffset;this._iterateItems((function(pidx,vidx){if(physicalOffset<this._scrollBottom){idx=vidx}physicalOffset+=this._getPhysicalSizeIncrement(pidx)}))}this._lastVisibleIndexVal=idx}return idx},get _defaultScrollTarget(){return this},get _virtualRowCount(){return Math.ceil(this._virtualCount/this._itemsPerRow)},get _estRowsInView(){return Math.ceil(this._viewportHeight/this._rowHeight)},get _physicalRows(){return Math.ceil(this._physicalCount/this._itemsPerRow)},get _scrollOffset(){return this._scrollerPaddingTop+this.scrollOffset},ready:function(){this.addEventListener("focus",this._didFocus.bind(this),true)},attached:function(){this._debounce("_render",this._render,animationFrame);this.listen(this,"iron-resize","_resizeHandler");this.listen(this,"keydown","_keydownHandler")},detached:function(){this.unlisten(this,"iron-resize","_resizeHandler");this.unlisten(this,"keydown","_keydownHandler")},_setOverflow:function(scrollTarget){this.style.webkitOverflowScrolling=scrollTarget===this?"touch":"";this.style.overflowY=scrollTarget===this?"auto":"";this._lastVisibleIndexVal=null;this._firstVisibleIndexVal=null;this._debounce("_render",this._render,animationFrame)},updateViewportBoundaries:function(){var styles=window.getComputedStyle(this);this._scrollerPaddingTop=this.scrollTarget===this?0:parseInt(styles["padding-top"],10);this._isRTL=Boolean(styles.direction==="rtl");this._viewportWidth=this.$.items.offsetWidth;this._viewportHeight=this._scrollTargetHeight;this.grid&&this._updateGridMetrics()},_scrollHandler:function(){var scrollTop=Math.max(0,Math.min(this._maxScrollTop,this._scrollTop));var delta=scrollTop-this._scrollPosition;var isScrollingDown=delta>=0;this._scrollPosition=scrollTop;this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;if(Math.abs(delta)>this._physicalSize&&this._physicalSize>0){delta=delta-this._scrollOffset;var idxAdjustment=Math.round(delta/this._physicalAverage)*this._itemsPerRow;this._virtualStart=this._virtualStart+idxAdjustment;this._physicalStart=this._physicalStart+idxAdjustment;this._physicalTop=Math.min(Math.floor(this._virtualStart/this._itemsPerRow)*this._physicalAverage,this._scrollPosition);this._update()}else if(this._physicalCount>0){var reusables=this._getReusables(isScrollingDown);if(isScrollingDown){this._physicalTop=reusables.physicalTop;this._virtualStart=this._virtualStart+reusables.indexes.length;this._physicalStart=this._physicalStart+reusables.indexes.length}else{this._virtualStart=this._virtualStart-reusables.indexes.length;this._physicalStart=this._physicalStart-reusables.indexes.length}this._update(reusables.indexes,isScrollingDown?null:reusables.indexes);this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,0),microTask)}},_getReusables:function(fromTop){var ith,offsetContent,physicalItemHeight;var idxs=[];var protectedOffsetContent=this._hiddenContentSize*this._ratio;var virtualStart=this._virtualStart;var virtualEnd=this._virtualEnd;var physicalCount=this._physicalCount;var top=this._physicalTop+this._scrollOffset;var bottom=this._physicalBottom+this._scrollOffset;var scrollTop=this._scrollPosition;var scrollBottom=this._scrollBottom;if(fromTop){ith=this._physicalStart;this._physicalEnd;offsetContent=scrollTop-top}else{ith=this._physicalEnd;this._physicalStart;offsetContent=bottom-scrollBottom}while(true){physicalItemHeight=this._getPhysicalSizeIncrement(ith);offsetContent=offsetContent-physicalItemHeight;if(idxs.length>=physicalCount||offsetContent<=protectedOffsetContent){break}if(fromTop){if(virtualEnd+idxs.length+1>=this._virtualCount){break}if(top+physicalItemHeight>=scrollTop-this._scrollOffset){break}idxs.push(ith);top=top+physicalItemHeight;ith=(ith+1)%physicalCount}else{if(virtualStart-idxs.length<=0){break}if(top+this._physicalSize-physicalItemHeight<=scrollBottom){break}idxs.push(ith);top=top-physicalItemHeight;ith=ith===0?physicalCount-1:ith-1}}return{indexes:idxs,physicalTop:top-this._scrollOffset}},_update:function(itemSet,movingUp){if(itemSet&&itemSet.length===0||this._physicalCount===0){return}this._manageFocus();this._assignModels(itemSet);this._updateMetrics(itemSet);if(movingUp){while(movingUp.length){var idx=movingUp.pop();this._physicalTop-=this._getPhysicalSizeIncrement(idx)}}this._positionItems();this._updateScrollerSize()},_createPool:function(size){this._ensureTemplatized();var i,inst;var physicalItems=new Array(size);for(i=0;i<size;i++){inst=this.stamp(null);physicalItems[i]=inst.root.querySelector("*");this._itemsParent.appendChild(inst.root)}return physicalItems},_isClientFull:function(){return this._scrollBottom!=0&&this._physicalBottom-1>=this._scrollBottom&&this._physicalTop<=this._scrollPosition},_increasePoolIfNeeded:function(count){var nextPhysicalCount=this._clamp(this._physicalCount+count,DEFAULT_PHYSICAL_COUNT,this._virtualCount-this._virtualStart);nextPhysicalCount=this._convertIndexToCompleteRow(nextPhysicalCount);if(this.grid){var correction=nextPhysicalCount%this._itemsPerRow;if(correction&&nextPhysicalCount-correction<=this._physicalCount){nextPhysicalCount+=this._itemsPerRow}nextPhysicalCount-=correction}var delta=nextPhysicalCount-this._physicalCount;var nextIncrease=Math.round(this._physicalCount*.5);if(delta<0){return}if(delta>0){var ts=window.performance.now();[].push.apply(this._physicalItems,this._createPool(delta));for(var i=0;i<delta;i++){this._physicalSizes.push(0)}this._physicalCount=this._physicalCount+delta;if(this._physicalStart>this._physicalEnd&&this._isIndexRendered(this._focusedVirtualIndex)&&this._getPhysicalIndex(this._focusedVirtualIndex)<this._physicalEnd){this._physicalStart=this._physicalStart+delta}this._update();this._templateCost=(window.performance.now()-ts)/delta;nextIncrease=Math.round(this._physicalCount*.5)}if(this._virtualEnd>=this._virtualCount-1||nextIncrease===0);else if(!this._isClientFull()){this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,nextIncrease),microTask)}else if(this._physicalSize<this._optPhysicalSize){this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,this._clamp(Math.round(50/this._templateCost),1,nextIncrease)),idlePeriod)}},_render:function(){if(!this.isAttached||!this._isVisible){return}if(this._physicalCount!==0){var reusables=this._getReusables(true);this._physicalTop=reusables.physicalTop;this._virtualStart=this._virtualStart+reusables.indexes.length;this._physicalStart=this._physicalStart+reusables.indexes.length;this._update(reusables.indexes);this._update();this._increasePoolIfNeeded(0)}else if(this._virtualCount>0){this.updateViewportBoundaries();this._increasePoolIfNeeded(DEFAULT_PHYSICAL_COUNT)}},_ensureTemplatized:function(){if(this.ctor){return}this._userTemplate=this.queryEffectiveChildren("template");if(!this._userTemplate){console.warn("iron-list requires a template to be provided in light-dom")}var instanceProps={};instanceProps.__key__=true;instanceProps[this.as]=true;instanceProps[this.indexAs]=true;instanceProps[this.selectedAs]=true;instanceProps.tabIndex=true;this._instanceProps=instanceProps;this.templatize(this._userTemplate,this.mutableData)},_gridChanged:function(newGrid,oldGrid){if(typeof oldGrid==="undefined")return;this.notifyResize();flush();newGrid&&this._updateGridMetrics()},_getFocusedElement:function(){function doSearch(node,query){let result=null;let type=node.nodeType;if(type==Node.ELEMENT_NODE||type==Node.DOCUMENT_FRAGMENT_NODE)result=node.querySelector(query);if(result)return result;let child=node.firstChild;while(child!==null&&result===null){result=doSearch(child,query);child=child.nextSibling}if(result)return result;const shadowRoot=node.shadowRoot;return shadowRoot?doSearch(shadowRoot,query):null}const focusWithin=doSearch(this,":focus-within");return focusWithin?doSearch(focusWithin,":focus"):null},_itemsChanged:function(change){var rendering=/^items(\.splices){0,1}$/.test(change.path);var lastFocusedIndex,focusedElement;if(rendering&&this.preserveFocus){lastFocusedIndex=this._focusedVirtualIndex;focusedElement=this._getFocusedElement()}var preservingFocus=rendering&&this.preserveFocus&&focusedElement;if(change.path==="items"){this._virtualStart=0;this._physicalTop=0;this._virtualCount=this.items?this.items.length:0;this._physicalIndexForKey={};this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;this._physicalCount=this._physicalCount||0;this._physicalItems=this._physicalItems||[];this._physicalSizes=this._physicalSizes||[];this._physicalStart=0;if(this._scrollTop>this._scrollOffset&&!preservingFocus){this._resetScrollPosition(0)}this._removeFocusedItem();this._debounce("_render",this._render,animationFrame)}else if(change.path==="items.splices"){this._adjustVirtualIndex(change.value.indexSplices);this._virtualCount=this.items?this.items.length:0;var itemAddedOrRemoved=change.value.indexSplices.some((function(splice){return splice.addedCount>0||splice.removed.length>0}));if(itemAddedOrRemoved){var activeElement=this._getActiveElement();if(this.contains(activeElement)){activeElement.blur()}}var affectedIndexRendered=change.value.indexSplices.some((function(splice){return splice.index+splice.addedCount>=this._virtualStart&&splice.index<=this._virtualEnd}),this);if(!this._isClientFull()||affectedIndexRendered){this._debounce("_render",this._render,animationFrame)}}else if(change.path!=="items.length"){this._forwardItemPath(change.path,change.value)}if(preservingFocus){flush();focusedElement.blur();this._focusPhysicalItem(Math.min(this.items.length-1,lastFocusedIndex));if(!this._isIndexVisible(this._focusedVirtualIndex)){this.scrollToIndex(this._focusedVirtualIndex)}}},_forwardItemPath:function(path,value){path=path.slice(6);var dot=path.indexOf(".");if(dot===-1){dot=path.length}var isIndexRendered;var pidx;var inst;var offscreenInstance=this.modelForElement(this._offscreenFocusedItem);var vidx=parseInt(path.substring(0,dot),10);isIndexRendered=this._isIndexRendered(vidx);if(isIndexRendered){pidx=this._getPhysicalIndex(vidx);inst=this.modelForElement(this._physicalItems[pidx])}else if(offscreenInstance){inst=offscreenInstance}if(!inst||inst[this.indexAs]!==vidx){return}path=path.substring(dot+1);path=this.as+(path?"."+path:"");inst._setPendingPropertyOrPath(path,value,false,true);inst._flushProperties&&inst._flushProperties();if(isIndexRendered){this._updateMetrics([pidx]);this._positionItems();this._updateScrollerSize()}},_adjustVirtualIndex:function(splices){splices.forEach((function(splice){splice.removed.forEach(this._removeItem,this);if(splice.index<this._virtualStart){var delta=Math.max(splice.addedCount-splice.removed.length,splice.index-this._virtualStart);this._virtualStart=this._virtualStart+delta;if(this._focusedVirtualIndex>=0){this._focusedVirtualIndex=this._focusedVirtualIndex+delta}}}),this)},_removeItem:function(item){this.$.selector.deselect(item);if(this._focusedItem&&this.modelForElement(this._focusedItem)[this.as]===item){this._removeFocusedItem()}},_iterateItems:function(fn,itemSet){var pidx,vidx,rtn,i;if(arguments.length===2&&itemSet){for(i=0;i<itemSet.length;i++){pidx=itemSet[i];vidx=this._computeVidx(pidx);if((rtn=fn.call(this,pidx,vidx))!=null){return rtn}}}else{pidx=this._physicalStart;vidx=this._virtualStart;for(;pidx<this._physicalCount;pidx++,vidx++){if((rtn=fn.call(this,pidx,vidx))!=null){return rtn}}for(pidx=0;pidx<this._physicalStart;pidx++,vidx++){if((rtn=fn.call(this,pidx,vidx))!=null){return rtn}}}},_computeVidx:function(pidx){if(pidx>=this._physicalStart){return this._virtualStart+(pidx-this._physicalStart)}return this._virtualStart+(this._physicalCount-this._physicalStart)+pidx},_assignModels:function(itemSet){this._iterateItems((function(pidx,vidx){var el=this._physicalItems[pidx];var item=this.items&&this.items[vidx];if(item!=null){var inst=this.modelForElement(el);inst.__key__=null;this._forwardProperty(inst,this.as,item);this._forwardProperty(inst,this.selectedAs,this.$.selector.isSelected(item));this._forwardProperty(inst,this.indexAs,vidx);this._forwardProperty(inst,"tabIndex",this._focusedVirtualIndex===vidx?0:-1);this._physicalIndexForKey[inst.__key__]=pidx;inst._flushProperties&&inst._flushProperties(true);el.removeAttribute("hidden")}else{el.setAttribute("hidden","")}}),itemSet)},_updateMetrics:function(itemSet){flush();var newPhysicalSize=0;var oldPhysicalSize=0;var prevAvgCount=this._physicalAverageCount;var prevPhysicalAvg=this._physicalAverage;this._iterateItems((function(pidx,vidx){oldPhysicalSize+=this._physicalSizes[pidx];this._physicalSizes[pidx]=this._physicalItems[pidx].offsetHeight;newPhysicalSize+=this._physicalSizes[pidx];this._physicalAverageCount+=this._physicalSizes[pidx]?1:0}),itemSet);if(this.grid){this._updateGridMetrics();this._physicalSize=Math.ceil(this._physicalCount/this._itemsPerRow)*this._rowHeight}else{oldPhysicalSize=this._itemsPerRow===1?oldPhysicalSize:Math.ceil(this._physicalCount/this._itemsPerRow)*this._rowHeight;this._physicalSize=this._physicalSize+newPhysicalSize-oldPhysicalSize;this._itemsPerRow=1}if(this._physicalAverageCount!==prevAvgCount){this._physicalAverage=Math.round((prevPhysicalAvg*prevAvgCount+newPhysicalSize)/this._physicalAverageCount)}},_updateGridMetrics:function(){this._itemWidth=this._physicalCount>0?this._physicalItems[0].getBoundingClientRect().width:200;this._rowHeight=this._physicalCount>0?this._physicalItems[0].offsetHeight:200;this._itemsPerRow=this._itemWidth?Math.floor(this._viewportWidth/this._itemWidth):this._itemsPerRow},_positionItems:function(){this._adjustScrollPosition();var y=this._physicalTop;if(this.grid){var totalItemWidth=this._itemsPerRow*this._itemWidth;var rowOffset=(this._viewportWidth-totalItemWidth)/2;this._iterateItems((function(pidx,vidx){var modulus=vidx%this._itemsPerRow;var x=Math.floor(modulus*this._itemWidth+rowOffset);if(this._isRTL){x=x*-1}this.translate3d(x+"px",y+"px",0,this._physicalItems[pidx]);if(this._shouldRenderNextRow(vidx)){y+=this._rowHeight}}))}else{const order=[];this._iterateItems((function(pidx,vidx){const item=this._physicalItems[pidx];this.translate3d(0,y+"px",0,item);y+=this._physicalSizes[pidx];const itemId=item.id;if(itemId){order.push(itemId)}}));if(order.length){this.setAttribute("aria-owns",order.join(" "))}}},_getPhysicalSizeIncrement:function(pidx){if(!this.grid){return this._physicalSizes[pidx]}if(this._computeVidx(pidx)%this._itemsPerRow!==this._itemsPerRow-1){return 0}return this._rowHeight},_shouldRenderNextRow:function(vidx){return vidx%this._itemsPerRow===this._itemsPerRow-1},_adjustScrollPosition:function(){var deltaHeight=this._virtualStart===0?this._physicalTop:Math.min(this._scrollPosition+this._physicalTop,0);if(deltaHeight!==0){this._physicalTop=this._physicalTop-deltaHeight;var scrollTop=this._scrollPosition;if(!IOS_TOUCH_SCROLLING&&scrollTop>0){this._resetScrollPosition(scrollTop-deltaHeight)}}},_resetScrollPosition:function(pos){if(this.scrollTarget&&pos>=0){this._scrollTop=pos;this._scrollPosition=this._scrollTop}},_updateScrollerSize:function(forceUpdate){if(this.grid){this._estScrollHeight=this._virtualRowCount*this._rowHeight}else{this._estScrollHeight=this._physicalBottom+Math.max(this._virtualCount-this._physicalCount-this._virtualStart,0)*this._physicalAverage}forceUpdate=forceUpdate||this._scrollHeight===0;forceUpdate=forceUpdate||this._scrollPosition>=this._estScrollHeight-this._physicalSize;forceUpdate=forceUpdate||this.grid&&this.$.items.style.height<this._estScrollHeight;if(forceUpdate||Math.abs(this._estScrollHeight-this._scrollHeight)>=this._viewportHeight){this.$.items.style.height=this._estScrollHeight+"px";this._scrollHeight=this._estScrollHeight}},scrollToItem:function(item){return this.scrollToIndex(this.items.indexOf(item))},scrollToIndex:function(idx){if(typeof idx!=="number"||idx<0||idx>this.items.length-1){return}flush();if(this._physicalCount===0){return}idx=this._clamp(idx,0,this._virtualCount-1);if(!this._isIndexRendered(idx)||idx>=this._maxVirtualStart){this._virtualStart=this.grid?idx-this._itemsPerRow*2:idx-1}this._manageFocus();this._assignModels();this._updateMetrics();this._physicalTop=Math.floor(this._virtualStart/this._itemsPerRow)*this._physicalAverage;var currentTopItem=this._physicalStart;var currentVirtualItem=this._virtualStart;var targetOffsetTop=0;var hiddenContentSize=this._hiddenContentSize;while(currentVirtualItem<idx&&targetOffsetTop<=hiddenContentSize){targetOffsetTop=targetOffsetTop+this._getPhysicalSizeIncrement(currentTopItem);currentTopItem=(currentTopItem+1)%this._physicalCount;currentVirtualItem++}this._updateScrollerSize(true);this._positionItems();this._resetScrollPosition(this._physicalTop+this._scrollOffset+targetOffsetTop);this._increasePoolIfNeeded(0);this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null},_resetAverage:function(){this._physicalAverage=0;this._physicalAverageCount=0},_resizeHandler:function(){this._debounce("_render",(function(){this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;if(this._isVisible){this.updateViewportBoundaries();this.toggleScrollListener(true);this._resetAverage();this._render()}else{this.toggleScrollListener(false)}}),animationFrame)},selectItem:function(item){return this.selectIndex(this.items.indexOf(item))},selectIndex:function(index){if(index<0||index>=this._virtualCount){return}if(!this.multiSelection&&this.selectedItem){this.clearSelection()}if(this._isIndexRendered(index)){var model=this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)]);if(model){model[this.selectedAs]=true}this.updateSizeForIndex(index)}this.$.selector.selectIndex(index)},deselectItem:function(item){return this.deselectIndex(this.items.indexOf(item))},deselectIndex:function(index){if(index<0||index>=this._virtualCount){return}if(this._isIndexRendered(index)){var model=this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)]);model[this.selectedAs]=false;this.updateSizeForIndex(index)}this.$.selector.deselectIndex(index)},toggleSelectionForItem:function(item){return this.toggleSelectionForIndex(this.items.indexOf(item))},toggleSelectionForIndex:function(index){var isSelected=this.$.selector.isIndexSelected?this.$.selector.isIndexSelected(index):this.$.selector.isSelected(this.items[index]);isSelected?this.deselectIndex(index):this.selectIndex(index)},clearSelection:function(){this._iterateItems((function(pidx,vidx){this.modelForElement(this._physicalItems[pidx])[this.selectedAs]=false}));this.$.selector.clearSelection()},_selectionEnabledChanged:function(selectionEnabled){var handler=selectionEnabled?this.listen:this.unlisten;handler.call(this,this,"tap","_selectionHandler")},_selectionHandler:function(e){var model=this.modelForElement(e.target);if(!model){return}var modelTabIndex,activeElTabIndex;var target=dom(e).path[0];var activeEl=this._getActiveElement();var physicalItem=this._physicalItems[this._getPhysicalIndex(model[this.indexAs])];if(target.localName==="input"||target.localName==="button"||target.localName==="select"){return}modelTabIndex=model.tabIndex;model.tabIndex=SECRET_TABINDEX;activeElTabIndex=activeEl?activeEl.tabIndex:-1;model.tabIndex=modelTabIndex;if(activeEl&&physicalItem!==activeEl&&physicalItem.contains(activeEl)&&activeElTabIndex!==SECRET_TABINDEX){return}this.toggleSelectionForItem(model[this.as])},_multiSelectionChanged:function(multiSelection){this.clearSelection();this.$.selector.multi=multiSelection},updateSizeForItem:function(item){return this.updateSizeForIndex(this.items.indexOf(item))},updateSizeForIndex:function(index){if(!this._isIndexRendered(index)){return null}this._updateMetrics([this._getPhysicalIndex(index)]);this._positionItems();return null},_manageFocus:function(){var fidx=this._focusedVirtualIndex;if(fidx>=0&&fidx<this._virtualCount){if(this._isIndexRendered(fidx)){this._restoreFocusedItem()}else{this._createFocusBackfillItem()}}else if(this._virtualCount>0&&this._physicalCount>0){this._focusedPhysicalIndex=this._physicalStart;this._focusedVirtualIndex=this._virtualStart;this._focusedItem=this._physicalItems[this._physicalStart]}},_convertIndexToCompleteRow:function(idx){this._itemsPerRow=this._itemsPerRow||1;return this.grid?Math.ceil(idx/this._itemsPerRow)*this._itemsPerRow:idx},_isIndexRendered:function(idx){return idx>=this._virtualStart&&idx<=this._virtualEnd},_isIndexVisible:function(idx){return idx>=this.firstVisibleIndex&&idx<=this.lastVisibleIndex},_getPhysicalIndex:function(vidx){return(this._physicalStart+(vidx-this._virtualStart))%this._physicalCount},focusItem:function(idx){this._focusPhysicalItem(idx)},_focusPhysicalItem:function(idx){if(idx<0||idx>=this._virtualCount){return}this._restoreFocusedItem();if(!this._isIndexRendered(idx)){this.scrollToIndex(idx)}var physicalItem=this._physicalItems[this._getPhysicalIndex(idx)];var model=this.modelForElement(physicalItem);var focusable;model.tabIndex=SECRET_TABINDEX;if(physicalItem.tabIndex===SECRET_TABINDEX){focusable=physicalItem}if(!focusable){focusable=dom(physicalItem).querySelector('[tabindex="'+SECRET_TABINDEX+'"]')}model.tabIndex=0;this._focusedVirtualIndex=idx;focusable&&focusable.focus()},_removeFocusedItem:function(){if(this._offscreenFocusedItem){this._itemsParent.removeChild(this._offscreenFocusedItem)}this._offscreenFocusedItem=null;this._focusBackfillItem=null;this._focusedItem=null;this._focusedVirtualIndex=-1;this._focusedPhysicalIndex=-1},_createFocusBackfillItem:function(){var fpidx=this._focusedPhysicalIndex;if(this._offscreenFocusedItem||this._focusedVirtualIndex<0){return}if(!this._focusBackfillItem){var inst=this.stamp(null);this._focusBackfillItem=inst.root.querySelector("*");this._itemsParent.appendChild(inst.root)}this._offscreenFocusedItem=this._physicalItems[fpidx];this.modelForElement(this._offscreenFocusedItem).tabIndex=0;this._physicalItems[fpidx]=this._focusBackfillItem;this._focusedPhysicalIndex=fpidx;this.translate3d(0,HIDDEN_Y,0,this._offscreenFocusedItem)},_restoreFocusedItem:function(){if(!this._offscreenFocusedItem||this._focusedVirtualIndex<0){return}this._assignModels();var fpidx=this._focusedPhysicalIndex=this._getPhysicalIndex(this._focusedVirtualIndex);var onScreenItem=this._physicalItems[fpidx];if(!onScreenItem){return}var onScreenInstance=this.modelForElement(onScreenItem);var offScreenInstance=this.modelForElement(this._offscreenFocusedItem);if(onScreenInstance[this.as]===offScreenInstance[this.as]){this._focusBackfillItem=onScreenItem;onScreenInstance.tabIndex=-1;this._physicalItems[fpidx]=this._offscreenFocusedItem;this.translate3d(0,HIDDEN_Y,0,this._focusBackfillItem)}else{this._removeFocusedItem();this._focusBackfillItem=null}this._offscreenFocusedItem=null},_didFocus:function(e){var targetModel=this.modelForElement(e.target);var focusedModel=this.modelForElement(this._focusedItem);var hasOffscreenFocusedItem=this._offscreenFocusedItem!==null;var fidx=this._focusedVirtualIndex;if(!targetModel){return}if(focusedModel===targetModel){if(!this._isIndexVisible(fidx)){this.scrollToIndex(fidx)}}else{this._restoreFocusedItem();if(focusedModel){focusedModel.tabIndex=-1}targetModel.tabIndex=0;fidx=targetModel[this.indexAs];this._focusedVirtualIndex=fidx;this._focusedPhysicalIndex=this._getPhysicalIndex(fidx);this._focusedItem=this._physicalItems[this._focusedPhysicalIndex];if(hasOffscreenFocusedItem&&!this._offscreenFocusedItem){this._update()}}},_keydownHandler:function(e){switch(e.keyCode){case 40:if(this._focusedVirtualIndex<this._virtualCount-1)e.preventDefault();this._focusPhysicalItem(this._focusedVirtualIndex+(this.grid?this._itemsPerRow:1));break;case 39:if(this.grid)this._focusPhysicalItem(this._focusedVirtualIndex+(this._isRTL?-1:1));break;case 38:if(this._focusedVirtualIndex>0)e.preventDefault();this._focusPhysicalItem(this._focusedVirtualIndex-(this.grid?this._itemsPerRow:1));break;case 37:if(this.grid)this._focusPhysicalItem(this._focusedVirtualIndex+(this._isRTL?1:-1));break;case 13:this._focusPhysicalItem(this._focusedVirtualIndex);if(this.selectionEnabled)this._selectionHandler(e);break}},_clamp:function(v,min,max){return Math.min(max,Math.max(min,v))},_debounce:function(name,cb,asyncModule){this._debouncers=this._debouncers||{};this._debouncers[name]=Debouncer.debounce(this._debouncers[name],asyncModule,cb.bind(this));enqueueDebouncer(this._debouncers[name])},_forwardProperty:function(inst,name,value){inst._setPendingProperty(name,value)},_forwardHostPropV2:function(prop,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach((function(item){if(item){this.modelForElement(item).forwardHostProp(prop,value)}}),this)},_notifyInstancePropV2:function(inst,prop,value){if(matches$1(this.as,prop)){var idx=inst[this.indexAs];if(prop==this.as){this.items[idx]=value}this.notifyPath(translate(this.as,"items."+idx,prop),value)}},_getStampedChildren:function(){return this._physicalItems},_forwardInstancePath:function(inst,path,value){if(path.indexOf(this.as+".")===0){this.notifyPath("items."+inst.__key__+"."+path.slice(this.as.length+1),value)}},_forwardParentPath:function(path,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach((function(item){if(item){this.modelForElement(item).notifyPath(path,value)}}),this)},_forwardParentProp:function(prop,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach((function(item){if(item){this.modelForElement(item)[prop]=value}}),this)},_getActiveElement:function(){var itemsHost=this._itemsParent.node.domHost;return dom(itemsHost?itemsHost.root:document).activeElement}});const SettingSpec={$:mojo.internal.Enum()};var Setting;(function(Setting){Setting[Setting["kConfigureEthernet"]=0]="kConfigureEthernet";Setting[Setting["kEthernetAutoConfigureIp"]=1]="kEthernetAutoConfigureIp";Setting[Setting["kEthernetDns"]=2]="kEthernetDns";Setting[Setting["kEthernetProxy"]=3]="kEthernetProxy";Setting[Setting["kWifiOnOff"]=4]="kWifiOnOff";Setting[Setting["kDisconnectWifiNetwork"]=5]="kDisconnectWifiNetwork";Setting[Setting["kPreferWifiNetwork"]=6]="kPreferWifiNetwork";Setting[Setting["kForgetWifiNetwork"]=7]="kForgetWifiNetwork";Setting[Setting["kWifiAddNetwork"]=8]="kWifiAddNetwork";Setting[Setting["kWifiAutoConfigureIp"]=9]="kWifiAutoConfigureIp";Setting[Setting["kWifiDns"]=10]="kWifiDns";Setting[Setting["kWifiProxy"]=11]="kWifiProxy";Setting[Setting["kWifiAutoConnectToNetwork"]=12]="kWifiAutoConnectToNetwork";Setting[Setting["kMobileOnOff"]=13]="kMobileOnOff";Setting[Setting["kCellularSimLock"]=14]="kCellularSimLock";Setting[Setting["kCellularRoaming"]=15]="kCellularRoaming";Setting[Setting["kCellularApn"]=16]="kCellularApn";Setting[Setting["kDisconnectCellularNetwork"]=17]="kDisconnectCellularNetwork";Setting[Setting["kCellularAutoConfigureIp"]=18]="kCellularAutoConfigureIp";Setting[Setting["kCellularDns"]=19]="kCellularDns";Setting[Setting["kCellularProxy"]=20]="kCellularProxy";Setting[Setting["kCellularAutoConnectToNetwork"]=21]="kCellularAutoConnectToNetwork";Setting[Setting["kInstantTetheringOnOff"]=22]="kInstantTetheringOnOff";Setting[Setting["kDisconnectTetherNetwork"]=23]="kDisconnectTetherNetwork";Setting[Setting["kWifiMetered"]=24]="kWifiMetered";Setting[Setting["kCellularMetered"]=25]="kCellularMetered";Setting[Setting["kAddESimNetwork"]=26]="kAddESimNetwork";Setting[Setting["kCellularRemoveESimNetwork"]=27]="kCellularRemoveESimNetwork";Setting[Setting["kCellularRenameESimNetwork"]=28]="kCellularRenameESimNetwork";Setting[Setting["kWifiHidden"]=29]="kWifiHidden";Setting[Setting["kHotspotOnOff"]=30]="kHotspotOnOff";Setting[Setting["kHotspotAutoDisabled"]=31]="kHotspotAutoDisabled";Setting[Setting["kBluetoothOnOff"]=100]="kBluetoothOnOff";Setting[Setting["kBluetoothPairDevice"]=103]="kBluetoothPairDevice";Setting[Setting["kBluetoothUnpairDevice"]=104]="kBluetoothUnpairDevice";Setting[Setting["kFastPairOnOff"]=105]="kFastPairOnOff";Setting[Setting["kFastPairSavedDevices"]=106]="kFastPairSavedDevices";Setting[Setting["kSetUpMultiDevice"]=200]="kSetUpMultiDevice";Setting[Setting["kVerifyMultiDeviceSetup"]=201]="kVerifyMultiDeviceSetup";Setting[Setting["kMultiDeviceOnOff"]=202]="kMultiDeviceOnOff";Setting[Setting["kSmartLockOnOff"]=203]="kSmartLockOnOff";Setting[Setting["kMessagesSetUp"]=205]="kMessagesSetUp";Setting[Setting["kMessagesOnOff"]=206]="kMessagesOnOff";Setting[Setting["kForgetPhone"]=207]="kForgetPhone";Setting[Setting["kNearbyShareOnOff"]=208]="kNearbyShareOnOff";Setting[Setting["kPhoneHubOnOff"]=209]="kPhoneHubOnOff";Setting[Setting["kPhoneHubNotificationsOnOff"]=210]="kPhoneHubNotificationsOnOff";Setting[Setting["kPhoneHubTaskContinuationOnOff"]=212]="kPhoneHubTaskContinuationOnOff";Setting[Setting["kWifiSyncOnOff"]=213]="kWifiSyncOnOff";Setting[Setting["kNearbyShareDeviceName"]=214]="kNearbyShareDeviceName";Setting[Setting["kNearbyShareDeviceVisibility"]=215]="kNearbyShareDeviceVisibility";Setting[Setting["kNearbyShareContacts"]=216]="kNearbyShareContacts";Setting[Setting["kNearbyShareDataUsage"]=217]="kNearbyShareDataUsage";Setting[Setting["kPhoneHubAppsOnOff"]=218]="kPhoneHubAppsOnOff";Setting[Setting["kPhoneHubCameraRollOnOff"]=219]="kPhoneHubCameraRollOnOff";Setting[Setting["kDevicesNearbyAreSharingNotificationOnOff"]=220]="kDevicesNearbyAreSharingNotificationOnOff";Setting[Setting["kAddAccount"]=300]="kAddAccount";Setting[Setting["kRemoveAccount"]=301]="kRemoveAccount";Setting[Setting["kSplitSyncOnOff"]=302]="kSplitSyncOnOff";Setting[Setting["kSetUpParentalControls"]=315]="kSetUpParentalControls";Setting[Setting["kNonSplitSyncEncryptionOptions"]=316]="kNonSplitSyncEncryptionOptions";Setting[Setting["kImproveSearchSuggestions"]=317]="kImproveSearchSuggestions";Setting[Setting["kMakeSearchesAndBrowsingBetter"]=318]="kMakeSearchesAndBrowsingBetter";Setting[Setting["kGoogleDriveSearchSuggestions"]=319]="kGoogleDriveSearchSuggestions";Setting[Setting["kTouchpadTapToClick"]=400]="kTouchpadTapToClick";Setting[Setting["kTouchpadTapDragging"]=401]="kTouchpadTapDragging";Setting[Setting["kTouchpadReverseScrolling"]=402]="kTouchpadReverseScrolling";Setting[Setting["kTouchpadAcceleration"]=403]="kTouchpadAcceleration";Setting[Setting["kTouchpadScrollAcceleration"]=404]="kTouchpadScrollAcceleration";Setting[Setting["kTouchpadSpeed"]=405]="kTouchpadSpeed";Setting[Setting["kMouseSwapPrimaryButtons"]=406]="kMouseSwapPrimaryButtons";Setting[Setting["kMouseReverseScrolling"]=407]="kMouseReverseScrolling";Setting[Setting["kMouseAcceleration"]=408]="kMouseAcceleration";Setting[Setting["kMouseScrollAcceleration"]=409]="kMouseScrollAcceleration";Setting[Setting["kMouseSpeed"]=410]="kMouseSpeed";Setting[Setting["kKeyboardFunctionKeys"]=411]="kKeyboardFunctionKeys";Setting[Setting["kKeyboardAutoRepeat"]=412]="kKeyboardAutoRepeat";Setting[Setting["kKeyboardShortcuts"]=413]="kKeyboardShortcuts";Setting[Setting["kDisplaySize"]=414]="kDisplaySize";Setting[Setting["kNightLight"]=415]="kNightLight";Setting[Setting["kStylusToolsInShelf"]=416]="kStylusToolsInShelf";Setting[Setting["kStylusNoteTakingApp"]=417]="kStylusNoteTakingApp";Setting[Setting["kStylusNoteTakingFromLockScreen"]=418]="kStylusNoteTakingFromLockScreen";Setting[Setting["kStylusLatestNoteOnLockScreen"]=419]="kStylusLatestNoteOnLockScreen";Setting[Setting["kDisplayOrientation"]=420]="kDisplayOrientation";Setting[Setting["kDisplayArrangement"]=421]="kDisplayArrangement";Setting[Setting["kPowerIdleBehaviorWhileCharging"]=422]="kPowerIdleBehaviorWhileCharging";Setting[Setting["kPowerSource"]=423]="kPowerSource";Setting[Setting["kSleepWhenLaptopLidClosed"]=424]="kSleepWhenLaptopLidClosed";Setting[Setting["kDisplayResolution"]=425]="kDisplayResolution";Setting[Setting["kDisplayRefreshRate"]=426]="kDisplayRefreshRate";Setting[Setting["kDisplayMirroring"]=428]="kDisplayMirroring";Setting[Setting["kAllowWindowsToSpanDisplays"]=429]="kAllowWindowsToSpanDisplays";Setting[Setting["kAmbientColors"]=430]="kAmbientColors";Setting[Setting["kTouchscreenCalibration"]=431]="kTouchscreenCalibration";Setting[Setting["kNightLightColorTemperature"]=432]="kNightLightColorTemperature";Setting[Setting["kPowerIdleBehaviorWhileOnBattery"]=433]="kPowerIdleBehaviorWhileOnBattery";Setting[Setting["kDisplayOverscan"]=434]="kDisplayOverscan";Setting[Setting["kPointingStickSpeed"]=435]="kPointingStickSpeed";Setting[Setting["kPointingStickAcceleration"]=436]="kPointingStickAcceleration";Setting[Setting["kPointingStickSwapPrimaryButtons"]=437]="kPointingStickSwapPrimaryButtons";Setting[Setting["kTouchpadHapticFeedback"]=438]="kTouchpadHapticFeedback";Setting[Setting["kTouchpadHapticClickSensitivity"]=439]="kTouchpadHapticClickSensitivity";Setting[Setting["kAdaptiveCharging"]=440]="kAdaptiveCharging";Setting[Setting["kKeyboardBlockMetaFkeyRewrites"]=441]="kKeyboardBlockMetaFkeyRewrites";Setting[Setting["kKeyboardRemapKeys"]=442]="kKeyboardRemapKeys";Setting[Setting["kOpenWallpaper"]=500]="kOpenWallpaper";Setting[Setting["kPreferredSearchEngine"]=600]="kPreferredSearchEngine";Setting[Setting["kAssistantOnOff"]=601]="kAssistantOnOff";Setting[Setting["kAssistantRelatedInfo"]=602]="kAssistantRelatedInfo";Setting[Setting["kAssistantOkGoogle"]=604]="kAssistantOkGoogle";Setting[Setting["kAssistantNotifications"]=605]="kAssistantNotifications";Setting[Setting["kAssistantVoiceInput"]=606]="kAssistantVoiceInput";Setting[Setting["kTrainAssistantVoiceModel"]=607]="kTrainAssistantVoiceModel";Setting[Setting["kQuickAnswersOnOff"]=608]="kQuickAnswersOnOff";Setting[Setting["kQuickAnswersDefinition"]=609]="kQuickAnswersDefinition";Setting[Setting["kQuickAnswersTranslation"]=610]="kQuickAnswersTranslation";Setting[Setting["kQuickAnswersUnitConversion"]=611]="kQuickAnswersUnitConversion";Setting[Setting["kManageAndroidPreferences"]=700]="kManageAndroidPreferences";Setting[Setting["kRemovePlayStore"]=701]="kRemovePlayStore";Setting[Setting["kTurnOnPlayStore"]=702]="kTurnOnPlayStore";Setting[Setting["kRestoreAppsAndPages"]=703]="kRestoreAppsAndPages";Setting[Setting["kDoNotDisturbOnOff"]=704]="kDoNotDisturbOnOff";Setting[Setting["kAppBadgingOnOff"]=705]="kAppBadgingOnOff";Setting[Setting["kSetUpCrostini"]=800]="kSetUpCrostini";Setting[Setting["kUninstallCrostini"]=801]="kUninstallCrostini";Setting[Setting["kBackupLinuxAppsAndFiles"]=802]="kBackupLinuxAppsAndFiles";Setting[Setting["kRestoreLinuxAppsAndFiles"]=803]="kRestoreLinuxAppsAndFiles";Setting[Setting["kCrostiniAdbDebugging"]=804]="kCrostiniAdbDebugging";Setting[Setting["kCrostiniDiskResize"]=805]="kCrostiniDiskResize";Setting[Setting["kCrostiniMicAccess"]=806]="kCrostiniMicAccess";Setting[Setting["kCrostiniContainerUpgrade"]=807]="kCrostiniContainerUpgrade";Setting[Setting["k24HourClock"]=1e3]="k24HourClock";Setting[Setting["kChangeTimeZone"]=1001]="kChangeTimeZone";Setting[Setting["kVerifiedAccess"]=1101]="kVerifiedAccess";Setting[Setting["kUsageStatsAndCrashReports"]=1103]="kUsageStatsAndCrashReports";Setting[Setting["kGuestBrowsingV2"]=1104]="kGuestBrowsingV2";Setting[Setting["kShowUsernamesAndPhotosAtSignInV2"]=1105]="kShowUsernamesAndPhotosAtSignInV2";Setting[Setting["kRestrictSignInV2"]=1106]="kRestrictSignInV2";Setting[Setting["kAddToUserAllowlistV2"]=1107]="kAddToUserAllowlistV2";Setting[Setting["kRemoveFromUserAllowlistV2"]=1108]="kRemoveFromUserAllowlistV2";Setting[Setting["kLockScreenV2"]=1109]="kLockScreenV2";Setting[Setting["kChangeAuthPinV2"]=1110]="kChangeAuthPinV2";Setting[Setting["kAddFingerprintV2"]=1111]="kAddFingerprintV2";Setting[Setting["kRemoveFingerprintV2"]=1112]="kRemoveFingerprintV2";Setting[Setting["kPeripheralDataAccessProtection"]=1113]="kPeripheralDataAccessProtection";Setting[Setting["kSnoopingProtection"]=1114]="kSnoopingProtection";Setting[Setting["kQuickDim"]=1115]="kQuickDim";Setting[Setting["kCameraOnOff"]=1116]="kCameraOnOff";Setting[Setting["kMicrophoneOnOff"]=1117]="kMicrophoneOnOff";Setting[Setting["kGeolocationOnOff"]=1118]="kGeolocationOnOff";Setting[Setting["kAddLanguage"]=1200]="kAddLanguage";Setting[Setting["kShowInputOptionsInShelf"]=1201]="kShowInputOptionsInShelf";Setting[Setting["kShowEmojiSuggestions"]=1203]="kShowEmojiSuggestions";Setting[Setting["kChangeDeviceLanguage"]=1204]="kChangeDeviceLanguage";Setting[Setting["kOfferTranslation"]=1205]="kOfferTranslation";Setting[Setting["kAddInputMethod"]=1206]="kAddInputMethod";Setting[Setting["kSpellCheck"]=1207]="kSpellCheck";Setting[Setting["kShowPKAutoCorrection"]=1209]="kShowPKAutoCorrection";Setting[Setting["kShowVKAutoCorrection"]=1210]="kShowVKAutoCorrection";Setting[Setting["kShowDiacritic"]=1211]="kShowDiacritic";Setting[Setting["kGoogleDriveConnection"]=1300]="kGoogleDriveConnection";Setting[Setting["kAddPrinter"]=1400]="kAddPrinter";Setting[Setting["kSavedPrinters"]=1401]="kSavedPrinters";Setting[Setting["kPrintJobs"]=1402]="kPrintJobs";Setting[Setting["kScanningApp"]=1403]="kScanningApp";Setting[Setting["kA11yQuickSettings"]=1500]="kA11yQuickSettings";Setting[Setting["kChromeVox"]=1501]="kChromeVox";Setting[Setting["kSelectToSpeak"]=1502]="kSelectToSpeak";Setting[Setting["kTextToSpeechRate"]=1503]="kTextToSpeechRate";Setting[Setting["kTextToSpeechPitch"]=1504]="kTextToSpeechPitch";Setting[Setting["kTextToSpeechVolume"]=1505]="kTextToSpeechVolume";Setting[Setting["kTextToSpeechVoice"]=1506]="kTextToSpeechVoice";Setting[Setting["kTextToSpeechEngines"]=1507]="kTextToSpeechEngines";Setting[Setting["kHighContrastMode"]=1508]="kHighContrastMode";Setting[Setting["kFullscreenMagnifier"]=1509]="kFullscreenMagnifier";Setting[Setting["kDockedMagnifier"]=1510]="kDockedMagnifier";Setting[Setting["kStickyKeys"]=1511]="kStickyKeys";Setting[Setting["kOnScreenKeyboard"]=1512]="kOnScreenKeyboard";Setting[Setting["kDictation"]=1513]="kDictation";Setting[Setting["kHighlightKeyboardFocus"]=1514]="kHighlightKeyboardFocus";Setting[Setting["kHighlightTextCaret"]=1515]="kHighlightTextCaret";Setting[Setting["kAutoClickWhenCursorStops"]=1516]="kAutoClickWhenCursorStops";Setting[Setting["kLargeCursor"]=1517]="kLargeCursor";Setting[Setting["kHighlightCursorWhileMoving"]=1518]="kHighlightCursorWhileMoving";Setting[Setting["kTabletNavigationButtons"]=1519]="kTabletNavigationButtons";Setting[Setting["kMonoAudio"]=1520]="kMonoAudio";Setting[Setting["kStartupSound"]=1521]="kStartupSound";Setting[Setting["kEnableSwitchAccess"]=1522]="kEnableSwitchAccess";Setting[Setting["kSwitchActionAssignment"]=1523]="kSwitchActionAssignment";Setting[Setting["kSwitchActionAutoScan"]=1524]="kSwitchActionAutoScan";Setting[Setting["kSwitchActionAutoScanKeyboard"]=1525]="kSwitchActionAutoScanKeyboard";Setting[Setting["kGetImageDescriptionsFromGoogle"]=1526]="kGetImageDescriptionsFromGoogle";Setting[Setting["kLiveCaption"]=1527]="kLiveCaption";Setting[Setting["kEnableCursorColor"]=1528]="kEnableCursorColor";Setting[Setting["kFullscreenMagnifierFocusFollowing"]=1529]="kFullscreenMagnifierFocusFollowing";Setting[Setting["kFullscreenMagnifierMouseFollowingMode"]=1530]="kFullscreenMagnifierMouseFollowingMode";Setting[Setting["kSelectToSpeakWordHighlight"]=1531]="kSelectToSpeakWordHighlight";Setting[Setting["kSelectToSpeakBackgroundShading"]=1532]="kSelectToSpeakBackgroundShading";Setting[Setting["kSelectToSpeakNavigationControls"]=1533]="kSelectToSpeakNavigationControls";Setting[Setting["kPowerwash"]=1600]="kPowerwash";Setting[Setting["kChangeChromeChannel"]=1700]="kChangeChromeChannel";Setting[Setting["kCopyDetailedBuildInfo"]=1701]="kCopyDetailedBuildInfo";Setting[Setting["kCheckForOsUpdate"]=1702]="kCheckForOsUpdate";Setting[Setting["kSeeWhatsNew"]=1703]="kSeeWhatsNew";Setting[Setting["kGetHelpWithChromeOs"]=1704]="kGetHelpWithChromeOs";Setting[Setting["kReportAnIssue"]=1705]="kReportAnIssue";Setting[Setting["kTermsOfService"]=1706]="kTermsOfService";Setting[Setting["kDiagnostics"]=1707]="kDiagnostics";Setting[Setting["kChangeDeviceName"]=1708]="kChangeDeviceName";Setting[Setting["kFirmwareUpdates"]=1709]="kFirmwareUpdates";Setting[Setting["kAddKerberosTicketV2"]=1800]="kAddKerberosTicketV2";Setting[Setting["kRemoveKerberosTicketV2"]=1801]="kRemoveKerberosTicketV2";Setting[Setting["kSetActiveKerberosTicketV2"]=1802]="kSetActiveKerberosTicketV2";Setting[Setting["MIN_VALUE"]=0]="MIN_VALUE";Setting[Setting["MAX_VALUE"]=1802]="MAX_VALUE"})(Setting||(Setting={}));var setting_mojomWebui=Object.freeze({__proto__:null,get Setting(){return Setting},SettingSpec:SettingSpec});class UserActionRecorderPendingReceiver{constructor(handle){this.handle=mojo.internal.interfaceSupport.getEndpointForReceiver(handle)}bindInBrowser(scope="context"){mojo.internal.interfaceSupport.bind(this.handle,"ash.settings.mojom.UserActionRecorder",scope)}}class UserActionRecorderRemote{constructor(handle){this.proxy=new mojo.internal.interfaceSupport.InterfaceRemoteBase(UserActionRecorderPendingReceiver,handle);this.$=new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);this.onConnectionError=this.proxy.getConnectionErrorEventRouter()}recordPageFocus(){this.proxy.sendMessage(0,UserActionRecorder_RecordPageFocus_ParamsSpec.$,null,[])}recordPageBlur(){this.proxy.sendMessage(1,UserActionRecorder_RecordPageBlur_ParamsSpec.$,null,[])}recordClick(){this.proxy.sendMessage(2,UserActionRecorder_RecordClick_ParamsSpec.$,null,[])}recordNavigation(){this.proxy.sendMessage(3,UserActionRecorder_RecordNavigation_ParamsSpec.$,null,[])}recordSearch(){this.proxy.sendMessage(4,UserActionRecorder_RecordSearch_ParamsSpec.$,null,[])}recordSettingChange(){this.proxy.sendMessage(5,UserActionRecorder_RecordSettingChange_ParamsSpec.$,null,[])}recordSettingChangeWithDetails(setting,value){this.proxy.sendMessage(6,UserActionRecorder_RecordSettingChangeWithDetails_ParamsSpec.$,null,[setting,value])}}class UserActionRecorderReceiver{constructor(impl){this.helper_internal_=new mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal(UserActionRecorderRemote);this.$=new mojo.internal.interfaceSupport.InterfaceReceiverHelper(this.helper_internal_);this.helper_internal_.registerHandler(0,UserActionRecorder_RecordPageFocus_ParamsSpec.$,null,impl.recordPageFocus.bind(impl));this.helper_internal_.registerHandler(1,UserActionRecorder_RecordPageBlur_ParamsSpec.$,null,impl.recordPageBlur.bind(impl));this.helper_internal_.registerHandler(2,UserActionRecorder_RecordClick_ParamsSpec.$,null,impl.recordClick.bind(impl));this.helper_internal_.registerHandler(3,UserActionRecorder_RecordNavigation_ParamsSpec.$,null,impl.recordNavigation.bind(impl));this.helper_internal_.registerHandler(4,UserActionRecorder_RecordSearch_ParamsSpec.$,null,impl.recordSearch.bind(impl));this.helper_internal_.registerHandler(5,UserActionRecorder_RecordSettingChange_ParamsSpec.$,null,impl.recordSettingChange.bind(impl));this.helper_internal_.registerHandler(6,UserActionRecorder_RecordSettingChangeWithDetails_ParamsSpec.$,null,impl.recordSettingChangeWithDetails.bind(impl));this.onConnectionError=this.helper_internal_.getConnectionErrorEventRouter()}}class UserActionRecorder{static get $interfaceName(){return"ash.settings.mojom.UserActionRecorder"}static getRemote(){let remote=new UserActionRecorderRemote;remote.$.bindNewPipeAndPassReceiver().bindInBrowser();return remote}}class UserActionRecorderCallbackRouter{constructor(){this.helper_internal_=new mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal(UserActionRecorderRemote);this.$=new mojo.internal.interfaceSupport.InterfaceReceiverHelper(this.helper_internal_);this.router_=new mojo.internal.interfaceSupport.CallbackRouter;this.recordPageFocus=new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);this.helper_internal_.registerHandler(0,UserActionRecorder_RecordPageFocus_ParamsSpec.$,null,this.recordPageFocus.createReceiverHandler(false));this.recordPageBlur=new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);this.helper_internal_.registerHandler(1,UserActionRecorder_RecordPageBlur_ParamsSpec.$,null,this.recordPageBlur.createReceiverHandler(false));this.recordClick=new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);this.helper_internal_.registerHandler(2,UserActionRecorder_RecordClick_ParamsSpec.$,null,this.recordClick.createReceiverHandler(false));this.recordNavigation=new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);this.helper_internal_.registerHandler(3,UserActionRecorder_RecordNavigation_ParamsSpec.$,null,this.recordNavigation.createReceiverHandler(false));this.recordSearch=new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);this.helper_internal_.registerHandler(4,UserActionRecorder_RecordSearch_ParamsSpec.$,null,this.recordSearch.createReceiverHandler(false));this.recordSettingChange=new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);this.helper_internal_.registerHandler(5,UserActionRecorder_RecordSettingChange_ParamsSpec.$,null,this.recordSettingChange.createReceiverHandler(false));this.recordSettingChangeWithDetails=new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);this.helper_internal_.registerHandler(6,UserActionRecorder_RecordSettingChangeWithDetails_ParamsSpec.$,null,this.recordSettingChangeWithDetails.createReceiverHandler(false));this.onConnectionError=this.helper_internal_.getConnectionErrorEventRouter()}removeListener(id){return this.router_.removeListener(id)}}const UserActionRecorder_RecordPageFocus_ParamsSpec={$:{}};const UserActionRecorder_RecordPageBlur_ParamsSpec={$:{}};const UserActionRecorder_RecordClick_ParamsSpec={$:{}};const UserActionRecorder_RecordNavigation_ParamsSpec={$:{}};const UserActionRecorder_RecordSearch_ParamsSpec={$:{}};const UserActionRecorder_RecordSettingChange_ParamsSpec={$:{}};const UserActionRecorder_RecordSettingChangeWithDetails_ParamsSpec={$:{}};const SettingChangeValueSpec={$:{}};mojo.internal.Struct(UserActionRecorder_RecordPageFocus_ParamsSpec.$,"UserActionRecorder_RecordPageFocus_Params",[],[[0,8]]);mojo.internal.Struct(UserActionRecorder_RecordPageBlur_ParamsSpec.$,"UserActionRecorder_RecordPageBlur_Params",[],[[0,8]]);mojo.internal.Struct(UserActionRecorder_RecordClick_ParamsSpec.$,"UserActionRecorder_RecordClick_Params",[],[[0,8]]);mojo.internal.Struct(UserActionRecorder_RecordNavigation_ParamsSpec.$,"UserActionRecorder_RecordNavigation_Params",[],[[0,8]]);mojo.internal.Struct(UserActionRecorder_RecordSearch_ParamsSpec.$,"UserActionRecorder_RecordSearch_Params",[],[[0,8]]);mojo.internal.Struct(UserActionRecorder_RecordSettingChange_ParamsSpec.$,"UserActionRecorder_RecordSettingChange_Params",[],[[0,8]]);mojo.internal.Struct(UserActionRecorder_RecordSettingChangeWithDetails_ParamsSpec.$,"UserActionRecorder_RecordSettingChangeWithDetails_Params",[mojo.internal.StructField("setting",0,0,SettingSpec.$,0,false,0),mojo.internal.StructField("value",8,0,SettingChangeValueSpec.$,null,true,0)],[[0,32]]);mojo.internal.Union(SettingChangeValueSpec.$,"SettingChangeValue",{boolValue:{ordinal:0,type:mojo.internal.Bool},intValue:{ordinal:1,type:mojo.internal.Int32},stringValue:{ordinal:2,type:mojo.internal.String}});var user_action_recorder_mojomWebui=Object.freeze({__proto__:null,SettingChangeValueSpec:SettingChangeValueSpec,UserActionRecorder:UserActionRecorder,UserActionRecorderCallbackRouter:UserActionRecorderCallbackRouter,UserActionRecorderPendingReceiver:UserActionRecorderPendingReceiver,UserActionRecorderReceiver:UserActionRecorderReceiver,UserActionRecorderRemote:UserActionRecorderRemote,UserActionRecorder_RecordClick_ParamsSpec:UserActionRecorder_RecordClick_ParamsSpec,UserActionRecorder_RecordNavigation_ParamsSpec:UserActionRecorder_RecordNavigation_ParamsSpec,UserActionRecorder_RecordPageBlur_ParamsSpec:UserActionRecorder_RecordPageBlur_ParamsSpec,UserActionRecorder_RecordPageFocus_ParamsSpec:UserActionRecorder_RecordPageFocus_ParamsSpec,UserActionRecorder_RecordSearch_ParamsSpec:UserActionRecorder_RecordSearch_ParamsSpec,UserActionRecorder_RecordSettingChangeWithDetails_ParamsSpec:UserActionRecorder_RecordSettingChangeWithDetails_ParamsSpec,UserActionRecorder_RecordSettingChange_ParamsSpec:UserActionRecorder_RecordSettingChange_ParamsSpec});
// Copyright 2020 The Chromium Authors
let userActionRecorder=null;function setUserActionRecorderForTesting(testRecorder){userActionRecorder=testRecorder}function getRecorder(){if(userActionRecorder){return userActionRecorder}userActionRecorder=UserActionRecorder.getRemote();return userActionRecorder}function recordPageFocus(){getRecorder().recordPageFocus()}function recordPageBlur(){getRecorder().recordPageBlur()}function recordClick(){getRecorder().recordClick()}function recordNavigation(){getRecorder().recordNavigation()}function recordSearch(){getRecorder().recordSearch()}function recordSettingChange(setting,value){if(setting===undefined){getRecorder().recordSettingChange()}else{getRecorder().recordSettingChangeWithDetails(setting,value||null)}}
// Copyright 2022 The Chromium Authors
const ARC_VM_TYPE="arcvm";const BRUSCHETTA_TYPE="bruschetta";const CROSTINI_TYPE="crostini";const PLUGIN_VM_TYPE="pluginVm";const TERMINA_VM_TYPE="termina";function getVMNameForGuestOsType(guestOs){return{[CROSTINI_TYPE]:TERMINA_VM_TYPE,[PLUGIN_VM_TYPE]:"PvmDefault",[ARC_VM_TYPE]:ARC_VM_TYPE,[BRUSCHETTA_TYPE]:"bru"}[guestOs]}const VM_DEVICE_MICROPHONE="microphone";let instance$r=null;class GuestOsBrowserProxyImpl{static getInstance(){return instance$r||(instance$r=new GuestOsBrowserProxyImpl)}static setInstanceForTesting(obj){instance$r=obj}getGuestOsSharedPathsDisplayText(paths){return sendWithPromise("getGuestOsSharedPathsDisplayText",paths)}removeGuestOsSharedPath(vmName,path){return sendWithPromise("removeGuestOsSharedPath",vmName,path)}notifyGuestOsSharedUsbDevicesPageReady(){chrome.send("notifyGuestOsSharedUsbDevicesPageReady")}setGuestOsUsbDeviceShared(vmName,containerName,guid,shared){chrome.send("setGuestOsUsbDeviceShared",[vmName,containerName,guid,shared])}}function getTemplate$W(){return html`<!--_html_template_start_--><style include="settings-shared"></style>
<div class="settings-box first">
  <div role="text">
    [[getDescriptionText_()]]
    <span id="guestOsInstructionsRemove" hidden="[[!sharedPaths_.length]]">
      Removing folders will stop sharing but will not delete files.
    </span>
  </div>
</div>
<div id="guestOsListEmpty" class="settings-box secondary continuation"
    hidden="[[sharedPaths_.length]]" >
   Shared folders will appear here
</div>
<div id="guestOsList" hidden="[[!sharedPaths_.length]]">
  <div class="settings-box continuation">
    <h2 id="guestOsListHeading" class="start">
      Shared folders
    </h2>
  </div>
  <iron-list class="list-frame vertical-list" role="list"
      aria-labeledby="guestOsListHeading" items="[[sharedPaths_]]">
    <template>
      <div class="list-item" role="listitem">
        <div class="start" aria-hidden="true"
            id="[[generatePathDisplayTextId_(index)]]">
          [[item.pathDisplayText]]
        </div>
        <cr-icon-button class="icon-clear" tabindex$="[[tabIndex]]"
            on-click="onRemoveSharedPathClick_"
            title="Stop sharing"
            aria-labeledby$="[[generatePathDisplayTextId_(index)]]">
        </cr-icon-button>
      </div>
    </template>
  </iron-list>
</div>
<template is="dom-if" if="[[sharedPathWhichFailedRemoval_]]" restamp>
  <cr-dialog id="removeSharedPathFailedDialog" close-text="Close"
      show-on-attach>
    <div slot="title">
      Unshare failed
    </div>
    <div slot="body">
      [[getRemoveFailureMessage_()]]
    </div>
    <div slot="button-container">
      <cr-button id="cancel" class="cancel-button"
          on-click="onRemoveFailedDismissClick_">
        OK
      </cr-button>
      <cr-button id="retry" class="action-button"
          on-click="onRemoveFailedRetryClick_">
        Try again
      </cr-button>
    </div>
  </cr-dialog>
</template>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
const SettingsGuestOsSharedPathsElementBase=i16nMixin(PolymerElement);class SettingsGuestOsSharedPathsElement extends SettingsGuestOsSharedPathsElementBase{static get is(){return"settings-guest-os-shared-paths"}static get template(){return getTemplate$W()}static get properties(){return{guestOsType:String,prefs:{type:Object,notify:true},sharedPaths_:Array,sharedPathWhichFailedRemoval_:{type:String,value:null}}}static get observers(){return["onGuestOsSharedPathsChanged_(prefs.guest_os.paths_shared_to_vms.value)"]}constructor(){super();this.browserProxy_=GuestOsBrowserProxyImpl.getInstance()}onGuestOsSharedPathsChanged_(paths){const vmPaths=[];for(const path in paths){const vms=paths[path];if(vms.includes(this.vmName_())){vmPaths.push(path)}}this.browserProxy_.getGuestOsSharedPathsDisplayText(vmPaths).then((text=>{this.sharedPaths_=vmPaths.map(((path,i)=>({path:path,pathDisplayText:text[i]})))}))}removeSharedPath_(path){this.sharedPathWhichFailedRemoval_=null;this.browserProxy_.removeGuestOsSharedPath(this.vmName_(),path).then((success=>{if(!success){this.sharedPathWhichFailedRemoval_=path}}));recordSettingChange()}onRemoveSharedPathClick_(event){this.removeSharedPath_(event.model.item.path)}onRemoveFailedRetryClick_(){this.removeSharedPath_(castExists(this.sharedPathWhichFailedRemoval_))}onRemoveFailedDismissClick_(){this.sharedPathWhichFailedRemoval_=null}vmName_(){return getVMNameForGuestOsType(this.guestOsType)}getDescriptionText_(){return this.i16n(this.guestOsType+"SharedPathsInstructionsLocate")+"\n"+this.i16n(this.guestOsType+"SharedPathsInstructionsAdd")}getRemoveFailureMessage_(){return this.i16n(this.guestOsType+"SharedPathsRemoveFailureDialogMessage")}generatePathDisplayTextId_(index){return"path-display-text-"+index}}customElements.define(SettingsGuestOsSharedPathsElement.is,SettingsGuestOsSharedPathsElement);function getTemplate$V(){return html`<!--_html_template_start_-->    <style>:host{--cr-toggle-checked-bar-color:var(--google-blue-600);--cr-toggle-checked-button-color:var(--google-blue-600);--cr-toggle-checked-ripple-color:rgba(var(--google-blue-600-rgb), .2);--cr-toggle-ripple-diameter:40px;--cr-toggle-unchecked-bar-color:var(--google-grey-400);--cr-toggle-unchecked-button-color:white;--cr-toggle-unchecked-ripple-color:rgba(var(--google-grey-600-rgb), .15);-webkit-tap-highlight-color:transparent;cursor:pointer;display:block;min-width:34px;outline:0;position:relative;width:34px}:host-context([chrome-refresh-2023]):host{--cr-toggle-checked-bar-color:var(--color-toggle-button-track-on,
                var(--cr-fallback-color-primary));--cr-toggle-checked-button-color:var(--color-toggle-button-thumb-on,
                var(--cr-fallback-color-on-primary));--cr-toggle-unchecked-bar-color:var(--color-toggle-button-track-off,
                var(--cr-fallback-color-surface-variant));--cr-toggle-unchecked-button-color:var(--color-toggle-button-thumb-off,
                var(--cr-fallback-color-outline));--cr-toggle-checked-ripple-color:var(--cr-active-background-color);--cr-toggle-unchecked-ripple-color:var(--cr-active-background-color);--cr-toggle-ripple-diameter:20px;height:fit-content;min-width:initial;width:fit-content}@media (forced-colors:active){:host{forced-color-adjust:none}}@media (prefers-color-scheme:dark){:host{--cr-toggle-checked-bar-color:var(--google-blue-300);--cr-toggle-checked-button-color:var(--google-blue-300);--cr-toggle-checked-ripple-color:rgba(var(--google-blue-300-rgb), .4);--cr-toggle-unchecked-bar-color:var(--google-grey-500);--cr-toggle-unchecked-button-color:var(--google-grey-300);--cr-toggle-unchecked-ripple-color:rgba(var(--google-grey-300-rgb), .4)}}:host([dark]){--cr-toggle-checked-bar-color:var(--google-blue-300);--cr-toggle-checked-button-color:var(--google-blue-300);--cr-toggle-checked-ripple-color:rgba(var(--google-blue-300-rgb), .4);--cr-toggle-unchecked-bar-color:var(--google-grey-500);--cr-toggle-unchecked-button-color:var(--google-grey-300);--cr-toggle-unchecked-ripple-color:rgba(var(--google-grey-300-rgb), .4)}:host([disabled]){cursor:initial;opacity:var(--cr-disabled-opacity);pointer-events:none}:host-context([chrome-refresh-2023]):host([disabled]){--cr-toggle-checked-bar-color:var(--color-toggle-button-track-on-disabled,
                rgba(var(--cr-fallback-color-on-surface-rgb), .12));--cr-toggle-checked-button-color:var(--color-toggle-button-thumb-on-disabled, var(--cr-fallback-color-surface));--cr-toggle-unchecked-bar-color:transparent;--cr-toggle-unchecked-button-color:var(--color-toggle-button-thumb-off-disabled,
                rgba(var(--cr-fallback-color-on-surface-rgb),
                    var(--cr-disabled-opacity)));opacity:1}#bar{background-color:var(--cr-toggle-unchecked-bar-color);border-radius:8px;height:12px;left:3px;position:absolute;top:2px;transition:background-color linear 80ms;width:28px;z-index:0}:host([checked]) #bar{background-color:var(--cr-toggle-checked-bar-color);opacity:var(--cr-toggle-checked-bar-opacity,.5)}:host-context([chrome-refresh-2023]) #bar{border:1px solid var(--cr-toggle-unchecked-button-color);border-radius:50px;box-sizing:border-box;display:block;height:16px;opacity:1;position:initial;width:26px}:host-context([chrome-refresh-2023]):host([checked]) #bar{border-color:var(--cr-toggle-checked-bar-color)}:host-context([chrome-refresh-2023]):host([disabled]) #bar{border-color:var(--cr-toggle-unchecked-button-color)}:host-context([chrome-refresh-2023]):host([disabled][checked]) #bar{border:none}:host-context([chrome-refresh-2023]):host(:focus-visible) #bar{background-clip:padding-box;border-color:transparent;outline:2px solid var(--cr-toggle-checked-bar-color)}#knob{background-color:var(--cr-toggle-unchecked-button-color);border-radius:50%;box-shadow:var(--cr-toggle-box-shadow,0 1px 3px 0 rgba(0,0,0,.4));display:block;height:16px;position:relative;transition:transform linear 80ms,background-color linear 80ms;width:16px;z-index:1}:host([checked]) #knob{background-color:var(--cr-toggle-checked-button-color);transform:translate3d(18px,0,0)}:host-context([dir=rtl]):host([checked]) #knob{transform:translate3d(-18px,0,0)}:host-context([chrome-refresh-2023]) #knob{--cr-toggle-knob-diameter_:8px;--cr-toggle-knob-center-edge-distance_:8px;box-shadow:none;height:var(--cr-toggle-knob-diameter_);left:var(--cr-toggle-knob-center-edge-distance_);position:absolute;top:50%;transform:translate(-50%,-50%);transition:left linear 80ms,background-color linear 80ms,width linear 80ms,height linear 80ms;width:var(--cr-toggle-knob-diameter_)}:host-context([chrome-refresh-2023]):host(:active) #knob{--cr-toggle-knob-diameter_:10px}:host-context([chrome-refresh-2023]):host([checked]) #knob{--cr-toggle-knob-diameter_:12px;left:calc(100% - var(--cr-toggle-knob-center-edge-distance_))}:host-context([chrome-refresh-2023]):host([checked]:active) #knob{--cr-toggle-knob-diameter_:14px}:host-context([chrome-refresh-2023]):host([checked]:active) #knob,:host-context([chrome-refresh-2023]):host([checked]:hover) #knob{--cr-toggle-checked-button-color:var(--color-toggle-button-thumb-on-hover-pressed,
                var(--cr-fallback-color-primary-container))}:host-context([chrome-refresh-2023]):host(:hover) #knob::before{background-color:var(--cr-hover-background-color);border-radius:50%;content:'';height:var(--cr-toggle-ripple-diameter);left:calc(var(--cr-toggle-knob-diameter_)/ 2);position:absolute;top:calc(var(--cr-toggle-knob-diameter_)/ 2);transform:translate(-50%,-50%);width:var(--cr-toggle-ripple-diameter)}paper-ripple{--paper-ripple-opacity:1;color:var(--cr-toggle-unchecked-ripple-color);height:var(--cr-toggle-ripple-diameter);left:50%;outline:var(--cr-toggle-ripple-ring,none);pointer-events:none;position:absolute;top:50%;transform:translate(-50%,-50%);transition:color linear 80ms;width:var(--cr-toggle-ripple-diameter)}:host([checked]) paper-ripple{color:var(--cr-toggle-checked-ripple-color)}:host-context([dir=rtl]) paper-ripple{left:auto;right:50%;transform:translate(50%,-50%)}</style>
    <span id="bar"></span>
    <span id="knob"></span>
<!--_html_template_end_-->`}
// Copyright 2017 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const MOVE_THRESHOLD_PX=5;const CrToggleElementBase=mixinBehaviors([PaperRippleBehavior],PolymerElement);class CrToggleElement extends CrToggleElementBase{constructor(){super(...arguments);this.boundPointerMove_=null;this.handledInPointerMove_=false;this.pointerDownX_=0}static get is(){return"cr-toggle"}static get template(){return getTemplate$V()}static get properties(){return{checked:{type:Boolean,value:false,reflectToAttribute:true,observer:"checkedChanged_",notify:true},dark:{type:Boolean,value:false,reflectToAttribute:true},disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"}}}ready(){super.ready();if(!this.hasAttribute("role")){this.setAttribute("role","button")}if(!this.hasAttribute("tabindex")){this.setAttribute("tabindex","0")}this.setAttribute("aria-pressed",this.checked?"true":"false");this.setAttribute("aria-disabled",this.disabled?"true":"false");if(!document.documentElement.hasAttribute("chrome-refresh-2023")){this.addEventListener("blur",this.hideRipple_.bind(this));this.addEventListener("focus",this.onFocus_.bind(this))}this.addEventListener("click",this.onClick_.bind(this));this.addEventListener("keydown",this.onKeyDown_.bind(this));this.addEventListener("keyup",this.onKeyUp_.bind(this));this.addEventListener("pointerdown",this.onPointerDown_.bind(this));this.addEventListener("pointerup",this.onPointerUp_.bind(this))}connectedCallback(){super.connectedCallback();const direction=this.matches(":host-context([dir=rtl]) cr-toggle")?-1:1;this.boundPointerMove_=e=>{e.preventDefault();const diff=e.clientX-this.pointerDownX_;if(Math.abs(diff)<MOVE_THRESHOLD_PX){return}this.handledInPointerMove_=true;const shouldToggle=diff*direction<0&&this.checked||diff*direction>0&&!this.checked;if(shouldToggle){this.toggleState_(false)}}}checkedChanged_(){this.setAttribute("aria-pressed",this.checked?"true":"false")}disabledChanged_(){this.setAttribute("tabindex",this.disabled?"-1":"0");this.setAttribute("aria-disabled",this.disabled?"true":"false")}onFocus_(){this.getRipple().showAndHoldDown()}hideRipple_(){this.getRipple().clear()}onPointerUp_(){assert$1(this.boundPointerMove_);this.removeEventListener("pointermove",this.boundPointerMove_);this.hideRipple_()}onPointerDown_(e){if(e.button!==0){return}this.setPointerCapture(e.pointerId);this.pointerDownX_=e.clientX;this.handledInPointerMove_=false;assert$1(this.boundPointerMove_);this.addEventListener("pointermove",this.boundPointerMove_)}onClick_(e){e.stopPropagation();e.preventDefault();if(this.handledInPointerMove_){return}this.toggleState_(false)}toggleState_(fromKeyboard){if(this.disabled){return}if(!fromKeyboard){this.hideRipple_()}this.checked=!this.checked;this.dispatchEvent(new CustomEvent("change",{bubbles:true,composed:true,detail:this.checked}))}onKeyDown_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.repeat){return}if(e.key==="Enter"){this.toggleState_(true)}}onKeyUp_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.key===" "){this.toggleState_(true)}}_createRipple(){this._rippleContainer=this.$.knob;const ripple=super._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");ripple.classList.add("circle","toggle-ink");return ripple}}customElements.define(CrToggleElement.is,CrToggleElement);
// Copyright 2017 The Chromium Authors
var CrContainerShadowSide;(function(CrContainerShadowSide){CrContainerShadowSide["TOP"]="top";CrContainerShadowSide["BOTTOM"]="bottom"})(CrContainerShadowSide||(CrContainerShadowSide={}));const CrContainerShadowMixin=dedupingMixin((superClass=>{class CrContainerShadowMixin extends superClass{constructor(){super(...arguments);this.intersectionObserver_=null;this.dropShadows_=new Map;this.intersectionProbes_=new Map;this.sides_=null}connectedCallback(){super.connectedCallback();const hasBottomShadow=this.getContainer_().hasAttribute("show-bottom-shadow");this.sides_=hasBottomShadow?[CrContainerShadowSide.TOP,CrContainerShadowSide.BOTTOM]:[CrContainerShadowSide.TOP];this.sides_.forEach((side=>{const shadow=document.createElement("div");shadow.id=`cr-container-shadow-${side}`;shadow.classList.add("cr-container-shadow");this.dropShadows_.set(side,shadow);this.intersectionProbes_.set(side,document.createElement("div"))}));this.getContainer_().parentNode.insertBefore(this.dropShadows_.get(CrContainerShadowSide.TOP),this.getContainer_());this.getContainer_().prepend(this.intersectionProbes_.get(CrContainerShadowSide.TOP));if(hasBottomShadow){this.getContainer_().parentNode.insertBefore(this.dropShadows_.get(CrContainerShadowSide.BOTTOM),this.getContainer_().nextSibling);this.getContainer_().append(this.intersectionProbes_.get(CrContainerShadowSide.BOTTOM))}this.enableShadowBehavior(true)}disconnectedCallback(){super.disconnectedCallback();this.enableShadowBehavior(false)}getContainer_(){return this.shadowRoot.querySelector("#container")}getIntersectionObserver_(){const callback=entries=>{for(const entry of entries){const target=entry.target;this.sides_.forEach((side=>{if(target===this.intersectionProbes_.get(side)){this.dropShadows_.get(side).classList.toggle("has-shadow",entry.intersectionRatio===0)}}))}};return new IntersectionObserver(callback,{root:this.getContainer_(),threshold:0})}enableShadowBehavior(enable){if(enable===!!this.intersectionObserver_){return}if(!enable){this.intersectionObserver_.disconnect();this.intersectionObserver_=null;return}this.intersectionObserver_=this.getIntersectionObserver_();window.setTimeout((()=>{if(this.intersectionObserver_){this.intersectionProbes_.forEach((probe=>{this.intersectionObserver_.observe(probe)}))}}))}showDropShadows(){assert$1(!this.intersectionObserver_);assert$1(this.sides_);for(const side of this.sides_){this.dropShadows_.get(side).classList.toggle("has-shadow",true)}}}return CrContainerShadowMixin}));function getTemplate$U(){return html`<!--_html_template_start_-->    <style include="cr-hidden-style cr-icons">dialog{--scroll-border-color:var(--paper-grey-300);--scroll-border:1px solid var(--scroll-border-color);background-color:var(--cr-dialog-background-color,#fff);border:0;border-radius:8px;bottom:50%;box-shadow:0 0 16px rgba(0,0,0,.12),0 16px 16px rgba(0,0,0,.24);color:inherit;max-height:initial;max-width:initial;overflow-y:hidden;padding:0;position:absolute;top:50%;width:var(--cr-dialog-width,512px)}@media (prefers-color-scheme:dark){dialog{--scroll-border-color:var(--google-grey-700);background-color:var(--cr-dialog-background-color,var(--google-grey-900));background-image:linear-gradient(rgba(255,255,255,.04),rgba(255,255,255,.04))}}@media (forced-colors:active){dialog{border:var(--cr-border-hcm)}}dialog[open] #content-wrapper{display:flex;flex-direction:column;max-height:100vh;overflow:auto}.top-container,:host ::slotted([slot=button-container]),:host ::slotted([slot=footer]){flex-shrink:0}dialog::backdrop{background-color:rgba(0,0,0,.6);bottom:0;left:0;position:fixed;right:0;top:0}:host ::slotted([slot=body]){color:var(--cr-secondary-text-color);padding:0 var(--cr-dialog-body-padding-horizontal,20px)}:host ::slotted([slot=title]){color:var(--cr-primary-text-color);flex:1;font-family:var(--cr-dialog-font-family,inherit);font-size:var(--cr-dialog-title-font-size,calc(15 / 13 * 100%));line-height:1;padding-bottom:var(--cr-dialog-title-slot-padding-bottom,16px);padding-inline-end:var(--cr-dialog-title-slot-padding-end,20px);padding-inline-start:var(--cr-dialog-title-slot-padding-start,20px);padding-top:var(--cr-dialog-title-slot-padding-top,20px)}:host ::slotted([slot=button-container]){display:flex;justify-content:flex-end;padding-bottom:var(--cr-dialog-button-container-padding-bottom,16px);padding-inline-end:var(--cr-dialog-button-container-padding-horizontal,16px);padding-inline-start:var(--cr-dialog-button-container-padding-horizontal,16px);padding-top:24px}:host ::slotted([slot=footer]){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;border-top:1px solid #dbdbdb;margin:0;padding:16px 20px}:host([hide-backdrop]) dialog::backdrop{opacity:0}@media (prefers-color-scheme:dark){:host ::slotted([slot=footer]){border-top-color:var(--cr-separator-color)}}.body-container{box-sizing:border-box;display:flex;flex-direction:column;min-height:1.375rem;overflow:auto}:host{--transparent-border:1px solid transparent}#cr-container-shadow-top{border-bottom:var(--cr-dialog-body-border-top,var(--transparent-border))}#cr-container-shadow-bottom{border-bottom:var(--cr-dialog-body-border-bottom,var(--transparent-border))}#cr-container-shadow-bottom.has-shadow,#cr-container-shadow-top.has-shadow{border-bottom:var(--scroll-border)}.top-container{align-items:flex-start;display:flex;min-height:var(--cr-dialog-top-container-min-height,31px)}.title-container{display:flex;flex:1;font-size:inherit;font-weight:inherit;margin:0;outline:0}#close{align-self:flex-start;margin-inline-end:4px;margin-top:4px}</style>
    <dialog id="dialog" on-close="onNativeDialogClose_" on-cancel="onNativeDialogCancel_" part="dialog" aria-labelledby="title" aria-describedby="container">
    
      <div id="content-wrapper" part="wrapper">
        <div class="top-container">
          <h2 id="title" class="title-container" tabindex="-1">
            <slot name="title"></slot>
          </h2>
          <cr-icon-button id="close" class="icon-clear" hidden$="[[!showCloseButton]]" aria-label$="[[closeText]]" on-click="cancel" on-keypress="onCloseKeypress_">
          </cr-icon-button>
        </div>
        <slot name="header"></slot>
        <div class="body-container" id="container" show-bottom-shadow part="body-container">
          <slot name="body"></slot>
        </div>
        <slot name="button-container"></slot>
        <slot name="footer"></slot>
      </div>
    </dialog>
<!--_html_template_end_-->`}
// Copyright 2016 The Chromium Authors
const CrDialogElementBase=CrContainerShadowMixin(PolymerElement);class CrDialogElement extends CrDialogElementBase{constructor(){super(...arguments);this.intersectionObserver_=null;this.mutationObserver_=null;this.boundKeydown_=null}static get is(){return"cr-dialog"}static get template(){return getTemplate$U()}static get properties(){return{open:{type:Boolean,value:false,reflectToAttribute:true},closeText:String,ignorePopstate:{type:Boolean,value:false},ignoreEnterKey:{type:Boolean,value:false},consumeKeydownEvent:{type:Boolean,value:false},noCancel:{type:Boolean,value:false},showCloseButton:{type:Boolean,value:false},showOnAttach:{type:Boolean,value:false}}}ready(){super.ready();window.addEventListener("popstate",(()=>{if(!this.ignorePopstate&&this.$.dialog.open){this.cancel()}}));if(!this.ignoreEnterKey){this.addEventListener("keypress",this.onKeypress_.bind(this))}this.addEventListener("pointerdown",(e=>this.onPointerdown_(e)))}connectedCallback(){super.connectedCallback();const mutationObserverCallback=()=>{if(this.$.dialog.open){this.enableShadowBehavior(true);this.addKeydownListener_()}else{this.enableShadowBehavior(false);this.removeKeydownListener_()}};this.mutationObserver_=new MutationObserver(mutationObserverCallback);this.mutationObserver_.observe(this.$.dialog,{attributes:true,attributeFilter:["open"]});mutationObserverCallback();if(this.showOnAttach){this.showModal()}}disconnectedCallback(){super.disconnectedCallback();this.removeKeydownListener_();if(this.mutationObserver_){this.mutationObserver_.disconnect();this.mutationObserver_=null}}addKeydownListener_(){if(!this.consumeKeydownEvent){return}this.boundKeydown_=this.boundKeydown_||this.onKeydown_.bind(this);this.addEventListener("keydown",this.boundKeydown_);document.body.addEventListener("keydown",this.boundKeydown_)}removeKeydownListener_(){if(!this.boundKeydown_){return}this.removeEventListener("keydown",this.boundKeydown_);document.body.removeEventListener("keydown",this.boundKeydown_);this.boundKeydown_=null}showModal(){this.$.dialog.showModal();assert$1(this.$.dialog.open);this.open=true;this.dispatchEvent(new CustomEvent("cr-dialog-open",{bubbles:true,composed:true}))}cancel(){this.dispatchEvent(new CustomEvent("cancel",{bubbles:true,composed:true}));this.$.dialog.close();assert$1(!this.$.dialog.open);this.open=false}close(){this.$.dialog.close("success");assert$1(!this.$.dialog.open);this.open=false}setTitleAriaLabel(title){this.$.dialog.removeAttribute("aria-labelledby");this.$.dialog.setAttribute("aria-label",title)}onCloseKeypress_(e){e.stopPropagation()}onNativeDialogClose_(e){if(e.target!==this.getNative()){return}this.dispatchEvent(new CustomEvent("close",{bubbles:true,composed:true}))}onNativeDialogCancel_(e){if(e.target!==this.getNative()){return}if(this.noCancel){e.preventDefault();return}this.open=false;this.dispatchEvent(new CustomEvent("cancel",{bubbles:true,composed:true}))}getNative(){return this.$.dialog}onKeypress_(e){if(e.key!=="Enter"){return}const accept=e.target===this||e.composedPath().some((el=>el.tagName==="CR-INPUT"&&el.type!=="search"));if(!accept){return}const actionButton=this.querySelector(".action-button:not([disabled]):not([hidden])");if(actionButton){actionButton.click();e.preventDefault()}}onKeydown_(e){assert$1(this.consumeKeydownEvent);if(!this.getNative().open){return}if(this.ignoreEnterKey&&e.key==="Enter"){return}e.stopPropagation()}onPointerdown_(e){if(e.button!==0||e.composedPath()[0].tagName!=="DIALOG"){return}this.$.dialog.animate([{transform:"scale(1)",offset:0},{transform:"scale(1.02)",offset:.4},{transform:"scale(1.02)",offset:.6},{transform:"scale(1)",offset:1}],{duration:180,easing:"ease-in-out",iterations:1});e.preventDefault()}focus(){const titleContainer=this.shadowRoot.querySelector(".title-container");assert$1(titleContainer);titleContainer.focus()}}customElements.define(CrDialogElement.is,CrDialogElement);const styleMod$8=document.createElement("dom-module");styleMod$8.appendChild(html`
  <template>
    <style>
.md-select{--md-arrow-width:10px;--md-select-bg-color:var(--google-grey-100);--md-select-focus-shadow-color:rgba(var(--google-blue-600-rgb), .4);--md-select-option-bg-color:white;--md-select-side-padding:8px;--md-select-text-color:var(--cr-primary-text-color);-webkit-appearance:none;background:url(chrome://resources/images/arrow_down.svg) calc(100% - var(--md-select-side-padding)) center no-repeat;background-color:var(--md-select-bg-color);background-size:var(--md-arrow-width);border:none;border-radius:4px;color:var(--md-select-text-color);cursor:pointer;font-family:inherit;font-size:inherit;line-height:inherit;max-width:100%;outline:0;padding-bottom:6px;padding-inline-end:calc(var(--md-select-side-padding) + var(--md-arrow-width) + 3px);padding-inline-start:var(--md-select-side-padding);padding-top:6px;width:var(--md-select-width,200px)}@media (prefers-color-scheme:dark){.md-select{--md-select-bg-color:rgba(0, 0, 0, .3);--md-select-focus-shadow-color:rgba(var(--google-blue-300-rgb), .5);--md-select-option-bg-color:var(--google-grey-900-white-4-percent);background-image:url(chrome://resources/images/dark/arrow_down.svg)}}.md-select :-webkit-any(option,optgroup){background-color:var(--md-select-option-bg-color)}.md-select[disabled]{opacity:var(--cr-disabled-opacity);pointer-events:none}.md-select:focus{box-shadow:0 0 0 2px var(--md-select-focus-shadow-color)}@media (forced-colors:active){.md-select:focus{outline:var(--cr-focus-outline-hcm)}}.md-select:active{box-shadow:none}:host-context([dir=rtl]) .md-select{background-position-x:var(--md-select-side-padding)}
    </style>
  </template>
`.content);styleMod$8.register("md-select");function getTemplate$T(){return html`<!--_html_template_start_--><style include="settings-shared md-select"></style>
<label class="cr-form-field-label">Container</label>
<select id="selectContainer"
    class="md-select"
    value="containerLabel_(containerId)"
    on-change="onSelectContainer_">
    <template is="dom-repeat" items="[[containers]]">
      <option value="[[item.id]]">
        [[containerLabel_(item.id)]]
      </option>
    </template>
</select>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
function equalContainerId(first,second){return first.vm_name===second.vm_name&&first.container_name===second.container_name}function containerLabel(id,defaultVmName){if(defaultVmName!==null&&id.vm_name===defaultVmName){return id.container_name}return id.vm_name+":"+id.container_name}class ContainerSelectElement extends PolymerElement{static get is(){return"settings-guest-os-container-select"}static get template(){return getTemplate$T()}static get properties(){return{selectedContainerId:{type:Object,notify:true},defaultVmName:{type:String,value:null},containers:{type:Array,value(){return[]}}}}onSelectContainer_(e){const index=cast(e.target,HTMLSelectElement).selectedIndex;if(index>=0&&index<this.containers.length){this.selectedContainerId=this.containers[index].id}}containerLabel_(id){return containerLabel(id,this.defaultVmName)}}customElements.define(ContainerSelectElement.is,ContainerSelectElement);function getTemplate$S(){return html`<!--_html_template_start_--><style include="settings-shared md-select">
  #selectDevice {
    width: 100%;
  }

  .custom-body {
    padding-bottom: 20px;
  }

  .custom-button-container {
    float: right;
  }

  .input-container {
    padding-bottom: 10px;
  }
</style>
<cr-dialog id="dialog" close-text="Close">
  <div slot="title">Add USB device</div>
  <div slot="body">
    <div class="input-container">
      <label class="cr-form-field-label">Device</label>
      <select id="selectDevice" class="md-select"
          disabled="[[!sharedUsbDevices.length]]">
        <template is="dom-if" if="[[!sharedUsbDevices.length]]" restamp>
          <option>Available USB devices will appear here.</option>
        </template>
        <template is="dom-repeat" items="[[sharedUsbDevices]]">
          <option value="[[item.device.guid]]">
            [[item.device.label]]
            [[[item.device.vendorId]]:[[item.device.productId]]]
          </option>
        </template>
      </select>
    </div>
    <template is="dom-if" if="[[showContainerSelect_(allContainers)]]" restamp>
      <settings-guest-os-container-select
          containers="[[allContainers]]"
          selected-container-id="{{guestId_}}"
          default-vm-name="[[defaultGuestId.vm_name]]">
      </settings-guest-os-container-select>
    </template>
  </div>
  <div slot="body" class="custom-body">
    <div slot="button-container" class="custom-button-container">
      <cr-button id="cancel" class="cancel-button" on-click="onCancelClick_">
        Cancel
      </cr-button>
      <cr-button id="continue" class="action-button"
          disabled="[[!sharedUsbDevices.length]]" on-click="onAddClick_">
        Add
      </cr-button>
    </div>
  </div>
</cr-dialog>
<template is="dom-if" if="[[reassignDevice_]]" restamp>
  <cr-dialog id="reassignDialog" close-text="Close"
      on-cancel="onReassignCancel_" show-on-attach>
    <div slot="title">
      Device in use
    </div>
    <div slot="body">
      [[getReassignDialogText_(reassignDevice_)]]
    </div>
    <div slot="button-container">
      <cr-button id="cancel" class="cancel-button" on-click="onReassignCancel_">
        Cancel
      </cr-button>
      <cr-button id="continue" class="action-button"
          on-click="onReassignContinueClick_">
        Continue
      </cr-button>
    </div>
  </cr-dialog>
</template>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
const GuestOsSharedUsbDevicesAddDialogElementBase=i16nMixin(PolymerElement);class GuestOsSharedUsbDevicesAddDialog extends GuestOsSharedUsbDevicesAddDialogElementBase{static get is(){return"settings-guest-os-shared-usb-devices-add-dialog"}static get template(){return getTemplate$S()}static get properties(){return{sharedUsbDevices:Array,defaultGuestId:{type:Object,value(){return{vm_name:"",container_name:""}}},guestId_:Object,allContainers:{type:Array,value:[]},reassignDevice_:{type:Object,value:null}}}constructor(){super();this.browserProxy_=GuestOsBrowserProxyImpl.getInstance()}connectedCallback(){super.connectedCallback();this.$.dialog.showModal();microTask.run((()=>{this.$.selectDevice.focus()}))}onCancelClick_(){this.$.dialog.close()}onAddClick_(){const sharedUsbDevice=this.sharedUsbDevices.find((({device:device})=>device.guid===this.$.selectDevice.value));const{device:device}=castExists(sharedUsbDevice);if(device.promptBeforeSharing){this.reassignDevice_=device;return}const guestId=this.guestId_||this.defaultGuestId;this.browserProxy_.setGuestOsUsbDeviceShared(guestId.vm_name,guestId.container_name,device.guid,true);this.$.dialog.close();recordSettingChange()}onReassignCancel_(){this.reassignDevice_=null}onReassignContinueClick_(){assertExists(this.reassignDevice_);const guestId=this.guestId_||this.defaultGuestId;this.browserProxy_.setGuestOsUsbDeviceShared(guestId.vm_name,guestId.container_name,this.reassignDevice_.guid,true);this.reassignDevice_=null;this.$.dialog.close();recordSettingChange()}getReassignDialogText_(device){return this.i16n("guestOsSharedUsbDevicesReassign",device.label)}showContainerSelect_(allContainers){return allContainers.length>1}}customElements.define(GuestOsSharedUsbDevicesAddDialog.is,GuestOsSharedUsbDevicesAddDialog);
// Copyright 2021 The Chromium Authors
const WebUiListenerMixin=dedupingMixin((superClass=>{class WebUiListenerMixin extends superClass{constructor(){super(...arguments);this.webUiListeners_=[]}addWebUiListener(eventName,callback){this.webUiListeners_.push(addWebUiListener(eventName,callback))}disconnectedCallback(){super.disconnectedCallback();while(this.webUiListeners_.length>0){removeWebUiListener(this.webUiListeners_.pop())}}}return WebUiListenerMixin}));function getTemplate$R(){return html`<!--_html_template_start_--><style include="settings-shared md-select">
  .toggle-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  #selectDevice {
    width: 100%;
  }
</style>
<div class="settings-box first">
  <div class="settings-box-text">
    [[getDescriptionText_()]]
    <div class="secondary" id="secondaryText">
      Only supported devices are shown.
    </div>
  </div>
</div>
<template is="dom-if" if="[[!hasContainers]]" restamp>
  <div class="settings-box secondary continuation"
      hidden="[[sharedUsbDevices_.length]]">
     Available USB devices will appear here.
  </div>
  <template is="dom-if" if="[[sharedUsbDevices_.length]]" restamp>
    <div class="list-frame vertical-list">
      <template is="dom-repeat" items="[[sharedUsbDevices_]]">
        <div class="list-item toggle-container">
          <div class="label">[[item.device.label]]</div>
          <cr-toggle class="toggle" checked="[[item.shared]]"
              on-change="onDeviceSharedChange_"
              aria-label$="[[item.device.label]]">
          </cr-toggle>
        </div>
      </template>
    </div>
  </template>
</template>

<template is="dom-if" if="[[hasContainers]]" restamp>
  <div id="addUsb" class="settings-box first">
    <div id="usbTableTitle" class="start"
        aria-hidden="true">
      USB devices
    </div>
    <cr-button id="addUsbBtn" on-click="onAddUsbClick_"
        aria-label="Add USB device"
        aria-describedby="addUsb">
      Add
    </cr-button>
  </div>
  <template is="dom-if" if="[[sharedUsbDevices_.length]]" restamp>
    <template is="dom-repeat" items="[[allContainers_]]"
        as="containerInfo" index-as="cidx" mutable-data>
      <template is="dom-if"
          if="[[showGuestId_(sharedUsbDevices_, containerInfo.id)]]" restamp>
        <h2 id="usbListContainerId[[cidx]]"
            hidden="[[!showGuestId_(sharedUsbDevices_, containerInfo.id)]]"
            class="settings-box usb-list-guest-id">
            [[guestLabel_(containerInfo.id)]]
        </h2>
        <div class="list-frame vertical-list usb-list-card"
            id="usbListCard[[cidx]]">
          <template is="dom-repeat" items="[[sharedUsbDevices_]]"
              filter="[[byGuestId_(containerInfo.id)]]" mutable-data>
            <div class="list-item">
              <div id="usbLabel[[cidx]]-[[index]]"
                  class="start usb-list-card-label" aria-hidden="true">
                [[item.device.label]]
              </div>
              <cr-icon-button id="removeUsb[[cidx]]-[[index]]"
                  class="icon-clear usb-list-card-remove" title="Remove"
                  on-click="onRemoveUsbClick_" data-guid$="[[item.device.guid]]"
                  aria-label="Remove"
                  aria-describedby$="usbLabel[[cidx]]-[[index]]">
              </cr-icon-button>
            </div>
          </template>
        </div>
      </template>
    </template>
  </template>
  <template is="dom-if"
      if="[[!hasSharedDevices_(sharedUsbDevices_, allContainers_)]]" restamp>
    <div class="settings-box secondary">
      No USB devices are attached.
    </div>
  </template>
</template>
<template is="dom-if" if="[[showAddUsbDialog_]]" restamp>
  <settings-guest-os-shared-usb-devices-add-dialog
      on-close="onAddUsbDialogClose_"
      shared-usb-devices="[[sharedUsbDevices_]]"
      all-containers="[[allContainers_]]"
      default-guest-id="[[defaultGuestId]]">
  </settings-guest-os-shared-usb-devices-add-dialog>
</template>
<template is="dom-if" if="[[reassignDevice_]]" restamp>
  <cr-dialog id="reassignDialog" close-text="Close"
      on-cancel="onReassignCancel_" show-on-attach>
    <div slot="title">
      Device in use
    </div>
    <div slot="body">
      [[getReassignDialogText_(reassignDevice_)]]
    </div>
    <div slot="button-container">
      <cr-button id="cancel" class="cancel-button"
          on-click="onReassignCancel_">
        Cancel
      </cr-button>
      <cr-button id="continue" class="action-button"
          on-click="onReassignContinueClick_">
        Continue
      </cr-button>
    </div>
  </cr-dialog>
</template>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
const SettingsGuestOsSharedUsbDevicesElementBase=i16nMixin(WebUiListenerMixin(PolymerElement));class SettingsGuestOsSharedUsbDevicesElement extends SettingsGuestOsSharedUsbDevicesElementBase{static get is(){return"settings-guest-os-shared-usb-devices"}static get template(){return getTemplate$R()}static get properties(){return{guestOsType:{type:String,value:""},sharedUsbDevices_:{type:Array,value(){return[]}},defaultGuestId:{type:Object,value(){return{vm_name:"",container_name:""}}},reassignDevice_:{type:Object,value:null},hasContainers:{type:Boolean,value(){return false}},showAddUsbDialog_:{type:Boolean,value:false},allContainers_:{type:Array,notify:true,value(){return[]}}}}constructor(){super();this.browserProxy_=GuestOsBrowserProxyImpl.getInstance()}ready(){super.ready();this.addWebUiListener("guest-os-shared-usb-devices-changed",this.onGuestOsSharedUsbDevicesChanged_.bind(this));this.browserProxy_.notifyGuestOsSharedUsbDevicesPageReady()}onContainerInfo_(containerInfos){this.set("allContainers_",containerInfos)}showGuestId_(sharedUsbDevices,id){return sharedUsbDevices.some(this.byGuestId_(id))}hasSharedDevices_(sharedUsbDevices,containerInfos){return sharedUsbDevices.some((dev=>containerInfos.some((info=>dev.device.guestId&&equalContainerId(dev.device.guestId,info.id)))))}onGuestOsSharedUsbDevicesChanged_(devices){this.sharedUsbDevices_=devices.map((device=>({shared:!!device.guestId&&device.guestId.vm_name===this.vmName_(),device:device})))}onDeviceSharedChange_(event){const device=event.model.item.device;const target=cast(event.target,CrToggleElement);if(target.checked&&device.promptBeforeSharing){target.checked=false;this.reassignDevice_=device;return}this.browserProxy_.setGuestOsUsbDeviceShared(this.vmName_(),this.defaultGuestId.container_name,device.guid,target.checked);recordSettingChange()}onReassignCancel_(){this.reassignDevice_=null}onReassignContinueClick_(){assertExists(this.reassignDevice_);this.browserProxy_.setGuestOsUsbDeviceShared(this.vmName_(),this.defaultGuestId.container_name,this.reassignDevice_.guid,true);this.reassignDevice_=null;recordSettingChange()}vmName_(){return getVMNameForGuestOsType(this.guestOsType)}getDescriptionText_(){return this.i16n(this.guestOsType+"SharedUsbDevicesDescription")}getReassignDialogText_(device){return this.i16n("guestOsSharedUsbDevicesReassign",device.label)}byGuestId_(id){return dev=>!!dev.device.guestId&&equalContainerId(dev.device.guestId,id)}onAddUsbClick_(){this.showAddUsbDialog_=true}onAddUsbDialogClose_(){this.showAddUsbDialog_=false}guestLabel_(id){return containerLabel(id,this.vmName_())}onRemoveUsbClick_(event){const device=event.model.item.device;if(device.guestId){this.browserProxy_.setGuestOsUsbDeviceShared(device.guestId.vm_name,"",device.guid,false)}}}customElements.define(SettingsGuestOsSharedUsbDevicesElement.is,SettingsGuestOsSharedUsbDevicesElement);function getTemplate$Q(){return html`<!--_html_template_start_--><style include="cr-shared-style">:host{--cr-localized-link-display:inline;display:block}:host([link-disabled]){cursor:pointer;opacity:var(--cr-disabled-opacity);pointer-events:none}a{display:var(--cr-localized-link-display)}a[href]{color:var(--cr-link-color)}a[is=action-link]{user-select:none}#container{display:contents}</style>

<div id="container"></div>
<!--_html_template_end_-->`}
// Copyright 2019 The Chromium Authors
class LocalizedLinkElement extends PolymerElement{static get is(){return"localized-link"}static get template(){return getTemplate$Q()}static get properties(){return{localizedString:String,linkUrl:{type:String,value:""},linkDisabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"updateAnchorTagTabIndex_"},containerInnerHTML_:{type:String,value:"",computed:"getAriaLabelledContent_(localizedString, linkUrl)",observer:"setContainerInnerHtml_"}}}getAriaLabelledContent_(localizedString,linkUrl){const tempEl=document.createElement("div");tempEl.innerHTML=sanitizeInnerHtml$1(localizedString,{attrs:["id"]});const ariaLabelledByIds=[];tempEl.childNodes.forEach(((node,index)=>{if(node.nodeType===Node.TEXT_NODE){const spanNode=document.createElement("span");spanNode.textContent=node.textContent;spanNode.id=`id${index}`;ariaLabelledByIds.push(spanNode.id);spanNode.setAttribute("aria-hidden","true");node.replaceWith(spanNode);return}if(node.nodeType===Node.ELEMENT_NODE&&node.nodeName==="A"){const element=node;element.id=`id${index}`;ariaLabelledByIds.push(element.id);return}assertNotReached$1("localized-link has invalid node types")}));const anchorTags=tempEl.querySelectorAll("a");if(anchorTags.length===0){return localizedString}assert$1(anchorTags.length===1,"localized-link should contain exactly one anchor tag");const anchorTag=anchorTags[0];anchorTag.setAttribute("aria-labelledby",ariaLabelledByIds.join(" "));anchorTag.tabIndex=this.linkDisabled?-1:0;if(linkUrl!==""){anchorTag.href=linkUrl;anchorTag.target="_blank"}return tempEl.innerHTML}setContainerInnerHtml_(){this.$.container.innerHTML=sanitizeInnerHtml$1(this.containerInnerHTML_,{attrs:["aria-hidden","aria-labelledby","id","tabindex"]});const anchorTag=this.shadowRoot.querySelector("a");if(anchorTag){anchorTag.addEventListener("click",(event=>this.onAnchorTagClick_(event)))}}onAnchorTagClick_(event){if(this.linkDisabled){event.preventDefault();return}this.dispatchEvent(new CustomEvent("link-clicked",{bubbles:true,composed:true,detail:{event:event}}));event.stopPropagation()}updateAnchorTagTabIndex_(){const anchorTag=this.shadowRoot.querySelector("a");if(!anchorTag){return}anchorTag.tabIndex=this.linkDisabled?-1:0}}customElements.define(LocalizedLinkElement.is,LocalizedLinkElement);
// Copyright 2022 The Chromium Authors
const DEEP_LINK_FOCUS_ID="deep-link-focus-id";const DeepLinkingMixin=dedupingMixin((superClass=>{class DeepLinkingMixinInternal extends superClass{static get properties(){return{Setting:{type:Object,value:Setting},supportedSettingIds:{type:Object,value:()=>new Set}}}getDeepLinkSettingId(){const settingIdStr=getSettingIdParameter();if(!settingIdStr){return null}const settingIdNum=Number(settingIdStr);if(isNaN(settingIdNum)){return null}return settingIdNum}showDeepLink(settingId){return new Promise((resolve=>{afterNextRender(this,(()=>{const elToFocus=this.shadowRoot.querySelector(`[${DEEP_LINK_FOCUS_ID}~="${settingId}"]`);if(!elToFocus||elToFocus.hidden){console.warn(`Element with deep link id ${settingId} not focusable.`);resolve({deepLinkShown:false,pendingSettingId:settingId});return}this.showDeepLinkElement(elToFocus);resolve({deepLinkShown:true,pendingSettingId:settingId})}))}))}showDeepLinkElement(elToFocus){elToFocus.focus()}beforeDeepLinkAttempt(_settingId){return true}attemptDeepLink(){const settingId=this.getDeepLinkSettingId();if(settingId===null||!this.supportedSettingIds.has(settingId)){return Promise.resolve({deepLinkShown:false,pendingSettingId:null})}const shouldContinue=this.beforeDeepLinkAttempt(settingId);if(!shouldContinue){return Promise.resolve({deepLinkShown:false,pendingSettingId:settingId})}return this.showDeepLink(settingId)}}return DeepLinkingMixinInternal}));
// Copyright 2014 The Chromium Authors
const ACTIVE_CLASS="focus-row-active";let FocusRow$1=class FocusRow{constructor(root,boundary,delegate){this.eventTracker=new EventTracker$1;this.root=root;this.boundary_=boundary||document.documentElement;this.delegate=delegate}static isFocusable(element){if(!element||element.disabled){return false}let current=element;while(true){assertInstanceof$1(current,Element);const style=window.getComputedStyle(current);if(style.visibility==="hidden"||style.display==="none"){return false}const parent=current.parentNode;if(!parent){return false}if(parent===current.ownerDocument||parent instanceof DocumentFragment){return true}current=parent}}static getFocusableElement(element){const withFocusable=element;if(withFocusable.getFocusableElement){return withFocusable.getFocusableElement()}return element}addItem(type,selectorOrElement){assert$1(type);let element;if(typeof selectorOrElement==="string"){element=this.root.querySelector(selectorOrElement)}else{element=selectorOrElement}if(!element){return false}element.setAttribute("focus-type",type);element.tabIndex=this.isActive()?0:-1;this.eventTracker.add(element,"blur",this.onBlur_.bind(this));this.eventTracker.add(element,"focus",this.onFocus_.bind(this));this.eventTracker.add(element,"keydown",this.onKeydown_.bind(this));this.eventTracker.add(element,"mousedown",this.onMousedown_.bind(this));return true}destroy(){this.eventTracker.removeAll()}getCustomEquivalent(_sampleElement){const focusable=this.getFirstFocusable();assert$1(focusable);return focusable}getElements(){return Array.from(this.root.querySelectorAll("[focus-type]")).map(FocusRow$1.getFocusableElement)}getEquivalentElement(sampleElement){if(this.getFocusableElements().indexOf(sampleElement)>=0){return sampleElement}const sampleFocusType=this.getTypeForElement(sampleElement);if(sampleFocusType){const sameType=this.getFirstFocusable(sampleFocusType);if(sameType){return sameType}}return this.getCustomEquivalent(sampleElement)}getFirstFocusable(type){const element=this.getFocusableElements().find((el=>!type||el.getAttribute("focus-type")===type));return element||null}getFocusableElements(){return this.getElements().filter(FocusRow$1.isFocusable)}getTypeForElement(element){return element.getAttribute("focus-type")||""}isActive(){return this.root.classList.contains(ACTIVE_CLASS)}makeActive(active){if(active===this.isActive()){return}this.getElements().forEach((function(element){element.tabIndex=active?0:-1}));this.root.classList.toggle(ACTIVE_CLASS,active)}onBlur_(e){if(!this.boundary_.contains(e.relatedTarget)){return}const currentTarget=e.currentTarget;if(this.getFocusableElements().indexOf(currentTarget)>=0){this.makeActive(false)}}onFocus_(e){if(this.delegate){this.delegate.onFocus(this,e)}}onMousedown_(e){if(e.button){return}const target=e.currentTarget;if(!target.disabled){target.tabIndex=0}}onKeydown_(e){const elements=this.getFocusableElements();const currentElement=FocusRow$1.getFocusableElement(e.currentTarget);const elementIndex=elements.indexOf(currentElement);assert$1(elementIndex>=0);if(this.delegate&&this.delegate.onKeydown(this,e)){return}const isShiftTab=!e.altKey&&!e.ctrlKey&&!e.metaKey&&e.shiftKey&&e.key==="Tab";if(hasKeyModifiers$1(e)&&!isShiftTab){return}let index=-1;let shouldStopPropagation=true;if(isShiftTab){index=elementIndex-1;if(index<0){return}}else if(e.key==="ArrowLeft"){index=elementIndex+(isRTL$1()?1:-1)}else if(e.key==="ArrowRight"){index=elementIndex+(isRTL$1()?-1:1)}else if(e.key==="Home"){index=0}else if(e.key==="End"){index=elements.length-1}else{shouldStopPropagation=false}const elementToFocus=elements[index];if(elementToFocus){this.getEquivalentElement(elementToFocus).focus();e.preventDefault()}if(shouldStopPropagation){e.stopPropagation()}}};function getTemplate$P(){return html`<!--_html_template_start_-->    <style>:host dialog{background-color:var(--cr-menu-background-color);border:none;border-radius:4px;box-shadow:var(--cr-menu-shadow);margin:0;min-width:128px;outline:0;padding:0;position:absolute}@media (forced-colors:active){:host dialog{border:var(--cr-border-hcm)}}:host dialog::backdrop{background-color:transparent}:host ::slotted(.dropdown-item){-webkit-tap-highlight-color:transparent;background:0 0;border:none;border-radius:0;box-sizing:border-box;color:var(--cr-primary-text-color);font:inherit;min-height:32px;padding:8px 24px;text-align:start;user-select:none;width:100%}:host ::slotted(.dropdown-item:not([hidden])){align-items:center;display:flex}:host ::slotted(.dropdown-item[disabled]){opacity:var(--cr-action-menu-disabled-item-opacity,.65)}:host ::slotted(.dropdown-item:not([disabled])){cursor:pointer}:host ::slotted(.dropdown-item:focus){background-color:var(--cr-menu-background-focus-color);outline:0}@media (forced-colors:active){:host ::slotted(.dropdown-item:focus){outline:var(--cr-focus-outline-hcm)}}.item-wrapper{background:var(--cr-menu-background-sheen);outline:0;padding:8px 0}</style>
    <dialog id="dialog" part="dialog" on-close="onNativeDialogClose_" role="application" aria-roledescription$="[[roleDescription]]">
      <div id="wrapper" class="item-wrapper" role="menu" tabindex="-1" aria-label$="[[accessibilityLabel]]">
        <slot id="contentNode"></slot>
      </div>
    </dialog>
<!--_html_template_end_-->`}
// Copyright 2016 The Chromium Authors
var AnchorAlignment;(function(AnchorAlignment){AnchorAlignment[AnchorAlignment["BEFORE_START"]=-2]="BEFORE_START";AnchorAlignment[AnchorAlignment["AFTER_START"]=-1]="AFTER_START";AnchorAlignment[AnchorAlignment["CENTER"]=0]="CENTER";AnchorAlignment[AnchorAlignment["BEFORE_END"]=1]="BEFORE_END";AnchorAlignment[AnchorAlignment["AFTER_END"]=2]="AFTER_END"})(AnchorAlignment||(AnchorAlignment={}));const DROPDOWN_ITEM_CLASS="dropdown-item";const SELECTABLE_DROPDOWN_ITEM_QUERY=`.${DROPDOWN_ITEM_CLASS}:not([hidden]):not([disabled])`;const AFTER_END_OFFSET=10;function getStartPointWithAnchor(start,end,menuLength,anchorAlignment,min,max){let startPoint=0;switch(anchorAlignment){case AnchorAlignment.BEFORE_START:startPoint=-menuLength;break;case AnchorAlignment.AFTER_START:startPoint=start;break;case AnchorAlignment.CENTER:startPoint=(start+end-menuLength)/2;break;case AnchorAlignment.BEFORE_END:startPoint=end-menuLength;break;case AnchorAlignment.AFTER_END:startPoint=end;break}if(startPoint+menuLength>max){startPoint=end-menuLength}if(startPoint<min){startPoint=start}startPoint=Math.max(min,Math.min(startPoint,max-menuLength));return startPoint}function getDefaultShowConfig(){return{top:0,left:0,height:0,width:0,anchorAlignmentX:AnchorAlignment.AFTER_START,anchorAlignmentY:AnchorAlignment.AFTER_START,minX:0,minY:0,maxX:0,maxY:0}}class CrActionMenuElement extends PolymerElement{constructor(){super(...arguments);this.boundClose_=null;this.contentObserver_=null;this.resizeObserver_=null;this.hasMousemoveListener_=false;this.anchorElement_=null;this.lastConfig_=null}static get is(){return"cr-action-menu"}static get template(){return getTemplate$P()}static get properties(){return{accessibilityLabel:String,autoReposition:{type:Boolean,value:false},open:{type:Boolean,notify:true,value:false},roleDescription:String}}ready(){super.ready();this.addEventListener("keydown",this.onKeyDown_.bind(this));this.addEventListener("mouseover",this.onMouseover_);this.addEventListener("click",this.onClick_)}disconnectedCallback(){super.disconnectedCallback();this.removeListeners_()}fire_(eventName,detail){this.dispatchEvent(new CustomEvent(eventName,{bubbles:true,composed:true,detail:detail}))}getDialog(){return this.$.dialog}removeListeners_(){window.removeEventListener("resize",this.boundClose_);window.removeEventListener("popstate",this.boundClose_);if(this.contentObserver_){this.contentObserver_.disconnect();this.contentObserver_=null}if(this.resizeObserver_){this.resizeObserver_.disconnect();this.resizeObserver_=null}}onNativeDialogClose_(e){if(e.target!==this.$.dialog){return}this.fire_("close")}onClick_(e){if(e.target===this){this.close();e.stopPropagation()}}onKeyDown_(e){e.stopPropagation();if(e.key==="Tab"||e.key==="Escape"){this.close();if(e.key==="Tab"){this.fire_("tabkeyclose",{shiftKey:e.shiftKey})}e.preventDefault();return}if(e.key!=="Enter"&&e.key!=="ArrowUp"&&e.key!=="ArrowDown"){return}const options=Array.from(this.querySelectorAll(SELECTABLE_DROPDOWN_ITEM_QUERY));if(options.length===0){return}const focused=getDeepActiveElement();const index=options.findIndex((option=>FocusRow$1.getFocusableElement(option)===focused));if(e.key==="Enter"){if(index!==-1){return}if(isWindows||isMac){this.close();e.preventDefault();return}}e.preventDefault();this.updateFocus_(options,index,e.key!=="ArrowUp");if(!this.hasMousemoveListener_){this.hasMousemoveListener_=true;this.addEventListener("mousemove",(e=>{this.onMouseover_(e);this.hasMousemoveListener_=false}),{once:true})}}onMouseover_(e){const item=e.composedPath().find((el=>el.matches&&el.matches(SELECTABLE_DROPDOWN_ITEM_QUERY)));(item||this.$.wrapper).focus()}updateFocus_(options,focusedIndex,next){const numOptions=options.length;assert$1(numOptions>0);let index;if(focusedIndex===-1){index=next?0:numOptions-1}else{const delta=next?1:-1;index=(numOptions+focusedIndex+delta)%numOptions}options[index].focus()}close(){this.removeListeners_();this.$.dialog.close();this.open=false;if(this.anchorElement_){assert$1(this.anchorElement_);focusWithoutInk$1(this.anchorElement_);this.anchorElement_=null}if(this.lastConfig_){this.lastConfig_=null}}showAt(anchorElement,config){this.anchorElement_=anchorElement;this.anchorElement_.scrollIntoViewIfNeeded();const rect=this.anchorElement_.getBoundingClientRect();let height=rect.height;if(config&&!config.noOffset&&config.anchorAlignmentY===AnchorAlignment.AFTER_END){height-=AFTER_END_OFFSET}this.showAtPosition(Object.assign({top:rect.top,left:rect.left,height:height,width:rect.width,anchorAlignmentX:AnchorAlignment.BEFORE_END},config));this.$.wrapper.focus()}showAtPosition(config){const doc=document.scrollingElement;const scrollLeft=doc.scrollLeft;const scrollTop=doc.scrollTop;this.resetStyle_();this.$.dialog.showModal();this.open=true;config.top+=scrollTop;config.left+=scrollLeft;this.positionDialog_(Object.assign({minX:scrollLeft,minY:scrollTop,maxX:scrollLeft+doc.clientWidth,maxY:scrollTop+doc.clientHeight},config));doc.scrollTop=scrollTop;doc.scrollLeft=scrollLeft;this.addListeners_();const openedByKey=FocusOutlineManager.forDocument(document).visible;if(openedByKey){const firstSelectableItem=this.querySelector(SELECTABLE_DROPDOWN_ITEM_QUERY);if(firstSelectableItem){requestAnimationFrame((()=>{firstSelectableItem.focus()}))}}}resetStyle_(){this.$.dialog.style.left="";this.$.dialog.style.right="";this.$.dialog.style.top="0"}positionDialog_(config){this.lastConfig_=config;const c=Object.assign(getDefaultShowConfig(),config);const top=c.top;const left=c.left;const bottom=top+c.height;const right=left+c.width;const rtl=getComputedStyle(this).direction==="rtl";if(rtl){c.anchorAlignmentX*=-1}const offsetWidth=this.$.dialog.offsetWidth;const menuLeft=getStartPointWithAnchor(left,right,offsetWidth,c.anchorAlignmentX,c.minX,c.maxX);if(rtl){const menuRight=document.scrollingElement.clientWidth-menuLeft-offsetWidth;this.$.dialog.style.right=menuRight+"px"}else{this.$.dialog.style.left=menuLeft+"px"}const menuTop=getStartPointWithAnchor(top,bottom,this.$.dialog.offsetHeight,c.anchorAlignmentY,c.minY,c.maxY);this.$.dialog.style.top=menuTop+"px"}addListeners_(){this.boundClose_=this.boundClose_||(()=>{if(this.$.dialog.open){this.close()}});window.addEventListener("resize",this.boundClose_);window.addEventListener("popstate",this.boundClose_);this.contentObserver_=new FlattenedNodesObserver(this.$.contentNode,(info=>{info.addedNodes.forEach((node=>{if(node.classList&&node.classList.contains(DROPDOWN_ITEM_CLASS)&&!node.getAttribute("role")){node.setAttribute("role","menuitem")}}))}));if(this.autoReposition){this.resizeObserver_=new ResizeObserver((()=>{if(this.lastConfig_){this.positionDialog_(this.lastConfig_);this.fire_("cr-action-menu-repositioned")}}));this.resizeObserver_.observe(this.$.dialog)}}}customElements.define(CrActionMenuElement.is,CrActionMenuElement);
// Copyright 2016 The Chromium Authors
class CrLazyRenderElement extends PolymerElement{constructor(){super(...arguments);this.child_=null;this.instance_=null}static get is(){return"cr-lazy-render"}static get template(){return html`<slot></slot>`}get(){if(!this.child_){this.render_()}assert$1(this.child_);return this.child_}getIfExists(){return this.child_}render_(){const template=this.shadowRoot.querySelector("slot").assignedNodes({flatten:true}).filter((n=>n.nodeType===Node.ELEMENT_NODE))[0];const TemplateClass=templatize(template,this,{mutableData:false,forwardHostProp:this._forwardHostPropV2});const parentNode=this.parentNode;if(parentNode&&!this.child_){this.instance_=new TemplateClass;this.child_=this.instance_.root.firstElementChild;parentNode.insertBefore(this.instance_.root,this)}}_forwardHostPropV2(prop,value){if(this.instance_){this.instance_.forwardHostProp(prop,value)}}}customElements.define(CrLazyRenderElement.is,CrLazyRenderElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`
    <style>
      :host {
        display: block;
        transition-duration: var(--iron-collapse-transition-duration, 300ms);
        /* Safari 10 needs this property prefixed to correctly apply the custom property */
        overflow: visible;
      }

      :host(.iron-collapse-closed) {
        display: none;
      }

      :host(:not(.iron-collapse-opened)) {
        overflow: hidden;
      }
    </style>

    <slot></slot>
`,is:"iron-collapse",behaviors:[IronResizableBehavior],properties:{horizontal:{type:Boolean,value:false,observer:"_horizontalChanged"},opened:{type:Boolean,value:false,notify:true,observer:"_openedChanged"},transitioning:{type:Boolean,notify:true,readOnly:true},noAnimation:{type:Boolean},_desiredSize:{type:String,value:""}},get dimension(){return this.horizontal?"width":"height"},get _dimensionMax(){return this.horizontal?"maxWidth":"maxHeight"},get _dimensionMaxCss(){return this.horizontal?"max-width":"max-height"},hostAttributes:{role:"group","aria-hidden":"true"},listeners:{transitionend:"_onTransitionEnd"},toggle:function(){this.opened=!this.opened},show:function(){this.opened=true},hide:function(){this.opened=false},updateSize:function(size,animated){size=size==="auto"?"":size;var willAnimate=animated&&!this.noAnimation&&this.isAttached&&this._desiredSize!==size;this._desiredSize=size;this._updateTransition(false);if(willAnimate){var startSize=this._calcSize();if(size===""){this.style[this._dimensionMax]="";size=this._calcSize()}this.style[this._dimensionMax]=startSize;this.scrollTop=this.scrollTop;this._updateTransition(true);willAnimate=size!==startSize}this.style[this._dimensionMax]=size;if(!willAnimate){this._transitionEnd()}},enableTransition:function(enabled){Base._warn("`enableTransition()` is deprecated, use `noAnimation` instead.");this.noAnimation=!enabled},_updateTransition:function(enabled){this.style.transitionDuration=enabled&&!this.noAnimation?"":"0s"},_horizontalChanged:function(){this.style.transitionProperty=this._dimensionMaxCss;var otherDimension=this._dimensionMax==="maxWidth"?"maxHeight":"maxWidth";this.style[otherDimension]="";this.updateSize(this.opened?"auto":"0px",false)},_openedChanged:function(){this.setAttribute("aria-hidden",!this.opened);this._setTransitioning(true);this.toggleClass("iron-collapse-closed",false);this.toggleClass("iron-collapse-opened",false);this.updateSize(this.opened?"auto":"0px",true);if(this.opened){this.focus()}},_transitionEnd:function(){this.style[this._dimensionMax]=this._desiredSize;this.toggleClass("iron-collapse-closed",!this.opened);this.toggleClass("iron-collapse-opened",this.opened);this._updateTransition(false);this.notifyResize();this._setTransitioning(false)},_onTransitionEnd:function(event){if(dom(event).rootTarget===this){this._transitionEnd()}},_calcSize:function(){return this.getBoundingClientRect()[this.dimension]+"px"}});function getTemplate$O(){return html`<!--_html_template_start_-->    <style>:host{--cr-toast-background:#323232;--cr-toast-button-color:var(--google-blue-300);--cr-toast-text-color:#fff}@media (prefers-color-scheme:dark){:host{--cr-toast-background:var(--google-grey-900) linear-gradient(rgba(255, 255, 255, .06), rgba(255, 255, 255, .06));--cr-toast-button-color:var(--google-blue-300);--cr-toast-text-color:var(--google-grey-200)}}:host{align-items:center;background:var(--cr-toast-background);border-radius:4px;bottom:0;box-shadow:0 2px 4px 0 rgba(0,0,0,.28);box-sizing:border-box;display:flex;margin:24px;max-width:568px;min-height:52px;min-width:288px;opacity:0;padding:0 24px;position:fixed;transform:translateY(100px);transition:opacity .3s,transform .3s;visibility:hidden;z-index:1}:host-context([dir=ltr]){left:0}:host-context([dir=rtl]){right:0}:host([open]){opacity:1;transform:translateY(0);visibility:visible}:host ::slotted(*){color:var(--cr-toast-text-color)}:host ::slotted(cr-button){background-color:transparent!important;border:none!important;color:var(--cr-toast-button-color)!important;margin-inline-start:32px!important;min-width:52px!important;padding:8px!important}:host ::slotted(cr-button:hover){background-color:transparent!important}</style>
    <slot></slot>
<!--_html_template_end_-->`}
// Copyright 2017 The Chromium Authors
class CrToastElement extends PolymerElement{constructor(){super(...arguments);this.hideTimeoutId_=null}static get is(){return"cr-toast"}static get template(){return getTemplate$O()}static get properties(){return{duration:{type:Number,value:0},open:{readOnly:true,type:Boolean,value:false,reflectToAttribute:true}}}static get observers(){return["resetAutoHide_(duration, open)"]}resetAutoHide_(){if(this.hideTimeoutId_!==null){window.clearTimeout(this.hideTimeoutId_);this.hideTimeoutId_=null}if(this.open&&this.duration!==0){this.hideTimeoutId_=window.setTimeout((()=>{this.hide()}),this.duration)}}show(){const shouldResetAutohide=this.open;this.removeAttribute("role");this.removeAttribute("aria-hidden");this._setOpen(true);this.setAttribute("role","alert");if(shouldResetAutohide){this.resetAutoHide_()}}hide(){this.setAttribute("aria-hidden","true");this._setOpen(false)}}customElements.define(CrToastElement.is,CrToastElement);const styleMod$7=document.createElement("dom-module");styleMod$7.appendChild(html`
  <template>
    <style>
[is=action-link]{cursor:pointer;display:inline-block;text-decoration:underline}[is=action-link],[is=action-link]:active,[is=action-link]:hover,[is=action-link]:visited{color:var(--cr-link-color)}[is=action-link][disabled]{color:var(--paper-grey-600);cursor:default;opacity:.65;pointer-events:none}[is=action-link].no-outline{outline:0}
    </style>
  </template>
`.content);styleMod$7.register("action-link");function getTemplate$N(){return html`<!--_html_template_start_-->    <style include="cr-hidden-style"></style>
    <cr-tooltip-icon id="tooltipIcon" hidden$="[[!indicatorVisible]]" tooltip-text="[[indicatorTooltip]]" icon-class="[[indicatorIcon]]" icon-aria-label="[[iconAriaLabel]]" exportparts="tooltip">
    </cr-tooltip-icon>
<!--_html_template_end_-->`}
// Copyright 2015 The Chromium Authors
const CrPolicyPrefIndicatorElementBase=CrPolicyIndicatorMixin(PolymerElement);class CrPolicyPrefIndicatorElement extends CrPolicyPrefIndicatorElementBase{static get is(){return"cr-policy-pref-indicator"}static get template(){return getTemplate$N()}static get properties(){return{iconAriaLabel:String,indicatorType:{type:String,value:CrPolicyIndicatorType$1.NONE,computed:"getIndicatorTypeForPref_(pref.*, associatedValue)"},indicatorTooltip:{type:String,computed:"getIndicatorTooltipForPref_(indicatorType, pref.*)"},pref:Object,associatedValue:Object}}getIndicatorTypeForPref_(){assert$1(this.pref);const{enforcement:enforcement,userSelectableValues:userSelectableValues,controlledBy:controlledBy,recommendedValue:recommendedValue}=this.pref;if(enforcement===chrome.settingsPrivate.Enforcement.RECOMMENDED){if(this.associatedValue!==undefined&&this.associatedValue!==recommendedValue){return CrPolicyIndicatorType$1.NONE}return CrPolicyIndicatorType$1.RECOMMENDED}if(enforcement===chrome.settingsPrivate.Enforcement.ENFORCED){if(userSelectableValues!==undefined){if(recommendedValue&&this.associatedValue===recommendedValue){return CrPolicyIndicatorType$1.RECOMMENDED}else if(userSelectableValues.includes(this.associatedValue)){return CrPolicyIndicatorType$1.NONE}}switch(controlledBy){case chrome.settingsPrivate.ControlledBy.EXTENSION:return CrPolicyIndicatorType$1.EXTENSION;case chrome.settingsPrivate.ControlledBy.PRIMARY_USER:return CrPolicyIndicatorType$1.PRIMARY_USER;case chrome.settingsPrivate.ControlledBy.OWNER:return CrPolicyIndicatorType$1.OWNER;case chrome.settingsPrivate.ControlledBy.USER_POLICY:return CrPolicyIndicatorType$1.USER_POLICY;case chrome.settingsPrivate.ControlledBy.DEVICE_POLICY:return CrPolicyIndicatorType$1.DEVICE_POLICY;case chrome.settingsPrivate.ControlledBy.PARENT:return CrPolicyIndicatorType$1.PARENT;case chrome.settingsPrivate.ControlledBy.CHILD_RESTRICTION:return CrPolicyIndicatorType$1.CHILD_RESTRICTION}}if(enforcement===chrome.settingsPrivate.Enforcement.PARENT_SUPERVISED){return CrPolicyIndicatorType$1.PARENT}return CrPolicyIndicatorType$1.NONE}getIndicatorTooltipForPref_(){if(!this.pref){return""}const matches=this.pref&&this.pref.value===this.pref.recommendedValue;return this.getIndicatorTooltip(this.indicatorType,this.pref.controlledByName||"",matches)}getFocusableElement(){return this.$.tooltipIcon.getFocusableElement()}}customElements.define(CrPolicyPrefIndicatorElement.is,CrPolicyPrefIndicatorElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const template$4=html`
/* Most common used flex styles*/
<dom-module id="iron-flex">
  <template>
    <style>
      .layout.horizontal,
      .layout.vertical {
        display: flex;
      }

      .layout.inline {
        display: inline-flex;
      }

      .layout.horizontal {
        flex-direction: row;
      }

      .layout.vertical {
        flex-direction: column;
      }

      .layout.wrap {
        flex-wrap: wrap;
      }

      .layout.no-wrap {
        flex-wrap: nowrap;
      }

      .layout.center,
      .layout.center-center {
        align-items: center;
      }

      .layout.center-justified,
      .layout.center-center {
        justify-content: center;
      }

      .flex {
        flex: 1;
        flex-basis: 0.000000001px;
      }

      .flex-auto {
        flex: 1 1 auto;
      }

      .flex-none {
        flex: none;
      }
    </style>
  </template>
</dom-module>
/* Basic flexbox reverse styles */
<dom-module id="iron-flex-reverse">
  <template>
    <style>
      .layout.horizontal-reverse,
      .layout.vertical-reverse {
        display: flex;
      }

      .layout.horizontal-reverse {
        flex-direction: row-reverse;
      }

      .layout.vertical-reverse {
        flex-direction: column-reverse;
      }

      .layout.wrap-reverse {
        flex-wrap: wrap-reverse;
      }
    </style>
  </template>
</dom-module>
/* Flexbox alignment */
<dom-module id="iron-flex-alignment">
  <template>
    <style>
      /**
       * Alignment in cross axis.
       */
      .layout.start {
        align-items: flex-start;
      }

      .layout.center,
      .layout.center-center {
        align-items: center;
      }

      .layout.end {
        align-items: flex-end;
      }

      .layout.baseline {
        align-items: baseline;
      }

      /**
       * Alignment in main axis.
       */
      .layout.start-justified {
        justify-content: flex-start;
      }

      .layout.center-justified,
      .layout.center-center {
        justify-content: center;
      }

      .layout.end-justified {
        justify-content: flex-end;
      }

      .layout.around-justified {
        justify-content: space-around;
      }

      .layout.justified {
        justify-content: space-between;
      }

      /**
       * Self alignment.
       */
      .self-start {
        align-self: flex-start;
      }

      .self-center {
        align-self: center;
      }

      .self-end {
        align-self: flex-end;
      }

      .self-stretch {
        align-self: stretch;
      }

      .self-baseline {
        align-self: baseline;
      }

      /**
       * multi-line alignment in main axis.
       */
      .layout.start-aligned {
        align-content: flex-start;
      }

      .layout.end-aligned {
        align-content: flex-end;
      }

      .layout.center-aligned {
        align-content: center;
      }

      .layout.between-aligned {
        align-content: space-between;
      }

      .layout.around-aligned {
        align-content: space-around;
      }
    </style>
  </template>
</dom-module>
/* Non-flexbox positioning helper styles */
<dom-module id="iron-flex-factors">
  <template>
    <style>
      .flex,
      .flex-1 {
        flex: 1;
        flex-basis: 0.000000001px;
      }

      .flex-2 {
        flex: 2;
      }

      .flex-3 {
        flex: 3;
      }

      .flex-4 {
        flex: 4;
      }

      .flex-5 {
        flex: 5;
      }

      .flex-6 {
        flex: 6;
      }

      .flex-7 {
        flex: 7;
      }

      .flex-8 {
        flex: 8;
      }

      .flex-9 {
        flex: 9;
      }

      .flex-10 {
        flex: 10;
      }

      .flex-11 {
        flex: 11;
      }

      .flex-12 {
        flex: 12;
      }
    </style>
  </template>
</dom-module>
<dom-module id="iron-positioning">
  <template>
    <style>
      .block {
        display: block;
      }

      [hidden] {
        display: none !important;
      }

      .invisible {
        visibility: hidden !important;
      }

      .relative {
        position: relative;
      }

      .fit {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      body.fullbleed {
        margin: 0;
        height: 100vh;
      }

      .scroll {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      }

      /* fixed position */
      .fixed-bottom,
      .fixed-left,
      .fixed-right,
      .fixed-top {
        position: fixed;
      }

      .fixed-top {
        top: 0;
        left: 0;
        right: 0;
      }

      .fixed-right {
        top: 0;
        right: 0;
        bottom: 0;
      }

      .fixed-bottom {
        right: 0;
        bottom: 0;
        left: 0;
      }

      .fixed-left {
        top: 0;
        bottom: 0;
        left: 0;
      }
    </style>
  </template>
</dom-module>
`;template$4.setAttribute("style","display: none;");document.head.appendChild(template$4.content);
// Copyright 2015 The Chromium Authors
const CrPolicyPrefMixin=dedupingMixin((superClass=>{class CrPolicyPrefMixin extends superClass{static get properties(){return{noExtensionIndicator:Boolean,pref:Object}}isPrefEnforced(){return!!this.pref&&this.pref.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED}hasPrefPolicyIndicator(){if(!this.pref){return false}if(this.noExtensionIndicator&&this.pref.controlledBy===chrome.settingsPrivate.ControlledBy.EXTENSION){return false}return this.isPrefEnforced()||this.pref.enforcement===chrome.settingsPrivate.Enforcement.RECOMMENDED}}return CrPolicyPrefMixin}));
// Copyright 2016 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class PromiseResolver{constructor(){this.resolve_=()=>{};this.reject_=()=>{};this.isFulfilled_=false;this.promise_=new Promise(((resolve,reject)=>{this.resolve_=resolution=>{resolve(resolution);this.isFulfilled_=true};this.reject_=reason=>{reject(reason);this.isFulfilled_=true}}))}get isFulfilled(){return this.isFulfilled_}get promise(){return this.promise_}get resolve(){return this.resolve_}get reject(){return this.reject_}}
// Copyright 2015 The Chromium Authors
class CrSettingsPrefsInternal{constructor(){this.isInitialized=false;this.initializedResolver_=new PromiseResolver;this.deferInitialization=false}get initialized(){return this.initializedResolver_.promise}setInitialized(){this.isInitialized=true;this.initializedResolver_.resolve()}resetForTesting(){this.isInitialized=false;this.initializedResolver_=new PromiseResolver}}const CrSettingsPrefs=new CrSettingsPrefsInternal;
// Copyright 2016 The Chromium Authors
const PrefControlMixin=dedupingMixin((superClass=>{class PrefControlMixin extends superClass{static get properties(){return{pref:{type:Object,notify:true,observer:"validatePref_"}}}connectedCallback(){super.connectedCallback();this.validatePref_()}validatePref_(){CrSettingsPrefs.initialized.then((()=>{if(this.pref===undefined){console.error(this.getErrorInfo("not found"))}else if(typeof this.pref==="string"){console.error(this.getErrorInfo("incorrect type string"))}else if(this.pref.enforcement===chrome.settingsPrivate.Enforcement.PARENT_SUPERVISED){console.error("PARENT_SUPERVISED is not enforced by pref controls")}}))}getErrorInfo(message){let error=`Pref error [${message}] for element ${this.tagName}`;if(this.id){error+=`#${this.id}`}error+=` in ${this.getRootNode().host.tagName}`;return error}}return PrefControlMixin}));
// Copyright 2016 The Chromium Authors
const DEFAULT_UNCHECKED_VALUE=0;const DEFAULT_CHECKED_VALUE=1;const SettingsBooleanControlMixin=dedupingMixin((superClass=>{const superClassBase=CrPolicyPrefMixin(PrefControlMixin(superClass));class SettingsBooleanControlMixin extends superClassBase{static get properties(){return{inverted:{type:Boolean,value:false},checked:{type:Boolean,value:false,notify:true,reflectToAttribute:true},disabled:{type:Boolean,value:false,notify:true,reflectToAttribute:true},noSetPref:{type:Boolean,value:false},label:{type:String,value:""},subLabel:{type:String,value:""},numericUncheckedValue:{type:Number,value:DEFAULT_UNCHECKED_VALUE,reflectToAttribute:true},numericCheckedValue:{type:Number,value:DEFAULT_CHECKED_VALUE,reflectToAttribute:true}}}static get observers(){return["prefValueChanged_(pref.value)"]}notifyChangedByUserInteraction(){this.dispatchEvent(new CustomEvent("settings-boolean-control-change",{bubbles:true,composed:true}));if(!this.pref||this.noSetPref){return}this.sendPrefChange()}resetToPrefValue(){if(this.pref===undefined){this.checked=false;return}this.checked=this.getNewValue_(this.pref.value)}sendPrefChange(){if(this.pref.type===chrome.settingsPrivate.PrefType.NUMBER){assert$1(!this.inverted);this.set("pref.value",this.checked?this.numericCheckedValue:this.numericUncheckedValue);return}this.set("pref.value",this.inverted?!this.checked:this.checked)}prefValueChanged_(prefValue){this.checked=this.getNewValue_(prefValue)}getNewValue_(value){if(this.pref.type===chrome.settingsPrivate.PrefType.NUMBER){assert$1(!this.inverted);return value!==this.numericUncheckedValue}return this.inverted?!value:!!value}controlDisabled(){return this.disabled||this.isPrefEnforced()||!!(this.pref&&this.pref.userControlDisabled)}}return SettingsBooleanControlMixin}));function getTemplate$M(){return html`<!--_html_template_start_--><style


  include="cr-shared-style cr-actionable-row-style iron-flex action-link cros-color-overrides"

>
  :host {
    --cr-icon-button-margin-end: 20px;
    padding: 0 var(--cr-section-padding);
  }

  :host([elide-label]),
  :host([elide-label]) #outerRow,
  :host([elide-label]) #outerRow > div.flex {
    min-width: 0;
  }

  :host([elide-label]) .label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #outerRow {
    align-items: center;
    display: flex;
    min-height: var(--cr-section-two-line-min-height);
    width: 100%;
  }

  #outerRow[noSubLabel] {
    min-height: var(--cr-section-min-height);
  }


  #icon {
    margin-inline-end: var(--cr-icon-button-margin-end);
  }


  #labelWrapper {
    padding: var(--cr-section-vertical-padding) 0;
  }

  #labelWrapper,
  ::slotted([slot='more-actions']) {
    margin-inline-end: 20px !important;
  }

  cr-policy-pref-indicator {
    margin-inline-end: var(--cr-controlled-by-spacing);
  }

  /* Style #learn-more or other links that can appear within
     #sub-label-text-with-link. */
  a {
    color: var(--cr-link-color);
  }
</style>
<div id="outerRow" noSubLabel$="[[!subLabel]]">
  
    <template is="dom-if" if="[[icon]]">
      <span id="icon" aria-hidden="true">
        <iron-icon slot="icon" icon="[[icon]]">
        </iron-icon>
      </span>
    </template>
  
  <div class="flex" id="labelWrapper" hidden$="[[!label]]">
    <div class="label" aria-hidden="[[!ariaShowLabel]]">[[label]]</div>
    <div class="cr-secondary-text label" id="sub-label">
      <template is="dom-if" if="[[subLabelIcon]]">
        <span id="sub-label-icon" aria-hidden="true">
          <iron-icon slot="icon" icon="[[subLabelIcon]]">
          </iron-icon>
        </span>
      </template>
      <span id="sub-label-text" aria-hidden="[[!ariaShowSublabel]]">
        [[subLabel]]
      </span>
      <template is="dom-if" if="[[learnMoreUrl]]">
        <a id="learn-more" href="[[learnMoreUrl]]" target="_blank"
            aria-labelledby="sub-label-text learn-more"
            on-click="onLearnMoreClick_">
          Learn more
        </a>
      </template>
      <template is="dom-if" if="[[subLabelWithLink]]">
        <div id="sub-label-text-with-link"
            inner-h-t-m-l="[[getSubLabelWithLinkContent_(subLabelWithLink)]]"
            on-click="onSubLabelTextWithLinkClick_">
        </div>
      </template>
    </div>
  </div>
  <slot name="more-actions"></slot>
  <template is="dom-if" if="[[hasPrefPolicyIndicator(pref.*)]]">
    <cr-policy-pref-indicator pref="[[pref]]" icon-aria-label="[[label]]">
    </cr-policy-pref-indicator>
  </template>
  <cr-toggle id="control" checked="{{checked}}"
      on-change="onChange_"
      aria-label$="[[getAriaLabel_(label, ariaLabel)]]"
      aria-describedby="sub-label-text"
      disabled="[[controlDisabled(disabled, pref)]]">
  </cr-toggle>
</div>
<!--_html_template_end_-->`}
// Copyright 2016 The Chromium Authors
const SettingsToggleButtonElementBase=SettingsBooleanControlMixin(PolymerElement);class SettingsToggleButtonElement extends SettingsToggleButtonElementBase{static get is(){return"settings-toggle-button"}static get template(){return getTemplate$M()}static get properties(){return{ariaLabel:{type:String,reflectToAttribute:false,observer:"onAriaLabelSet_",value:""},ariaShowLabel:{type:Boolean,reflectToAttribute:true,value:false},ariaShowSublabel:{type:Boolean,reflectToAttribute:true,value:false},elideLabel:{type:Boolean,reflectToAttribute:true},learnMoreUrl:{type:String,reflectToAttribute:true},subLabelWithLink:{type:String,reflectToAttribute:true},icon:String,subLabelIcon:String}}static get observers(){return["onDisableOrPrefChange_(disabled, pref.*)"]}ready(){super.ready();this.addEventListener("click",this.onHostClick_)}fire_(eventName,detail){this.dispatchEvent(new CustomEvent(eventName,{detail:detail,bubbles:true,composed:true}))}focus(){this.$.control.focus()}onAriaLabelSet_(){if(this.hasAttribute("aria-label")){const ariaLabel=this.ariaLabel;this.removeAttribute("aria-label");this.ariaLabel=ariaLabel}}getAriaLabel_(){return this.ariaLabel||this.label}onDisableOrPrefChange_(){this.toggleAttribute("effectively-disabled_",this.controlDisabled())}onHostClick_(e){e.stopPropagation();if(this.controlDisabled()){return}this.checked=!this.checked;this.notifyChangedByUserInteraction();this.fire_("change")}onLearnMoreClick_(e){e.stopPropagation();this.fire_("learn-more-clicked")}getSubLabelWithLinkContent_(contents){return sanitizeInnerHtml$1(contents,{attrs:["id","is","aria-hidden","aria-label","aria-labelledby","tabindex"]})}onSubLabelTextWithLinkClick_(e){const target=e.target;if(target.tagName==="A"){this.fire_("sub-label-link-clicked",target.id);e.preventDefault();e.stopPropagation()}}onChange_(e){this.checked=e.detail;this.notifyChangedByUserInteraction()}}customElements.define(SettingsToggleButtonElement.is,SettingsToggleButtonElement);function getTemplate$L(){return html`<!--_html_template_start_--><style>
  :host {
    display: flex;
    flex-direction: column;
    outline: none;
    position: relative;
  }

  #header .title {
    color: var(--cr-primary-text-color);
    font-size: 108%;
    font-weight: 400;
    letter-spacing: .25px;
    margin-bottom: 12px;
    margin-top: var(--cr-section-vertical-margin);
    outline: none;
    padding-bottom: 4px;
    padding-top: 8px;
  }

  :host(:not(.expanded)) #card {
    background-color: var(--cr-card-background-color);
    border-radius: var(--cr-card-border-radius);
    box-shadow: var(--cr-card-shadow);
    flex: 1;
    overflow: hidden;
  }

  :host-context(body.jelly-enabled):host(:not(.expanded)) #card {
    background-color: var(--cros-sys-app_base);
  }

  @media (forced-colors: active) {
    /* Use border instead of box-shadow (which does not work) in Windows
       HCM. */
    :host(:not(.expanded)) #card {
      border: var(--cr-border-hcm);
    }
  }

  :host(.expanded) #header,
  :host([hidden-by-search]) {
    display: none;
  }
</style>
<div id="header">
  <h2 class="title" tabindex="-1"
      aria-hidden$="[[getTitleHiddenStatus_(pageTitle)]]">[[pageTitle]]</h2>
</div>
<div id="card">
  <slot></slot>
</div>
<!--_html_template_end_-->`}
// Copyright 2015 The Chromium Authors
class OsSettingsSectionElement extends PolymerElement{static get is(){return"os-settings-section"}static get template(){return getTemplate$L()}static get properties(){return{section:String,pageTitle:{type:String,value:""},hiddenBySearch:{type:Boolean,value:false,reflectToAttribute:true}}}getTitleHiddenStatus_(){return this.pageTitle?false:"true"}focus(){this.shadowRoot.querySelector(".title").focus()}}customElements.define(OsSettingsSectionElement.is,OsSettingsSectionElement);const styleMod$6=document.createElement("dom-module");styleMod$6.appendChild(html`
  <template>
    <style>

:host(.showing-subpage) os-settings-section:not(.expanded) {
  display: none;
}

:host > div > :not(.expanded) {
  /* The margin and padding here are doing two things: make the total
   * separation 24px; and make scrollIntoView align the section header
   * with the top item in the side nav menu. Both things are desired
   * by Alan (bettes@). */
  margin-bottom: 3px;
}

.expanded {
  min-height: 100%;
}
    </style>
  </template>
`.content);styleMod$6.register("os-settings-page-styles");
// Copyright 2015 The Chromium Authors
const PrefsMixin=dedupingMixin((superClass=>{class PrefsMixin extends superClass{static get properties(){return{prefs:{type:Object,notify:true}}}getPref(prefPath){const pref=this.get(prefPath,this.prefs);assert$1(typeof pref!=="undefined","Pref is missing: "+prefPath);return pref}setPrefValue(prefPath,value){this.getPref(prefPath);this.set("prefs."+prefPath+".value",value)}appendPrefListItem(key,item){const pref=this.getPref(key);assert$1(pref&&pref.type===chrome.settingsPrivate.PrefType.LIST);if(pref.value.indexOf(item)===-1){this.push("prefs."+key+".value",item)}}updatePrefListItem(key,item,newItem){const pref=this.getPref(key);assert$1(pref&&pref.type===chrome.settingsPrivate.PrefType.LIST);const index=pref.value.indexOf(item);if(index!==-1){this.set(`prefs.${key}.value.${index}`,newItem)}}deletePrefListItem(key,item){assert$1(this.getPref(key).type===chrome.settingsPrivate.PrefType.LIST);const index=this.getPref(key).value.indexOf(item);if(index!==-1){this.splice(`prefs.${key}.value`,index,1)}}}return PrefsMixin}));const styleMod$5=document.createElement("dom-module");styleMod$5.appendChild(html`
  <template>
    <style>
:host{align-items:center;align-self:stretch;display:flex;margin:0;outline:0}:host(:not([effectively-disabled_])){cursor:pointer}:host(:not([no-hover],[effectively-disabled_]):hover){background-color:var(--cr-hover-background-color)}:host(:not([no-hover],[effectively-disabled_]):active){background-color:var(--cr-active-background-color)}:host(:not([no-hover],[effectively-disabled_])) cr-icon-button{--cr-icon-button-hover-background-color:transparent;--cr-icon-button-active-background-color:transparent}
    </style>
  </template>
`.content);styleMod$5.register("cr-actionable-row-style");function getTemplate$K(){return html`<!--_html_template_start_--><style include="cr-actionable-row-style cr-shared-style cr-hidden-style">:host{box-sizing:border-box;flex:1;font-family:inherit;font-size:100%;line-height:154%;min-height:var(--cr-section-min-height);padding:0}:host(:not([embedded])){padding:0 var(--cr-section-padding)}#startIcon{--iron-icon-fill-color:var(--cr-link-row-start-icon-color,
        var(--google-grey-700));display:flex;flex-shrink:0;padding-inline-end:var(--cr-icon-button-margin-start);width:var(--cr-link-row-icon-width,var(--cr-icon-size))}@media (prefers-color-scheme:dark){#startIcon{--iron-icon-fill-color:var(--cr-link-row-start-icon-color,
          var(--google-grey-500))}}#labelWrapper{flex:1;flex-basis:.000000001px;padding-bottom:var(--cr-section-vertical-padding);padding-top:var(--cr-section-vertical-padding);text-align:start}#label,#subLabel{display:flex}#buttonAriaDescription{clip:rect(0,0,0,0);display:block;position:fixed}</style>
<iron-icon id="startIcon" icon="[[startIcon]]" hidden="[[!startIcon]]" aria-hidden="true">
</iron-icon>
<div id="labelWrapper" hidden="[[hideLabelWrapper_]]">
  <div id="label" aria-hidden="[[!ariaShowLabel]]">
    [[label]]
    <slot name="label"></slot>
  </div>
  <div id="subLabel" class="cr-secondary-text" aria-hidden="[[!ariaShowSublabel]]">
    [[subLabel]]
    <slot name="sub-label"></slot>
  </div>
</div>
<slot></slot>
<div id="buttonAriaDescription" aria-hidden="true">
  [[computeButtonAriaDescription_(external, buttonAriaDescription)]]
</div>
<cr-icon-button id="icon" iron-icon="[[getIcon_(external)]]" role="link" part="icon" aria-roledescription$="[[roleDescription]]" aria-describedby="buttonAriaDescription" aria-labelledby="label subLabel" disabled="[[disabled]]">
</cr-icon-button>
<!--_html_template_end_-->`}
// Copyright 2017 The Chromium Authors
class CrLinkRowElement extends PolymerElement{static get is(){return"cr-link-row"}static get template(){return getTemplate$K()}static get properties(){return{ariaShowLabel:{type:Boolean,reflectToAttribute:true,value:false},ariaShowSublabel:{type:Boolean,reflectToAttribute:true,value:false},startIcon:{type:String,value:""},label:{type:String,value:""},subLabel:{type:String,value:""},disabled:{type:Boolean,reflectToAttribute:true},external:{type:Boolean,value:false},usingSlottedLabel:{type:Boolean,value:false},roleDescription:String,buttonAriaDescription:String,hideLabelWrapper_:{type:Boolean,computed:"computeHideLabelWrapper_(label, usingSlottedLabel)"}}}focus(){this.$.icon.focus()}computeHideLabelWrapper_(){return!(this.label||this.usingSlottedLabel)}getIcon_(){return this.external?"cr:open-in-new":"cr:arrow-right"}computeButtonAriaDescription_(external,buttonAriaDescription){return buttonAriaDescription??(external?loadTimeData.getString("opensInNewTab"):"")}}customElements.define(CrLinkRowElement.is,CrLinkRowElement);function getTemplate$J(){return html`<!--_html_template_start_-->    <style include="cr-hidden-style">:host{--cr-slider-active-color:var(--google-blue-600);--cr-slider-container-color:rgba(var(--google-blue-600-rgb), .24);--cr-slider-container-disabled-color:rgba(var(--google-grey-600-rgb), .24);--cr-slider-disabled-color:var(--google-grey-600);--cr-slider-knob-color-rgb:var(--google-blue-600-rgb);--cr-slider-knob-disabled-color:white;--cr-slider-marker-active-color:rgba(255, 255, 255, .54);--cr-slider-marker-color:rgba(26, 115, 232, .54);--cr-slider-marker-disabled-color:rgba(128, 134, 139, .54);--cr-slider-position-transition:80ms ease;--cr-slider-ripple-color:rgba(var(--cr-slider-knob-color-rgb), .25);-webkit-tap-highlight-color:transparent;cursor:default;height:32px;outline:0;padding:0 16px;user-select:none}@media (prefers-color-scheme:dark){:host{--cr-slider-active-color:var(--google-blue-300);--cr-slider-container-color:rgba(var(--google-blue-500-rgb), .48);--cr-slider-container-disabled-color:rgba(var(--google-grey-600-rgb), .48);--cr-slider-knob-color-rgb:var(--google-blue-300-rgb);--cr-slider-knob-disabled-color:var(--google-grey-900-white-4-percent);--cr-slider-marker-active-color:var(--google-blue-300);--cr-slider-marker-color:var(--google-blue-300);--cr-slider-marker-disabled-color:rgba(255, 255, 255, .54);--cr-slider-ripple-color:rgba(var(--cr-slider-knob-color-rgb), .4)}}:host,:host>#container{touch-action:none}#bar,#container{border-top-style:solid;border-top-width:2px}#container{border-top-color:var(--cr-slider-container-color);position:relative;top:16px}#container>div{position:absolute}#bar,#markers{top:-2px}#markers{display:flex;flex-direction:row;left:0;pointer-events:none;right:0}.active-marker,.inactive-marker{flex:1}#markers::after,#markers::before,.active-marker::after,.inactive-marker::after{border-radius:50%;content:'';display:block;height:2px;margin-inline-start:-1px;width:2px}#markers::before,.active-marker::after{background-color:var(--cr-slider-marker-active-color)}#markers::after,.inactive-marker::after{background-color:var(--cr-slider-marker-color)}#bar{border-top-color:var(--cr-slider-active-color)}:host([transiting_]) #bar{transition:width var(--cr-slider-position-transition)}#knobAndLabel{top:-1px}:host([transiting_]) #knobAndLabel{transition:margin-inline-start var(--cr-slider-position-transition)}#knob{background-color:rgb(var(--cr-slider-knob-color-rgb));border-radius:50%;box-shadow:0 1px 3px 0 rgba(0,0,0,.4);height:10px;outline:0;transform:translate(-50%,-50%);width:10px}:host([is-rtl_]) #knob{transform:translate(50%,-50%)}#label{background:rgb(var(--cr-slider-knob-color-rgb));border-radius:.75em;bottom:22px;color:#fff;font-size:12px;line-height:1.5em;opacity:0;outline:1px transparent solid;padding:0 .67em;position:absolute;transform:translateX(-50%);transition:opacity 80ms ease-in-out;white-space:nowrap}:host([is-rtl_]) #label{transform:translateX(50%)}:host(:hover) #label,:host([show-label_]) #label{opacity:1}paper-ripple{--paper-ripple-opacity:1;color:var(--cr-slider-ripple-color);height:32px;left:-11px;pointer-events:none;top:-11px;transition:color linear 80ms;width:32px}:host([is-rtl_]) paper-ripple{left:auto;right:-11px}:host([disabled_]){pointer-events:none}:host([disabled_]) #container{border-top-color:var(--cr-slider-container-disabled-color)}:host([disabled_]) #bar{border-top-color:var(--cr-slider-disabled-color)}:host([disabled_]) #markers::after,:host([disabled_]) .inactive-marker::after{background-color:var(--cr-slider-marker-disabled-color)}:host([disabled_]) #knob{background-color:var(--cr-slider-disabled-color);border:2px solid var(--cr-slider-knob-disabled-color);box-shadow:unset}</style>
    <div id="container" hidden>
      <div id="bar"></div>
      <div id="markers" hidden$="[[!markerCount]]">
        <template is="dom-repeat" items="[[getMarkers_(markerCount)]]">
          <div class$="[[getMarkerClass_(index, value, min, max,
                                         markerCount)]]"></div>
        </template>
      </div>
      <div id="knobAndLabel" on-transitionend="onTransitionEnd_">
        <div id="knob" part="knob"></div>
        <div id="label" part="label">[[label_]]</div>
      </div>
    </div>
<!--_html_template_end_-->`}
// Copyright 2018 The Chromium Authors
function clamp(min,max,value){return Math.min(max,Math.max(min,value))}function getAriaValue(tick){if(Number.isFinite(tick)){return tick}const sliderTick=tick;return sliderTick.ariaValue!==undefined?sliderTick.ariaValue:sliderTick.value}const CrSliderElementBase=mixinBehaviors([PaperRippleBehavior],PolymerElement);class CrSliderElement extends CrSliderElementBase{constructor(){super(...arguments);this.deltaKeyMap_=null;this.draggingEventTracker_=null}static get is(){return"cr-slider"}static get template(){return getTemplate$J()}static get properties(){return{disabled:{type:Boolean,value:false},disabled_:{type:Boolean,computed:"computeDisabled_(disabled, ticks.*)",reflectToAttribute:true,observer:"onDisabledChanged_"},dragging:{type:Boolean,value:false,notify:true},updatingFromKey:{type:Boolean,value:false,notify:true},keyPressSliderIncrement:{type:Number,value:1},markerCount:{type:Number,value:0},max:{type:Number,value:100},min:{type:Number,value:0},noKeybindings:{type:Boolean,value:false},snaps:{type:Boolean,value:false},ticks:{type:Array,value:()=>[]},value:Number,label_:{type:String,value:""},showLabel_:{type:Boolean,value:false,reflectToAttribute:true},isRtl_:{type:Boolean,value:false,reflectToAttribute:true},transiting_:{type:Boolean,value:false,reflectToAttribute:true}}}static get observers(){return["onTicksChanged_(ticks.*)","updateUi_(ticks.*, value, min, max)","onValueMinMaxChange_(value, min, max)","buildDeltaKeyMap_(isRtl_, keyPressSliderIncrement)"]}ready(){super.ready();this.setAttribute("role","slider");this.addEventListener("blur",this.hideRipple_);this.addEventListener("focus",this.showRipple_);this.addEventListener("keydown",this.onKeyDown_);this.addEventListener("keyup",this.onKeyUp_);this.addEventListener("pointerdown",this.onPointerDown_.bind(this))}connectedCallback(){super.connectedCallback();this.isRtl_=window.getComputedStyle(this)["direction"]==="rtl";this.draggingEventTracker_=new EventTracker$1}fire_(eventName,detail){this.dispatchEvent(new CustomEvent(eventName,{bubbles:true,composed:true,detail:detail}))}computeDisabled_(){return this.disabled||this.ticks.length===1}getMarkers_(){return new Array(Math.max(0,this.markerCount-1))}getMarkerClass_(index){const currentStep=(this.markerCount-1)*this.getRatio();return index<currentStep?"active-marker":"inactive-marker"}getRatio(){return(this.value-this.min)/(this.max-this.min)}stopDragging_(pointerId){this.draggingEventTracker_.removeAll();this.releasePointerCapture(pointerId);this.dragging=false;this.hideRipple_()}hideRipple_(){this.getRipple().clear();this.showLabel_=false}showRipple_(){this.getRipple().showAndHoldDown();this.showLabel_=true}onDisabledChanged_(){this.setAttribute("tabindex",this.disabled_?"-1":"0");this.blur()}onKeyDown_(event){if(this.disabled_||this.noKeybindings){return}if(event.metaKey||event.shiftKey||event.altKey||event.ctrlKey){return}let newValue;if(event.key==="Home"){newValue=this.min}else if(event.key==="End"){newValue=this.max}else if(this.deltaKeyMap_.has(event.key)){newValue=this.value+this.deltaKeyMap_.get(event.key)}if(newValue===undefined){return}this.updatingFromKey=true;if(this.updateValue_(newValue)){this.fire_("cr-slider-value-changed")}event.preventDefault();event.stopPropagation();this.showRipple_()}onKeyUp_(event){if(event.key==="Home"||event.key==="End"||this.deltaKeyMap_.has(event.key)){setTimeout((()=>{this.updatingFromKey=false}))}}onPointerDown_(event){if(this.disabled_||event.buttons!==1&&event.pointerType==="mouse"){return}this.dragging=true;this.transiting_=true;this.updateValueFromClientX_(event.clientX);this.showRipple_();this.setPointerCapture(event.pointerId);const stopDragging=this.stopDragging_.bind(this,event.pointerId);assert$1(!!this.draggingEventTracker_);this.draggingEventTracker_.add(this,"pointermove",(e=>{e.preventDefault();if(e.buttons!==1&&e.pointerType==="mouse"){stopDragging();return}this.updateValueFromClientX_(e.clientX)}));this.draggingEventTracker_.add(this,"pointercancel",stopDragging);this.draggingEventTracker_.add(this,"pointerdown",stopDragging);this.draggingEventTracker_.add(this,"pointerup",stopDragging);this.draggingEventTracker_.add(this,"keydown",(e=>{if(e.key==="Escape"||e.key==="Tab"||e.key==="Home"||e.key==="End"||this.deltaKeyMap_.has(e.key)){stopDragging()}}))}onTicksChanged_(){if(this.ticks.length>1){this.snaps=true;this.max=this.ticks.length-1;this.min=0}if(this.value!==undefined){this.updateValue_(this.value)}}onTransitionEnd_(){this.transiting_=false}onValueMinMaxChange_(){this.debouncer_=Debouncer.debounce(this.debouncer_,microTask,(()=>{if(this.value===undefined||this.min===undefined||this.max===undefined){return}this.updateValue_(this.value)}))}updateUi_(){const percent=`${this.getRatio()*100}%`;this.$.bar.style.width=percent;this.$.knobAndLabel.style.marginInlineStart=percent;const ticks=this.ticks;const value=this.value;if(ticks&&ticks.length>0&&Number.isInteger(value)&&value>=0&&value<ticks.length){const tick=ticks[this.value];this.label_=Number.isFinite(tick)?"":tick.label;const ariaValueNow=getAriaValue(tick);this.setAttribute("aria-valuetext",String(this.label_||ariaValueNow));this.setAttribute("aria-valuenow",ariaValueNow.toString());this.setAttribute("aria-valuemin",getAriaValue(ticks[0]).toString());this.setAttribute("aria-valuemax",getAriaValue(ticks.slice(-1)[0]).toString())}else{this.setAttribute("aria-valuetext",value!==undefined?value.toString():"");this.setAttribute("aria-valuenow",value!==undefined?value.toString():"");this.setAttribute("aria-valuemin",this.min.toString());this.setAttribute("aria-valuemax",this.max.toString())}}updateValue_(value){this.$.container.hidden=false;if(this.snaps){if(Math.abs(this.value-value)<.8){return false}value=Math.round(value)}value=clamp(this.min,this.max,value);if(this.value===value){return false}this.value=value;return true}updateValueFromClientX_(clientX){const rect=this.$.container.getBoundingClientRect();let ratio=(clientX-rect.left)/rect.width;if(this.isRtl_){ratio=1-ratio}if(this.updateValue_(ratio*(this.max-this.min)+this.min)){this.fire_("cr-slider-value-changed")}}buildDeltaKeyMap_(){const increment=this.keyPressSliderIncrement;const decrement=-this.keyPressSliderIncrement;this.deltaKeyMap_=new Map([["ArrowDown",decrement],["ArrowUp",increment],["PageDown",decrement],["PageUp",increment],["ArrowLeft",this.isRtl_?increment:decrement],["ArrowRight",this.isRtl_?decrement:increment]])}_createRipple(){this._rippleContainer=this.$.knob;const ripple=super._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");ripple.classList.add("circle","toggle-ink");return ripple}}customElements.define(CrSliderElement.is,CrSliderElement);
// Copyright 2022 The Chromium Authors
const RouteOriginMixin=dedupingMixin((superClass=>{const superClassBase=RouteObserverMixin(superClass);class RouteOriginMixin extends superClassBase{constructor(){super(...arguments);this.route_=undefined}static get properties(){return{focusConfig_:{type:Object,value:()=>new Map}}}connectedCallback(){super.connectedCallback();assertInstanceof$1(this.route_,Route,"Route origin element must specify its route.")}currentRouteChanged(newRoute,prevRoute){if(!Router.getInstance().lastRouteChangeWasPopstate()){return}if(this.route_!==newRoute){return}this.triggerFocus_(prevRoute)}addFocusConfig(route,value){if(route){this.focusConfig_.set(route.path,value)}}triggerFocus_(route){if(!route){return}const pathConfig=this.focusConfig_.get(route.path);if(pathConfig){if(typeof pathConfig==="function"){pathConfig()}else if(typeof pathConfig==="string"){const element=castExists(this.shadowRoot.querySelector(pathConfig));beforeNextRender(this,(()=>{focusWithoutInk$1(element)}))}}}}return RouteOriginMixin}));
// Copyright 2015 The Chromium Authors
function stringToPrefValue(value,pref){switch(pref.type){case chrome.settingsPrivate.PrefType.BOOLEAN:return value==="true";case chrome.settingsPrivate.PrefType.NUMBER:const n=parseFloat(value);if(isNaN(n)){console.error("Argument to stringToPrefValue for number pref "+"was unparsable: "+value);return undefined}return n;case chrome.settingsPrivate.PrefType.STRING:case chrome.settingsPrivate.PrefType.URL:return value;default:assertNotReached$1("No conversion from string to "+pref.type+" pref")}}function prefToString(pref){switch(pref.type){case chrome.settingsPrivate.PrefType.BOOLEAN:case chrome.settingsPrivate.PrefType.NUMBER:return pref.value.toString();case chrome.settingsPrivate.PrefType.STRING:case chrome.settingsPrivate.PrefType.URL:return pref.value;default:assertNotReached$1("No conversion from "+pref.type+" pref to string")}}function getTemplate$I(){return html`<!--_html_template_start_--><style include="md-select cros-color-overrides">:host{align-items:center;display:inline-flex}cr-policy-pref-indicator{height:var(--iron-icon-width,24px);margin:0 var(--cr-controlled-by-spacing);order:var(--settings-dropdown-menu-policy-order,0);width:var(--iron-icon-width,24px)}option:disabled{display:none}</style>
<template is="dom-if" if="[[pref.controlledBy]]" restamp>
  <cr-policy-pref-indicator pref="[[pref]]"></cr-policy-pref-indicator>
</template>
<select class="md-select" id="dropdownMenu" on-change="onChange_" aria-label$="[[label]]" disabled="[[shouldDisableMenu_(disabled, menuOptions.*, pref.*)]]">
  <template is="dom-repeat" items="[[menuOptions]]">
    <option value="[[item.value]]">[[item.name]]</option>
  </template>
  <option value="[[notFoundValue]]" disabled="[[!showNotFoundValue_(menuOptions, pref.value)]]">
    Customised
  </option>
</select>
<!--_html_template_end_-->`}
// Copyright 2015 The Chromium Authors
const SettingsDropdownMenuElementBase=CrPolicyPrefMixin(PrefControlMixin(PolymerElement));class SettingsDropdownMenuElement extends SettingsDropdownMenuElementBase{static get is(){return"settings-dropdown-menu"}static get template(){return getTemplate$I()}static get properties(){return{menuOptions:Array,disabled:{type:Boolean,reflectToAttribute:true,value:false},prefKey:{type:String,value:null},notFoundValue:{type:String,value:"SETTINGS_DROPDOWN_NOT_FOUND_ITEM",readOnly:true},label:String}}static get observers(){return["updateSelected_(menuOptions, pref.value.*, prefKey)"]}focus(){this.$.dropdownMenu.focus()}onChange_(){const selected=this.$.dropdownMenu.value;if(selected===this.notFoundValue){return}assert$1(this.pref);if(this.prefKey){this.set(`pref.value.${this.prefKey}`,selected)}else{const prefValue=stringToPrefValue(selected,this.pref);if(prefValue!==undefined){this.set("pref.value",prefValue)}}this.dispatchEvent(new CustomEvent("settings-control-change",{bubbles:true,composed:true}))}updateSelected_(){if(this.menuOptions===undefined||this.pref===undefined||this.prefKey===undefined){return}if(!this.menuOptions.length){return}const prefValue=this.prefStringValue_();const option=this.menuOptions.find((function(menuItem){return menuItem.value.toString()===prefValue}));microTask.run((()=>{this.$.dropdownMenu.value=option===undefined?this.notFoundValue:prefValue}))}prefStringValue_(){if(this.prefKey){return this.pref.value[this.prefKey]}else{assert$1(this.pref);return prefToString(this.pref)}}showNotFoundValue_(menuOptions,prefValue){if(menuOptions===undefined||prefValue===undefined){return false}if(menuOptions===null||menuOptions.length===0){return false}const option=menuOptions.find((menuItem=>menuItem.value.toString()===this.prefStringValue_()));return!option}shouldDisableMenu_(){return this.disabled||this.isPrefEnforced()||this.menuOptions===undefined||this.menuOptions.length===0}}customElements.define(SettingsDropdownMenuElement.is,SettingsDropdownMenuElement);
/* Copyright 2015 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file. */function deepEqual(val1,val2){if(val1===val2){return true}if(Array.isArray(val1)||Array.isArray(val2)){if(!Array.isArray(val1)||!Array.isArray(val2)){return false}return arraysEqual(val1,val2)}if(val1 instanceof Object&&val2 instanceof Object){return objectsEqual(val1,val2)}return false}function arraysEqual(arr1,arr2){if(arr1.length!==arr2.length){return false}for(let i=0;i<arr1.length;i++){if(!deepEqual(arr1[i],arr2[i])){return false}}return true}function objectsEqual(obj1,obj2){const keys1=Object.keys(obj1);const keys2=Object.keys(obj2);if(keys1.length!==keys2.length){return false}for(let i=0;i<keys1.length;i++){const key=keys1[i];if(!deepEqual(obj1[key],obj2[key])){return false}}return true}function deepCopy(val){if(!(val instanceof Object)){return val}return Array.isArray(val)?deepCopyArray(val):deepCopyObject(val)}function deepCopyArray(arr){const copy=[];for(let i=0;i<arr.length;i++){copy.push(deepCopy(arr[i]))}return copy}function deepCopyObject(obj){const copy={};const keys=Object.keys(obj);for(let i=0;i<keys.length;i++){const key=keys[i];copy[key]=deepCopy(obj[key])}return copy}class SettingsPrefsElement extends PolymerElement{static get is(){return"settings-prefs"}static get properties(){return{prefs:{type:Object,notify:true},lastPrefValues_:{type:Object,value(){return{}}}}}static get observers(){return["prefsChanged_(prefs.*)"]}constructor(){super();this.settingsApi_=chrome.settingsPrivate;this.initialized_=false;if(!CrSettingsPrefs.deferInitialization){this.initialize()}}disconnectedCallback(){super.disconnectedCallback();CrSettingsPrefs.resetForTesting()}initialize(settingsApi){if(this.initialized_){return}this.initialized_=true;if(settingsApi){this.settingsApi_=settingsApi}this.boundPrefsChanged_=this.onSettingsPrivatePrefsChanged_.bind(this);this.settingsApi_.onPrefsChanged.addListener(this.boundPrefsChanged_);this.settingsApi_.getAllPrefs().then((prefs=>{this.updatePrefs_(prefs);CrSettingsPrefs.setInitialized()}))}prefsChanged_(e){if(!CrSettingsPrefs.isInitialized||e.path==="prefs"){return}const key=this.getPrefKeyFromPath_(e.path);const prefStoreValue=this.lastPrefValues_[key];const prefObj=this.get(key,this.prefs);if(!deepEqual(prefStoreValue,prefObj.value)){this.dispatchEvent(new CustomEvent("user-action-setting-change",{bubbles:true,composed:true,detail:{prefKey:key,prefValue:prefObj.value}}));this.settingsApi_.setPref(key,prefObj.value,"").then((success=>{if(!success){this.refresh(key)}}))}}onSettingsPrivatePrefsChanged_(prefs){if(CrSettingsPrefs.isInitialized){this.updatePrefs_(prefs)}}refresh(key){this.settingsApi_.getPref(key).then((pref=>{this.updatePrefs_([pref])}))}updatePrefPath_(path,value,prefsObject){const parts=path.split(".");let cur=prefsObject;for(let part;parts.length&&(part=parts.shift());){if(!parts.length){cur[part]=value}else if(part in cur){cur=cur[part]}else{cur=cur[part]={}}}}updatePrefs_(newPrefs){const prefs=this.prefs||{};newPrefs.forEach((newPrefObj=>{this.lastPrefValues_[newPrefObj.key]=deepCopy(newPrefObj.value);if(!deepEqual(this.get(newPrefObj.key,prefs),newPrefObj)){this.updatePrefPath_(newPrefObj.key,newPrefObj,prefs);if(prefs===this.prefs){this.notifyPath("prefs."+newPrefObj.key,newPrefObj)}}}));if(!this.prefs){this.prefs=prefs}}getPrefKeyFromPath_(path){const parts=path.split(".");assert$1(parts.shift()==="prefs","Path doesn't begin with 'prefs'");for(let i=1;i<=parts.length;i++){const key=parts.slice(0,i).join(".");if(this.lastPrefValues_.hasOwnProperty(key)){return key}}return""}resetForTesting(){if(!this.initialized_){return}this.prefs=undefined;this.lastPrefValues_={};this.initialized_=false;this.settingsApi_.onPrefsChanged.removeListener(this.boundPrefsChanged_);this.settingsApi_=chrome.settingsPrivate}}customElements.define(SettingsPrefsElement.is,SettingsPrefsElement);const styleMod$4=document.createElement("dom-module");styleMod$4.appendChild(html`
  <template>
    <style>
:host{--cr-radio-button-checked-color:var(--google-blue-600);--cr-radio-button-checked-ripple-color:rgba(var(--google-blue-600-rgb), .2);--cr-radio-button-ink-size:40px;--cr-radio-button-size:16px;--cr-radio-button-unchecked-color:var(--google-grey-700);--cr-radio-button-unchecked-ripple-color:rgba(var(--google-grey-600-rgb), .15);--ink-to-circle:calc((var(--cr-radio-button-ink-size) -
                               var(--cr-radio-button-size)) / 2);align-items:center;display:flex;flex-shrink:0;outline:0}@media (prefers-color-scheme:dark){:host{--cr-radio-button-checked-color:var(--google-blue-300);--cr-radio-button-checked-ripple-color:rgba(var(--google-blue-300-rgb), .4);--cr-radio-button-unchecked-color:var(--google-grey-500);--cr-radio-button-unchecked-ripple-color:rgba(var(--google-grey-300-rgb), .4)}}:host-context([chrome-refresh-2023]):host{--cr-radio-button-ink-size:32px;--cr-radio-button-checked-color:var(--color-radio-button-foreground-checked,
                var(--cr-fallback-color-primary));--cr-radio-button-checked-ripple-color:var(--cr-active-background-color);--cr-radio-button-unchecked-color:var(--color-radio-button-foreground-unchecked,
                var(--cr-fallback-color-outline));--cr-radio-button-unchecked-ripple-color:var(--cr-active-background-color)}@media (forced-colors:active){:host{--cr-radio-button-checked-color:SelectedItem}}:host([disabled]){opacity:var(--cr-disabled-opacity);pointer-events:none}:host-context([chrome-refresh-2023]):host([disabled]){opacity:1;--cr-radio-button-checked-color:var(--color-radio-foreground-disabled,
            rgba(var(--cr-fallback-color-on-surface-rgb), .12));--cr-radio-button-unchecked-color:var(--color-radio-foreground-disabled,
                rgba(var(--cr-fallback-color-on-surface-rgb), .12))}:host(:not([disabled])){cursor:pointer}#labelWrapper{flex:1;margin-inline-start:var(--cr-radio-button-label-spacing,20px)}:host-context([chrome-refresh-2023]):host([disabled]) #labelWrapper{opacity:var(--cr-disabled-opacity)}#label{color:inherit}:host([hide-label-text]) #label{clip:rect(0,0,0,0);display:block;position:fixed}.disc,.disc-border,.disc-wrapper,paper-ripple{border-radius:50%}.disc-wrapper{height:var(--cr-radio-button-size);margin-block-start:var(--cr-radio-button-disc-margin-block-start,0);position:relative;width:var(--cr-radio-button-size)}.disc,.disc-border{box-sizing:border-box;height:var(--cr-radio-button-size);width:var(--cr-radio-button-size)}.disc-border{border:2px solid var(--cr-radio-button-unchecked-color)}:host([checked]) .disc-border{border-color:var(--cr-radio-button-checked-color)}#button:focus{outline:0}.disc{background-color:transparent;position:absolute;top:0;transform:scale(0);transition:border-color .2s,transform .2s}:host([checked]) .disc{background-color:var(--cr-radio-button-checked-color);transform:scale(.5)}:host-context([chrome-refresh-2023]) #overlay{border-radius:50%;box-sizing:border-box;display:none;height:var(--cr-radio-button-ink-size);left:50%;pointer-events:none;position:absolute;top:50%;transform:translate(-50%,-50%);width:var(--cr-radio-button-ink-size)}:host-context([chrome-refresh-2023]) #button:hover #overlay{background-color:var(--cr-hover-background-color);display:block}:host-context([chrome-refresh-2023]) #button:focus-visible #overlay{border:2px solid var(--cr-focus-outline-color);display:block}paper-ripple{--paper-ripple-opacity:1;color:var(--cr-radio-button-unchecked-ripple-color);height:var(--cr-radio-button-ink-size);left:calc(-1 * var(--ink-to-circle));pointer-events:none;position:absolute;top:calc(-1 * var(--ink-to-circle));transition:color linear 80ms;width:var(--cr-radio-button-ink-size)}:host-context([dir=rtl]) paper-ripple{left:auto;right:calc(-1 * var(--ink-to-circle))}:host([checked]) paper-ripple{color:var(--cr-radio-button-checked-ripple-color)}
    </style>
  </template>
`.content);styleMod$4.register("cr-radio-button-style");
// Copyright 2018 The Chromium Authors
const CrRadioButtonMixin=dedupingMixin((superClass=>{class CrRadioButtonMixin extends superClass{static get properties(){return{checked:{type:Boolean,value:false,reflectToAttribute:true},disabled:{type:Boolean,value:false,reflectToAttribute:true,notify:true},focusable:{type:Boolean,value:false,observer:"onFocusableChanged_"},hideLabelText:{type:Boolean,value:false,reflectToAttribute:true},label:{type:String,value:""},name:{type:String,notify:true,reflectToAttribute:true},buttonTabIndex_:{type:Number,computed:"getTabIndex_(focusable)"}}}connectedCallback(){super.connectedCallback();this.addEventListener("blur",this.hideRipple_.bind(this));if(!document.documentElement.hasAttribute("chrome-refresh-2023")){this.addEventListener("focus",this.onFocus_.bind(this))}this.addEventListener("up",this.hideRipple_.bind(this))}focus(){const button=this.shadowRoot.querySelector("#button");assert$1(button);button.focus()}getPaperRipple(){assertNotReached$1()}onFocus_(){this.getPaperRipple().showAndHoldDown()}hideRipple_(){this.getPaperRipple().clear()}onFocusableChanged_(){const links=this.querySelectorAll("a");links.forEach((link=>{link.tabIndex=this.checked?0:-1}))}getAriaChecked_(){return this.checked?"true":"false"}getAriaDisabled_(){return this.disabled?"true":"false"}getTabIndex_(){return this.focusable?0:-1}onInputKeydown_(e){if(e.shiftKey&&e.key==="Tab"){this.focus()}}}return CrRadioButtonMixin}));function getTemplate$H(){return html`<!--_html_template_start_-->    <style include="cr-radio-button-style cr-hidden-style"></style>

    <div aria-checked$="[[getAriaChecked_(checked)]]" aria-describedby="slotted-content" aria-disabled$="[[getAriaDisabled_(disabled)]]" aria-labelledby="label" class="disc-wrapper" id="button" role="radio" tabindex$="[[buttonTabIndex_]]" on-keydown="onInputKeydown_">
      <div class="disc-border"></div>
      <div class="disc"></div>
      <div id="overlay"></div>
    </div>

    <div id="labelWrapper">
      <span id="label" hidden$="[[!label]]" aria-hidden="true">[[label]]</span>
      <span id="slotted-content">
        <slot></slot>
      </span>
    </div>
<!--_html_template_end_-->`}
// Copyright 2018 The Chromium Authors
const CrRadioButtonElementBase=mixinBehaviors([PaperRippleBehavior],CrRadioButtonMixin(PolymerElement));class CrRadioButtonElement extends CrRadioButtonElementBase{static get is(){return"cr-radio-button"}static get template(){return getTemplate$H()}getPaperRipple(){return this.getRipple()}_createRipple(){this._rippleContainer=this.shadowRoot.querySelector(".disc-wrapper");const ripple=super._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");ripple.classList.add("circle","toggle-ink");return ripple}}customElements.define(CrRadioButtonElement.is,CrRadioButtonElement);function getTemplate$G(){return html`<!--_html_template_start_-->    <style>:host{display:inline-block}:host ::slotted(*){padding:var(--cr-radio-group-item-padding,12px)}:host([disabled]){cursor:initial;pointer-events:none;user-select:none}:host([disabled]) ::slotted(*){opacity:var(--cr-disabled-opacity)}</style>
    <slot></slot>
<!--_html_template_end_-->`}
// Copyright 2018 The Chromium Authors
function isEnabled(radio){return radio.matches(":not([disabled]):not([hidden])")&&radio.style.display!=="none"&&radio.style.visibility!=="hidden"}class CrRadioGroupElement extends PolymerElement{constructor(){super(...arguments);this.buttons_=null;this.buttonEventTracker_=null;this.deltaKeyMap_=null;this.isRtl_=false;this.populateBound_=null}static get is(){return"cr-radio-group"}static get template(){return getTemplate$G()}static get properties(){return{disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"update_"},selected:{type:String,notify:true,observer:"update_"},selectableElements:{type:String,value:"cr-radio-button, cr-card-radio-button, controlled-radio-button"},selectableRegExp_:{value:Object,computed:"computeSelectableRegExp_(selectableElements)"}}}ready(){super.ready();this.addEventListener("keydown",(e=>this.onKeyDown_(e)));this.addEventListener("click",this.onClick_.bind(this));if(!this.hasAttribute("role")){this.setAttribute("role","radiogroup")}this.setAttribute("aria-disabled","false")}connectedCallback(){super.connectedCallback();this.isRtl_=this.matches(":host-context([dir=rtl]) cr-radio-group");this.deltaKeyMap_=new Map([["ArrowDown",1],["ArrowLeft",this.isRtl_?1:-1],["ArrowRight",this.isRtl_?-1:1],["ArrowUp",-1],["PageDown",1],["PageUp",-1]]);this.buttonEventTracker_=new EventTracker$1;this.populateBound_=()=>this.populate_();assert$1(this.populateBound_);this.shadowRoot.querySelector("slot").addEventListener("slotchange",this.populateBound_);this.populate_()}disconnectedCallback(){super.disconnectedCallback();assert$1(this.populateBound_);this.shadowRoot.querySelector("slot").removeEventListener("slotchange",this.populateBound_);assert$1(this.buttonEventTracker_);this.buttonEventTracker_.removeAll()}focus(){if(this.disabled||!this.buttons_){return}const radio=this.buttons_.find((radio=>this.isButtonEnabledAndSelected_(radio)));if(radio){radio.focus()}}onKeyDown_(event){if(this.disabled){return}if(event.ctrlKey||event.shiftKey||event.metaKey||event.altKey){return}const targetElement=event.target;if(!this.buttons_||!this.buttons_.includes(targetElement)){return}if(event.key===" "||event.key==="Enter"){event.preventDefault();this.select_(targetElement);return}const enabledRadios=this.buttons_.filter(isEnabled);if(enabledRadios.length===0){return}assert$1(this.deltaKeyMap_);let selectedIndex;const max=enabledRadios.length-1;if(event.key==="Home"){selectedIndex=0}else if(event.key==="End"){selectedIndex=max}else if(this.deltaKeyMap_.has(event.key)){const delta=this.deltaKeyMap_.get(event.key);const lastSelection=enabledRadios.findIndex((radio=>radio.checked));selectedIndex=Math.max(0,lastSelection)+delta;if(selectedIndex>max){selectedIndex=0}else if(selectedIndex<0){selectedIndex=max}}else{return}const radio=enabledRadios[selectedIndex];const name=`${radio.name}`;if(this.selected!==name){event.preventDefault();this.selected=name;radio.focus()}}computeSelectableRegExp_(){const tags=this.selectableElements.split(", ").join("|");return new RegExp(`^(${tags})$`,"i")}onClick_(event){const path=event.composedPath();if(path.some((target=>/^a$/i.test(target.tagName)))){return}const target=path.find((n=>this.selectableRegExp_.test(n.tagName)));if(target&&this.buttons_&&this.buttons_.includes(target)){this.select_(target)}}populate_(){const nodes=this.shadowRoot.querySelector("slot").assignedNodes({flatten:true});this.buttons_=Array.from(nodes).filter((node=>node.nodeType===Node.ELEMENT_NODE&&node.matches(this.selectableElements)));assert$1(this.buttonEventTracker_);this.buttonEventTracker_.removeAll();this.buttons_.forEach((el=>{this.buttonEventTracker_.add(el,"disabled-changed",(()=>this.populate_()));this.buttonEventTracker_.add(el,"name-changed",(()=>this.populate_()))}));this.update_()}select_(button){if(!isEnabled(button)){return}const name=`${button.name}`;if(this.selected!==name){this.selected=name}}isButtonEnabledAndSelected_(button){return!this.disabled&&button.checked&&isEnabled(button)}update_(){if(!this.buttons_){return}let noneMadeFocusable=true;this.buttons_.forEach((radio=>{radio.checked=this.selected!==undefined&&`${radio.name}`===`${this.selected}`;const disabled=this.disabled||!isEnabled(radio);const canBeFocused=radio.checked&&!disabled;if(canBeFocused){radio.focusable=true;noneMadeFocusable=false}else{radio.focusable=false}radio.setAttribute("aria-disabled",`${disabled}`)}));this.setAttribute("aria-disabled",`${this.disabled}`);if(noneMadeFocusable&&!this.disabled){const radio=this.buttons_.find(isEnabled);if(radio){radio.focusable=true}}}}customElements.define(CrRadioGroupElement.is,CrRadioGroupElement);function getTemplate$F(){return html`<!--_html_template_start_--><style>
  cr-radio-group {
    width: 100%;
  }
</style>
<cr-radio-group selected="[[selected]]"
    on-selected-changed="onSelectedChanged_"
    aria-label$="[[groupAriaLabel]]"
    selectable-elements="[[selectableElements]]">
  <slot></slot>
</cr-radio-group>
<!--_html_template_end_-->`}
// Copyright 2015 The Chromium Authors
const SettingsRadioGroupElementBase=PrefControlMixin(PolymerElement);class SettingsRadioGroupElement extends SettingsRadioGroupElementBase{static get is(){return"settings-radio-group"}static get template(){return getTemplate$F()}static get properties(){return{groupAriaLabel:String,noSetPref:{type:Boolean,value:false},selected:String,selectableElements:{type:String,value:["cr-radio-button","controlled-radio-button"].join(", ")}}}static get observers(){return["resetToPrefValue(pref.*)"]}ready(){super.ready();this.setAttribute("role","none")}focus(){this.shadowRoot.querySelector("cr-radio-group").focus()}resetToPrefValue(){this.selected=prefToString(this.pref)}sendPrefChange(){if(!this.pref){return}this.set("pref.value",stringToPrefValue(this.selected,this.pref))}onSelectedChanged_(){this.selected=this.shadowRoot.querySelector("cr-radio-group").selected;if(!this.noSetPref){this.sendPrefChange()}this.dispatchEvent(new CustomEvent("change",{bubbles:true,composed:true}))}}customElements.define(SettingsRadioGroupElement.is,SettingsRadioGroupElement);function getTemplate$E(){return html`<!--_html_template_start_-->    <style>:host{-webkit-tap-highlight-color:transparent;align-items:center;cursor:pointer;display:flex;outline:0;user-select:none;--cr-checkbox-border-size:2px;--cr-checkbox-size:16px;--cr-checkbox-ripple-size:40px;--cr-checkbox-ripple-offset:calc(var(--cr-checkbox-size)/2 -
            var(--cr-checkbox-ripple-size)/2 - var(--cr-checkbox-border-size));--cr-checkbox-checked-box-color:var(--cr-checked-color);--cr-checkbox-ripple-checked-color:var(--cr-checked-color);--cr-checkbox-checked-ripple-opacity:.2;--cr-checkbox-mark-color:white;--cr-checkbox-ripple-unchecked-color:var(--google-grey-900);--cr-checkbox-unchecked-box-color:var(--google-grey-700);--cr-checkbox-unchecked-ripple-opacity:.15}@media (prefers-color-scheme:dark){:host{--cr-checkbox-checked-ripple-opacity:.4;--cr-checkbox-mark-color:var(--google-grey-900);--cr-checkbox-ripple-unchecked-color:var(--google-grey-500);--cr-checkbox-unchecked-box-color:var(--google-grey-500);--cr-checkbox-unchecked-ripple-opacity:.4}}:host-context([chrome-refresh-2023]):host{--cr-checkbox-ripple-size:32px;--cr-checkbox-checked-box-color:var(--color-checkbox-foreground-checked,
            var(--cr-fallback-color-primary));--cr-checkbox-unchecked-box-color:var(--color-checkbox-foreground-unchecked,
            var(--cr-fallback-color-outline));--cr-checkbox-ripple-checked-color:var(--cr-active-background-color);--cr-checkbox-ripple-unchecked-color:var(--cr-active-background-color);--cr-checkbox-ripple-offset:50%;--cr-checkbox-ripple-opacity:1}:host([disabled]){cursor:initial;opacity:var(--cr-disabled-opacity);pointer-events:none}:host-context([chrome-refresh-2023]):host([disabled]){opacity:1;--cr-checkbox-checked-box-color:var(--color-checkbox-background-disabled,
            rgba(var(--cr-fallback-color-on-surface-rgb), .12));--cr-checkbox-unchecked-box-color:var(--color-checkbox-background-disabled,
            rgba(var(--cr-fallback-color-on-surface-rgb), .12));--cr-checkbox-mark-color:var(--color-checkbox-foreground-disabled,
            rgba(var(--cr-fallback-color-on-surface-rgb), var(--cr-disabled-opacity)))}#checkbox{background:0 0;border:var(--cr-checkbox-border-size) solid var(--cr-checkbox-unchecked-box-color);border-radius:2px;box-sizing:border-box;cursor:pointer;display:block;flex-shrink:0;height:var(--cr-checkbox-size);margin:0;outline:0;padding:0;position:relative;transform:none;width:var(--cr-checkbox-size)}:host-context([chrome-refresh-2023]):host([disabled][checked]) #checkbox{border-color:transparent}:host-context([chrome-refresh-2023]) #hover-layer{display:none}:host-context([chrome-refresh-2023]) #checkbox:hover #hover-layer{background-color:var(--cr-hover-background-color);border-radius:50%;display:block;height:32px;left:50%;overflow:hidden;pointer-events:none;position:absolute;top:50%;transform:translate(-50%,-50%);width:32px}@media (forced-colors:active){:host(:focus) #checkbox{outline:var(--cr-focus-outline-hcm)}}:host-context([chrome-refresh-2023]) #checkbox:focus-visible{border:none;outline:2px solid var(--cr-focus-outline-color)}#checkmark{display:block;forced-color-adjust:auto;position:relative;transform:scale(0);z-index:1}#checkmark path{fill:var(--cr-checkbox-mark-color)}:host([checked]) #checkmark{transform:scale(1);transition:transform 140ms ease-out}:host([checked]) #checkbox{background:var(--cr-checkbox-checked-box-background-color,var(--cr-checkbox-checked-box-color));border-color:var(--cr-checkbox-checked-box-color)}:host-context([chrome-refresh-2023]):host([checked]) #checkbox:focus-visible{background-clip:padding-box;border:2px solid transparent}paper-ripple{--paper-ripple-opacity:var(--cr-checkbox-ripple-opacity,
            var(--cr-checkbox-unchecked-ripple-opacity));color:var(--cr-checkbox-ripple-unchecked-color);height:var(--cr-checkbox-ripple-size);left:var(--cr-checkbox-ripple-offset);outline:var(--cr-checkbox-ripple-ring,none);pointer-events:none;top:var(--cr-checkbox-ripple-offset);transition:color linear 80ms;width:var(--cr-checkbox-ripple-size)}:host([checked]) paper-ripple{--paper-ripple-opacity:var(--cr-checkbox-ripple-opacity,
            var(--cr-checkbox-checked-ripple-opacity));color:var(--cr-checkbox-ripple-checked-color)}:host-context([dir=rtl]) paper-ripple{left:auto;right:var(--cr-checkbox-ripple-offset)}:host-context([chrome-refresh-2023]) paper-ripple{transform:translate(-50%,-50%)}#label-container{color:var(--cr-checkbox-label-color,var(--cr-primary-text-color));padding-inline-start:var(--cr-checkbox-label-padding-start,20px);white-space:normal}:host(.label-first) #label-container{order:-1;padding-inline-end:var(--cr-checkbox-label-padding-end,20px);padding-inline-start:0}:host(.no-label) #label-container{display:none}#ariaDescription{height:0;overflow:hidden;width:0}</style>
    <div id="checkbox" tabindex$="[[tabIndex]]" role="checkbox" on-keydown="onKeyDown_" on-keyup="onKeyUp_" aria-disabled="false" aria-checked="false" aria-labelledby="label-container" aria-describedby="ariaDescription">
      
      <svg id="checkmark" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="m10 redacted">
      </path></svg>
      <div id="hover-layer"></div>
    </div>
    <div id="label-container" aria-hidden="true" part="label-container">
      <slot></slot>
    </div>
    <div id="ariaDescription" aria-hidden="true">[[ariaDescription]]</div>
<!--_html_template_end_-->`}
// Copyright 2018 The Chromium Authors
const CrCheckboxElementBase=mixinBehaviors([PaperRippleBehavior],PolymerElement);class CrCheckboxElement extends CrCheckboxElementBase{static get is(){return"cr-checkbox"}static get template(){return getTemplate$E()}static get properties(){return{checked:{type:Boolean,value:false,reflectToAttribute:true,observer:"checkedChanged_",notify:true},disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"},ariaDescription:String,tabIndex:{type:Number,value:0,observer:"onTabIndexChanged_"}}}ready(){super.ready();this.removeAttribute("unresolved");this.addEventListener("click",this.onClick_.bind(this));this.addEventListener("pointerup",this.hideRipple_.bind(this));if(document.documentElement.hasAttribute("chrome-refresh-2023")){this.addEventListener("pointerdown",this.showRipple_.bind(this));this.addEventListener("pointerleave",this.hideRipple_.bind(this))}else{this.addEventListener("blur",this.hideRipple_.bind(this));this.addEventListener("focus",this.showRipple_.bind(this))}}focus(){this.$.checkbox.focus()}getFocusableElement(){return this.$.checkbox}checkedChanged_(){this.$.checkbox.setAttribute("aria-checked",this.checked?"true":"false")}disabledChanged_(_current,previous){if(previous===undefined&&!this.disabled){return}this.tabIndex=this.disabled?-1:0;this.$.checkbox.setAttribute("aria-disabled",this.disabled?"true":"false")}showRipple_(){if(this.noink){return}this.getRipple().showAndHoldDown()}hideRipple_(){this.getRipple().clear()}onClick_(e){if(this.disabled||e.target.tagName==="A"){return}e.stopPropagation();e.preventDefault();this.checked=!this.checked;this.dispatchEvent(new CustomEvent("change",{bubbles:true,composed:true,detail:this.checked}))}onKeyDown_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.repeat){return}if(e.key==="Enter"){this.click()}}onKeyUp_(e){if(e.key===" "||e.key==="Enter"){e.preventDefault();e.stopPropagation()}if(e.key===" "){this.click()}}onTabIndexChanged_(){this.removeAttribute("tabindex")}_createRipple(){this._rippleContainer=this.$.checkbox;const ripple=super._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");ripple.classList.add("circle","toggle-ink");return ripple}}customElements.define(CrCheckboxElement.is,CrCheckboxElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronFitBehavior={properties:{sizingTarget:{type:Object,value:function(){return this}},fitInto:{type:Object,value:window},noOverlap:{type:Boolean},positionTarget:{type:Element},horizontalAlign:{type:String},verticalAlign:{type:String},dynamicAlign:{type:Boolean},horizontalOffset:{type:Number,value:0,notify:true},verticalOffset:{type:Number,value:0,notify:true},autoFitOnAttach:{type:Boolean,value:false},_fitInfo:{type:Object}},get _fitWidth(){var fitWidth;if(this.fitInto===window){fitWidth=this.fitInto.innerWidth}else{fitWidth=this.fitInto.getBoundingClientRect().width}return fitWidth},get _fitHeight(){var fitHeight;if(this.fitInto===window){fitHeight=this.fitInto.innerHeight}else{fitHeight=this.fitInto.getBoundingClientRect().height}return fitHeight},get _fitLeft(){var fitLeft;if(this.fitInto===window){fitLeft=0}else{fitLeft=this.fitInto.getBoundingClientRect().left}return fitLeft},get _fitTop(){var fitTop;if(this.fitInto===window){fitTop=0}else{fitTop=this.fitInto.getBoundingClientRect().top}return fitTop},get _defaultPositionTarget(){var parent=dom(this).parentNode;if(parent&&parent.nodeType===Node.DOCUMENT_FRAGMENT_NODE){parent=parent.host}return parent},get _localeHorizontalAlign(){if(this._isRTL){if(this.horizontalAlign==="right"){return"left"}if(this.horizontalAlign==="left"){return"right"}}return this.horizontalAlign},get __shouldPosition(){return(this.horizontalAlign||this.verticalAlign)&&this.positionTarget},attached:function(){if(typeof this._isRTL==="undefined"){this._isRTL=window.getComputedStyle(this).direction=="rtl"}this.positionTarget=this.positionTarget||this._defaultPositionTarget;if(this.autoFitOnAttach){if(window.getComputedStyle(this).display==="none"){setTimeout(function(){this.fit()}.bind(this))}else{window.ShadyDOM&&ShadyDOM.flush();this.fit()}}},detached:function(){if(this.__deferredFit){clearTimeout(this.__deferredFit);this.__deferredFit=null}},fit:function(){this.position();this.constrain();this.center()},_discoverInfo:function(){if(this._fitInfo){return}var target=window.getComputedStyle(this);var sizer=window.getComputedStyle(this.sizingTarget);this._fitInfo={inlineStyle:{top:this.style.top||"",left:this.style.left||"",position:this.style.position||""},sizerInlineStyle:{maxWidth:this.sizingTarget.style.maxWidth||"",maxHeight:this.sizingTarget.style.maxHeight||"",boxSizing:this.sizingTarget.style.boxSizing||""},positionedBy:{vertically:target.top!=="auto"?"top":target.bottom!=="auto"?"bottom":null,horizontally:target.left!=="auto"?"left":target.right!=="auto"?"right":null},sizedBy:{height:sizer.maxHeight!=="none",width:sizer.maxWidth!=="none",minWidth:parseInt(sizer.minWidth,10)||0,minHeight:parseInt(sizer.minHeight,10)||0},margin:{top:parseInt(target.marginTop,10)||0,right:parseInt(target.marginRight,10)||0,bottom:parseInt(target.marginBottom,10)||0,left:parseInt(target.marginLeft,10)||0}}},resetFit:function(){var info=this._fitInfo||{};for(var property in info.sizerInlineStyle){this.sizingTarget.style[property]=info.sizerInlineStyle[property]}for(var property in info.inlineStyle){this.style[property]=info.inlineStyle[property]}this._fitInfo=null},refit:function(){var scrollLeft=this.sizingTarget.scrollLeft;var scrollTop=this.sizingTarget.scrollTop;this.resetFit();this.fit();this.sizingTarget.scrollLeft=scrollLeft;this.sizingTarget.scrollTop=scrollTop},position:function(){if(!this.__shouldPosition){return}this._discoverInfo();this.style.position="fixed";this.sizingTarget.style.boxSizing="border-box";this.style.left="0px";this.style.top="0px";var rect=this.getBoundingClientRect();var positionRect=this.__getNormalizedRect(this.positionTarget);var fitRect=this.__getNormalizedRect(this.fitInto);var margin=this._fitInfo.margin;var size={width:rect.width+margin.left+margin.right,height:rect.height+margin.top+margin.bottom};var position=this.__getPosition(this._localeHorizontalAlign,this.verticalAlign,size,rect,positionRect,fitRect);var left=position.left+margin.left;var top=position.top+margin.top;var right=Math.min(fitRect.right-margin.right,left+rect.width);var bottom=Math.min(fitRect.bottom-margin.bottom,top+rect.height);left=Math.max(fitRect.left+margin.left,Math.min(left,right-this._fitInfo.sizedBy.minWidth));top=Math.max(fitRect.top+margin.top,Math.min(top,bottom-this._fitInfo.sizedBy.minHeight));this.sizingTarget.style.maxWidth=Math.max(right-left,this._fitInfo.sizedBy.minWidth)+"px";this.sizingTarget.style.maxHeight=Math.max(bottom-top,this._fitInfo.sizedBy.minHeight)+"px";this.style.left=left-rect.left+"px";this.style.top=top-rect.top+"px"},constrain:function(){if(this.__shouldPosition){return}this._discoverInfo();var info=this._fitInfo;if(!info.positionedBy.vertically){this.style.position="fixed";this.style.top="0px"}if(!info.positionedBy.horizontally){this.style.position="fixed";this.style.left="0px"}this.sizingTarget.style.boxSizing="border-box";var rect=this.getBoundingClientRect();if(!info.sizedBy.height){this.__sizeDimension(rect,info.positionedBy.vertically,"top","bottom","Height")}if(!info.sizedBy.width){this.__sizeDimension(rect,info.positionedBy.horizontally,"left","right","Width")}},_sizeDimension:function(rect,positionedBy,start,end,extent){this.__sizeDimension(rect,positionedBy,start,end,extent)},__sizeDimension:function(rect,positionedBy,start,end,extent){var info=this._fitInfo;var fitRect=this.__getNormalizedRect(this.fitInto);var max=extent==="Width"?fitRect.width:fitRect.height;var flip=positionedBy===end;var offset=flip?max-rect[end]:rect[start];var margin=info.margin[flip?start:end];var offsetExtent="offset"+extent;var sizingOffset=this[offsetExtent]-this.sizingTarget[offsetExtent];this.sizingTarget.style["max"+extent]=max-margin-offset-sizingOffset+"px"},center:function(){if(this.__shouldPosition){return}this._discoverInfo();var positionedBy=this._fitInfo.positionedBy;if(positionedBy.vertically&&positionedBy.horizontally){return}this.style.position="fixed";if(!positionedBy.vertically){this.style.top="0px"}if(!positionedBy.horizontally){this.style.left="0px"}var rect=this.getBoundingClientRect();var fitRect=this.__getNormalizedRect(this.fitInto);if(!positionedBy.vertically){var top=fitRect.top-rect.top+(fitRect.height-rect.height)/2;this.style.top=top+"px"}if(!positionedBy.horizontally){var left=fitRect.left-rect.left+(fitRect.width-rect.width)/2;this.style.left=left+"px"}},__getNormalizedRect:function(target){if(target===document.documentElement||target===window){return{top:0,left:0,width:window.innerWidth,height:window.innerHeight,right:window.innerWidth,bottom:window.innerHeight}}return target.getBoundingClientRect()},__getOffscreenArea:function(position,size,fitRect){var verticalCrop=Math.min(0,position.top)+Math.min(0,fitRect.bottom-(position.top+size.height));var horizontalCrop=Math.min(0,position.left)+Math.min(0,fitRect.right-(position.left+size.width));return Math.abs(verticalCrop)*size.width+Math.abs(horizontalCrop)*size.height},__getPosition:function(hAlign,vAlign,size,sizeNoMargins,positionRect,fitRect){var positions=[{verticalAlign:"top",horizontalAlign:"left",top:positionRect.top+this.verticalOffset,left:positionRect.left+this.horizontalOffset},{verticalAlign:"top",horizontalAlign:"right",top:positionRect.top+this.verticalOffset,left:positionRect.right-size.width-this.horizontalOffset},{verticalAlign:"bottom",horizontalAlign:"left",top:positionRect.bottom-size.height-this.verticalOffset,left:positionRect.left+this.horizontalOffset},{verticalAlign:"bottom",horizontalAlign:"right",top:positionRect.bottom-size.height-this.verticalOffset,left:positionRect.right-size.width-this.horizontalOffset}];if(this.noOverlap){for(var i=0,l=positions.length;i<l;i++){var copy={};for(var key in positions[i]){copy[key]=positions[i][key]}positions.push(copy)}positions[0].top=positions[1].top+=positionRect.height;positions[2].top=positions[3].top-=positionRect.height;positions[4].left=positions[6].left+=positionRect.width;positions[5].left=positions[7].left-=positionRect.width}vAlign=vAlign==="auto"?null:vAlign;hAlign=hAlign==="auto"?null:hAlign;if(!hAlign||hAlign==="center"){positions.push({verticalAlign:"top",horizontalAlign:"center",top:positionRect.top+this.verticalOffset+(this.noOverlap?positionRect.height:0),left:positionRect.left-sizeNoMargins.width/2+positionRect.width/2+this.horizontalOffset});positions.push({verticalAlign:"bottom",horizontalAlign:"center",top:positionRect.bottom-size.height-this.verticalOffset-(this.noOverlap?positionRect.height:0),left:positionRect.left-sizeNoMargins.width/2+positionRect.width/2+this.horizontalOffset})}if(!vAlign||vAlign==="middle"){positions.push({verticalAlign:"middle",horizontalAlign:"left",top:positionRect.top-sizeNoMargins.height/2+positionRect.height/2+this.verticalOffset,left:positionRect.left+this.horizontalOffset+(this.noOverlap?positionRect.width:0)});positions.push({verticalAlign:"middle",horizontalAlign:"right",top:positionRect.top-sizeNoMargins.height/2+positionRect.height/2+this.verticalOffset,left:positionRect.right-size.width-this.horizontalOffset-(this.noOverlap?positionRect.width:0)})}if(vAlign==="middle"&&hAlign==="center"){positions.push({verticalAlign:"middle",horizontalAlign:"center",top:positionRect.top-sizeNoMargins.height/2+positionRect.height/2+this.verticalOffset,left:positionRect.left-sizeNoMargins.width/2+positionRect.width/2+this.horizontalOffset})}var position;for(var i=0;i<positions.length;i++){var candidate=positions[i];var vAlignOk=candidate.verticalAlign===vAlign;var hAlignOk=candidate.horizontalAlign===hAlign;if(!this.dynamicAlign&&!this.noOverlap&&vAlignOk&&hAlignOk){position=candidate;break}var alignOk=(!vAlign||vAlignOk)&&(!hAlign||hAlignOk);if(!this.dynamicAlign&&!alignOk){continue}candidate.offscreenArea=this.__getOffscreenArea(candidate,size,fitRect);if(candidate.offscreenArea===0&&alignOk){position=candidate;break}position=position||candidate;var diff=candidate.offscreenArea-position.offscreenArea;if(diff<0||diff===0&&(vAlignOk||hAlignOk)){position=candidate}}return position}};
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var p=Element.prototype;var matches=p.matches||p.matchesSelector||p.mozMatchesSelector||p.msMatchesSelector||p.oMatchesSelector||p.webkitMatchesSelector;const IronFocusablesHelper={getTabbableNodes:function(node){var result=[];var needsSortByTabIndex=this._collectTabbableNodes(node,result);if(needsSortByTabIndex){return this._sortByTabIndex(result)}return result},isFocusable:function(element){if(matches.call(element,"input, select, textarea, button, object")){return matches.call(element,":not([disabled])")}return matches.call(element,"a[href], area[href], iframe, [tabindex], [contentEditable]")},isTabbable:function(element){return this.isFocusable(element)&&matches.call(element,':not([tabindex="-1"])')&&this._isVisible(element)},_normalizedTabIndex:function(element){if(this.isFocusable(element)){var tabIndex=element.getAttribute("tabindex")||0;return Number(tabIndex)}return-1},_collectTabbableNodes:function(node,result){if(node.nodeType!==Node.ELEMENT_NODE||!this._isVisible(node)){return false}var element=node;var tabIndex=this._normalizedTabIndex(element);var needsSort=tabIndex>0;if(tabIndex>=0){result.push(element)}var children;if(element.localName==="content"||element.localName==="slot"){children=dom(element).getDistributedNodes()}else{children=dom(element.root||element).children}for(var i=0;i<children.length;i++){needsSort=this._collectTabbableNodes(children[i],result)||needsSort}return needsSort},_isVisible:function(element){var style=element.style;if(style.visibility!=="hidden"&&style.display!=="none"){style=window.getComputedStyle(element);return style.visibility!=="hidden"&&style.display!=="none"}return false},_sortByTabIndex:function(tabbables){var len=tabbables.length;if(len<2){return tabbables}var pivot=Math.ceil(len/2);var left=this._sortByTabIndex(tabbables.slice(0,pivot));var right=this._sortByTabIndex(tabbables.slice(pivot));return this._mergeSortByTabIndex(left,right)},_mergeSortByTabIndex:function(left,right){var result=[];while(left.length>0&&right.length>0){if(this._hasLowerTabOrder(left[0],right[0])){result.push(right.shift())}else{result.push(left.shift())}}return result.concat(left,right)},_hasLowerTabOrder:function(a,b){var ati=Math.max(a.tabIndex,0);var bti=Math.max(b.tabIndex,0);return ati===0||bti===0?bti>ati:ati>bti}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--iron-overlay-backdrop-background-color, #000);
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
      }

      :host(.opened) {
        opacity: var(--iron-overlay-backdrop-opacity, 0.6);
        pointer-events: auto;
      }
    </style>

    <slot></slot>
`,is:"iron-overlay-backdrop",properties:{opened:{reflectToAttribute:true,type:Boolean,value:false,observer:"_openedChanged"}},listeners:{transitionend:"_onTransitionend"},created:function(){this.__openedRaf=null},attached:function(){this.opened&&this._openedChanged(this.opened)},prepare:function(){if(this.opened&&!this.parentNode){dom(document.body).appendChild(this)}},open:function(){this.opened=true},close:function(){this.opened=false},complete:function(){if(!this.opened&&this.parentNode===document.body){dom(this.parentNode).removeChild(this)}},_onTransitionend:function(event){if(event&&event.target===this){this.complete()}},_openedChanged:function(opened){if(opened){this.prepare()}else{var cs=window.getComputedStyle(this);if(cs.transitionDuration==="0s"||cs.opacity==0){this.complete()}}if(!this.isAttached){return}if(this.__openedRaf){window.cancelAnimationFrame(this.__openedRaf);this.__openedRaf=null}this.scrollTop=this.scrollTop;this.__openedRaf=window.requestAnimationFrame(function(){this.__openedRaf=null;this.toggleClass("opened",this.opened)}.bind(this))}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronOverlayManagerClass=function(){this._overlays=[];this._minimumZ=101;this._backdropElement=null;gestures.add(document.documentElement,"tap",(function(){}));document.addEventListener("tap",this._onCaptureClick.bind(this),true);document.addEventListener("focus",this._onCaptureFocus.bind(this),true);document.addEventListener("keydown",this._onCaptureKeyDown.bind(this),true)};IronOverlayManagerClass.prototype={constructor:IronOverlayManagerClass,get backdropElement(){if(!this._backdropElement){this._backdropElement=document.createElement("iron-overlay-backdrop")}return this._backdropElement},get deepActiveElement(){var active=document.activeElement;if(!active||active instanceof Element===false){active=document.body}while(active.root&&dom(active.root).activeElement){active=dom(active.root).activeElement}return active},_bringOverlayAtIndexToFront:function(i){var overlay=this._overlays[i];if(!overlay){return}var lastI=this._overlays.length-1;var currentOverlay=this._overlays[lastI];if(currentOverlay&&this._shouldBeBehindOverlay(overlay,currentOverlay)){lastI--}if(i>=lastI){return}var minimumZ=Math.max(this.currentOverlayZ(),this._minimumZ);if(this._getZ(overlay)<=minimumZ){this._applyOverlayZ(overlay,minimumZ)}while(i<lastI){this._overlays[i]=this._overlays[i+1];i++}this._overlays[lastI]=overlay},addOrRemoveOverlay:function(overlay){if(overlay.opened){this.addOverlay(overlay)}else{this.removeOverlay(overlay)}},addOverlay:function(overlay){var i=this._overlays.indexOf(overlay);if(i>=0){this._bringOverlayAtIndexToFront(i);this.trackBackdrop();return}var insertionIndex=this._overlays.length;var currentOverlay=this._overlays[insertionIndex-1];var minimumZ=Math.max(this._getZ(currentOverlay),this._minimumZ);var newZ=this._getZ(overlay);if(currentOverlay&&this._shouldBeBehindOverlay(overlay,currentOverlay)){this._applyOverlayZ(currentOverlay,minimumZ);insertionIndex--;var previousOverlay=this._overlays[insertionIndex-1];minimumZ=Math.max(this._getZ(previousOverlay),this._minimumZ)}if(newZ<=minimumZ){this._applyOverlayZ(overlay,minimumZ)}this._overlays.splice(insertionIndex,0,overlay);this.trackBackdrop()},removeOverlay:function(overlay){var i=this._overlays.indexOf(overlay);if(i===-1){return}this._overlays.splice(i,1);this.trackBackdrop()},currentOverlay:function(){var i=this._overlays.length-1;return this._overlays[i]},currentOverlayZ:function(){return this._getZ(this.currentOverlay())},ensureMinimumZ:function(minimumZ){this._minimumZ=Math.max(this._minimumZ,minimumZ)},focusOverlay:function(){var current=this.currentOverlay();if(current){current._applyFocus()}},trackBackdrop:function(){var overlay=this._overlayWithBackdrop();if(!overlay&&!this._backdropElement){return}this.backdropElement.style.zIndex=this._getZ(overlay)-1;this.backdropElement.opened=!!overlay;this.backdropElement.prepare()},getBackdrops:function(){var backdrops=[];for(var i=0;i<this._overlays.length;i++){if(this._overlays[i].withBackdrop){backdrops.push(this._overlays[i])}}return backdrops},backdropZ:function(){return this._getZ(this._overlayWithBackdrop())-1},_overlayWithBackdrop:function(){for(var i=this._overlays.length-1;i>=0;i--){if(this._overlays[i].withBackdrop){return this._overlays[i]}}},_getZ:function(overlay){var z=this._minimumZ;if(overlay){var z1=Number(overlay.style.zIndex||window.getComputedStyle(overlay).zIndex);if(z1===z1){z=z1}}return z},_setZ:function(element,z){element.style.zIndex=z},_applyOverlayZ:function(overlay,aboveZ){this._setZ(overlay,aboveZ+2)},_overlayInPath:function(path){path=path||[];for(var i=0;i<path.length;i++){if(path[i]._manager===this){return path[i]}}},_onCaptureClick:function(event){var i=this._overlays.length-1;if(i===-1)return;var path=dom(event).path;var overlay;while((overlay=this._overlays[i])&&this._overlayInPath(path)!==overlay){overlay._onCaptureClick(event);if(overlay.allowClickThrough){i--}else{break}}},_onCaptureFocus:function(event){var overlay=this.currentOverlay();if(overlay){overlay._onCaptureFocus(event)}},_onCaptureKeyDown:function(event){var overlay=this.currentOverlay();if(overlay){if(IronA11yKeysBehavior.keyboardEventMatchesKeys(event,"esc")){overlay._onCaptureEsc(event)}else if(IronA11yKeysBehavior.keyboardEventMatchesKeys(event,"tab")){overlay._onCaptureTab(event)}}},_shouldBeBehindOverlay:function(overlay1,overlay2){return!overlay1.alwaysOnTop&&overlay2.alwaysOnTop}};const IronOverlayManager=new IronOverlayManagerClass;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var lastTouchPosition={pageX:0,pageY:0};var lastRootTarget=null;var lastScrollableNodes=[];var scrollEvents=["wheel","mousewheel","DOMMouseScroll","touchstart","touchmove"];var _boundScrollHandler;var currentLockingElement;function pushScrollLock(element){if(_lockingElements.indexOf(element)>=0){return}if(_lockingElements.length===0){_lockScrollInteractions()}_lockingElements.push(element);currentLockingElement=_lockingElements[_lockingElements.length-1]}function removeScrollLock(element){var index=_lockingElements.indexOf(element);if(index===-1){return}_lockingElements.splice(index,1);currentLockingElement=_lockingElements[_lockingElements.length-1];if(_lockingElements.length===0){_unlockScrollInteractions()}}const _lockingElements=[];function _scrollInteractionHandler(event){if(event.cancelable&&_shouldPreventScrolling(event)){event.preventDefault()}if(event.targetTouches){var touch=event.targetTouches[0];lastTouchPosition.pageX=touch.pageX;lastTouchPosition.pageY=touch.pageY}}function _lockScrollInteractions(){_boundScrollHandler=_boundScrollHandler||_scrollInteractionHandler.bind(undefined);for(var i=0,l=scrollEvents.length;i<l;i++){document.addEventListener(scrollEvents[i],_boundScrollHandler,{capture:true,passive:false})}}function _unlockScrollInteractions(){for(var i=0,l=scrollEvents.length;i<l;i++){document.removeEventListener(scrollEvents[i],_boundScrollHandler,{capture:true,passive:false})}}function _shouldPreventScrolling(event){var target=dom(event).rootTarget;if(event.type!=="touchmove"&&lastRootTarget!==target){lastRootTarget=target;lastScrollableNodes=_getScrollableNodes(dom(event).path)}if(!lastScrollableNodes.length){return true}if(event.type==="touchstart"){return false}var info=_getScrollInfo(event);return!_getScrollingNode(lastScrollableNodes,info.deltaX,info.deltaY)}function _getScrollableNodes(nodes){var scrollables=[];var lockingIndex=nodes.indexOf(currentLockingElement);for(var i=0;i<=lockingIndex;i++){if(nodes[i].nodeType!==Node.ELEMENT_NODE){continue}var node=nodes[i];var style=node.style;if(style.overflow!=="scroll"&&style.overflow!=="auto"){style=window.getComputedStyle(node)}if(style.overflow==="scroll"||style.overflow==="auto"){scrollables.push(node)}}return scrollables}function _getScrollingNode(nodes,deltaX,deltaY){if(!deltaX&&!deltaY){return}var verticalScroll=Math.abs(deltaY)>=Math.abs(deltaX);for(var i=0;i<nodes.length;i++){var node=nodes[i];var canScroll=false;if(verticalScroll){canScroll=deltaY<0?node.scrollTop>0:node.scrollTop<node.scrollHeight-node.clientHeight}else{canScroll=deltaX<0?node.scrollLeft>0:node.scrollLeft<node.scrollWidth-node.clientWidth}if(canScroll){return node}}}function _getScrollInfo(event){var info={deltaX:event.deltaX,deltaY:event.deltaY};if("deltaX"in event);else if("wheelDeltaX"in event&&"wheelDeltaY"in event){info.deltaX=-event.wheelDeltaX;info.deltaY=-event.wheelDeltaY}else if("wheelDelta"in event){info.deltaX=0;info.deltaY=-event.wheelDelta}else if("axis"in event){info.deltaX=event.axis===1?event.detail:0;info.deltaY=event.axis===2?event.detail:0}else if(event.targetTouches){var touch=event.targetTouches[0];info.deltaX=lastTouchPosition.pageX-touch.pageX;info.deltaY=lastTouchPosition.pageY-touch.pageY}return info}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronOverlayBehaviorImpl={properties:{opened:{observer:"_openedChanged",type:Boolean,value:false,notify:true},canceled:{observer:"_canceledChanged",readOnly:true,type:Boolean,value:false},withBackdrop:{observer:"_withBackdropChanged",type:Boolean},noAutoFocus:{type:Boolean,value:false},noCancelOnEscKey:{type:Boolean,value:false},noCancelOnOutsideClick:{type:Boolean,value:false},closingReason:{type:Object},restoreFocusOnClose:{type:Boolean,value:false},allowClickThrough:{type:Boolean},alwaysOnTop:{type:Boolean},scrollAction:{type:String},_manager:{type:Object,value:IronOverlayManager},_focusedChild:{type:Object}},listeners:{"iron-resize":"_onIronResize"},observers:["__updateScrollObservers(isAttached, opened, scrollAction)"],get backdropElement(){return this._manager.backdropElement},get _focusNode(){return this._focusedChild||dom(this).querySelector("[autofocus]")||this},get _focusableNodes(){return IronFocusablesHelper.getTabbableNodes(this)},ready:function(){this.__isAnimating=false;this.__shouldRemoveTabIndex=false;this.__firstFocusableNode=this.__lastFocusableNode=null;this.__rafs={};this.__restoreFocusNode=null;this.__scrollTop=this.__scrollLeft=null;this.__onCaptureScroll=this.__onCaptureScroll.bind(this);this.__rootNodes=null;this._ensureSetup()},attached:function(){if(this.opened){this._openedChanged(this.opened)}this._observer=dom(this).observeNodes(this._onNodesChange)},detached:function(){dom(this).unobserveNodes(this._observer);this._observer=null;for(var cb in this.__rafs){if(this.__rafs[cb]!==null){cancelAnimationFrame(this.__rafs[cb])}}this.__rafs={};this._manager.removeOverlay(this);if(this.__isAnimating){if(this.opened){this._finishRenderOpened()}else{this._applyFocus();this._finishRenderClosed()}}},toggle:function(){this._setCanceled(false);this.opened=!this.opened},open:function(){this._setCanceled(false);this.opened=true},close:function(){this._setCanceled(false);this.opened=false},cancel:function(event){var cancelEvent=this.fire("iron-overlay-canceled",event,{cancelable:true});if(cancelEvent.defaultPrevented){return}this._setCanceled(true);this.opened=false},invalidateTabbables:function(){this.__firstFocusableNode=this.__lastFocusableNode=null},_ensureSetup:function(){if(this._overlaySetup){return}this._overlaySetup=true;this.style.outline="none";this.style.display="none"},_openedChanged:function(opened){if(opened){this.removeAttribute("aria-hidden")}else{this.setAttribute("aria-hidden","true")}if(!this.isAttached){return}this.__isAnimating=true;this.__deraf("__openedChanged",this.__openedChanged)},_canceledChanged:function(){this.closingReason=this.closingReason||{};this.closingReason.canceled=this.canceled},_withBackdropChanged:function(){if(this.withBackdrop&&!this.hasAttribute("tabindex")){this.setAttribute("tabindex","-1");this.__shouldRemoveTabIndex=true}else if(this.__shouldRemoveTabIndex){this.removeAttribute("tabindex");this.__shouldRemoveTabIndex=false}if(this.opened&&this.isAttached){this._manager.trackBackdrop()}},_prepareRenderOpened:function(){this.__restoreFocusNode=this._manager.deepActiveElement;this._preparePositioning();this.refit();this._finishPositioning();if(this.noAutoFocus&&document.activeElement===this._focusNode){this._focusNode.blur();this.__restoreFocusNode.focus()}},_renderOpened:function(){this._finishRenderOpened()},_renderClosed:function(){this._finishRenderClosed()},_finishRenderOpened:function(){this.notifyResize();this.__isAnimating=false;this.fire("iron-overlay-opened")},_finishRenderClosed:function(){this.style.display="none";this.style.zIndex="";this.notifyResize();this.__isAnimating=false;this.fire("iron-overlay-closed",this.closingReason)},_preparePositioning:function(){this.style.transition=this.style.webkitTransition="none";this.style.transform=this.style.webkitTransform="none";this.style.display=""},_finishPositioning:function(){this.style.display="none";this.scrollTop=this.scrollTop;this.style.transition=this.style.webkitTransition="";this.style.transform=this.style.webkitTransform="";this.style.display="";this.scrollTop=this.scrollTop},_applyFocus:function(){if(this.opened){if(!this.noAutoFocus){this._focusNode.focus()}}else{if(this.restoreFocusOnClose&&this.__restoreFocusNode){var activeElement=this._manager.deepActiveElement;if(activeElement===document.body||dom(this).deepContains(activeElement)){this.__restoreFocusNode.focus()}}this.__restoreFocusNode=null;this._focusNode.blur();this._focusedChild=null}},_onCaptureClick:function(event){if(!this.noCancelOnOutsideClick){this.cancel(event)}},_onCaptureFocus:function(event){if(!this.withBackdrop){return}var path=dom(event).path;if(path.indexOf(this)===-1){event.stopPropagation();this._applyFocus()}else{this._focusedChild=path[0]}},_onCaptureEsc:function(event){if(!this.noCancelOnEscKey){this.cancel(event)}},_onCaptureTab:function(event){if(!this.withBackdrop){return}this.__ensureFirstLastFocusables();var shift=event.shiftKey;var nodeToCheck=shift?this.__firstFocusableNode:this.__lastFocusableNode;var nodeToSet=shift?this.__lastFocusableNode:this.__firstFocusableNode;var shouldWrap=false;if(nodeToCheck===nodeToSet){shouldWrap=true}else{var focusedNode=this._manager.deepActiveElement;shouldWrap=focusedNode===nodeToCheck||focusedNode===this}if(shouldWrap){event.preventDefault();this._focusedChild=nodeToSet;this._applyFocus()}},_onIronResize:function(){if(this.opened&&!this.__isAnimating){this.__deraf("refit",this.refit)}},_onNodesChange:function(){if(this.opened&&!this.__isAnimating){this.invalidateTabbables();this.notifyResize()}},__ensureFirstLastFocusables:function(){var focusableNodes=this._focusableNodes;this.__firstFocusableNode=focusableNodes[0];this.__lastFocusableNode=focusableNodes[focusableNodes.length-1]},__openedChanged:function(){if(this.opened){this._prepareRenderOpened();this._manager.addOverlay(this);this._applyFocus();this._renderOpened()}else{this._manager.removeOverlay(this);this._applyFocus();this._renderClosed()}},__deraf:function(jobname,callback){var rafs=this.__rafs;if(rafs[jobname]!==null){cancelAnimationFrame(rafs[jobname])}rafs[jobname]=requestAnimationFrame(function nextAnimationFrame(){rafs[jobname]=null;callback.call(this)}.bind(this))},__updateScrollObservers:function(isAttached,opened,scrollAction){if(!isAttached||!opened||!this.__isValidScrollAction(scrollAction)){removeScrollLock(this);this.__removeScrollListeners()}else{if(scrollAction==="lock"){this.__saveScrollPosition();pushScrollLock(this)}this.__addScrollListeners()}},__addScrollListeners:function(){if(!this.__rootNodes){this.__rootNodes=[];if(useShadow){var node=this;while(node){if(node.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&node.host){this.__rootNodes.push(node)}node=node.host||node.assignedSlot||node.parentNode}}this.__rootNodes.push(document)}this.__rootNodes.forEach((function(el){el.addEventListener("scroll",this.__onCaptureScroll,{capture:true,passive:true})}),this)},__removeScrollListeners:function(){if(this.__rootNodes){this.__rootNodes.forEach((function(el){el.removeEventListener("scroll",this.__onCaptureScroll,{capture:true,passive:true})}),this)}if(!this.isAttached){this.__rootNodes=null}},__isValidScrollAction:function(scrollAction){return scrollAction==="lock"||scrollAction==="refit"||scrollAction==="cancel"},__onCaptureScroll:function(event){if(this.__isAnimating){return}if(dom(event).path.indexOf(this)>=0){return}switch(this.scrollAction){case"lock":this.__restoreScrollPosition();break;case"refit":this.__deraf("refit",this.refit);break;case"cancel":this.cancel(event);break}},__saveScrollPosition:function(){if(document.scrollingElement){this.__scrollTop=document.scrollingElement.scrollTop;this.__scrollLeft=document.scrollingElement.scrollLeft}else{this.__scrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop);this.__scrollLeft=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft)}},__restoreScrollPosition:function(){if(document.scrollingElement){document.scrollingElement.scrollTop=this.__scrollTop;document.scrollingElement.scrollLeft=this.__scrollLeft}else{document.documentElement.scrollTop=document.body.scrollTop=this.__scrollTop;document.documentElement.scrollLeft=document.body.scrollLeft=this.__scrollLeft}}};const IronOverlayBehavior=[IronFitBehavior,IronResizableBehavior,IronOverlayBehaviorImpl];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const NeonAnimatableBehavior={properties:{animationConfig:{type:Object},entryAnimation:{observer:"_entryAnimationChanged",type:String},exitAnimation:{observer:"_exitAnimationChanged",type:String}},_entryAnimationChanged:function(){this.animationConfig=this.animationConfig||{};this.animationConfig["entry"]=[{name:this.entryAnimation,node:this}]},_exitAnimationChanged:function(){this.animationConfig=this.animationConfig||{};this.animationConfig["exit"]=[{name:this.exitAnimation,node:this}]},_copyProperties:function(config1,config2){for(var property in config2){config1[property]=config2[property]}},_cloneConfig:function(config){var clone={isClone:true};this._copyProperties(clone,config);return clone},_getAnimationConfigRecursive:function(type,map,allConfigs){if(!this.animationConfig){return}if(this.animationConfig.value&&typeof this.animationConfig.value==="function"){this._warn(this._logf("playAnimation","Please put 'animationConfig' inside of your components 'properties' object instead of outside of it."));return}var thisConfig;if(type){thisConfig=this.animationConfig[type]}else{thisConfig=this.animationConfig}if(!Array.isArray(thisConfig)){thisConfig=[thisConfig]}if(thisConfig){for(var config,index=0;config=thisConfig[index];index++){if(config.animatable){config.animatable._getAnimationConfigRecursive(config.type||type,map,allConfigs)}else{if(config.id){var cachedConfig=map[config.id];if(cachedConfig){if(!cachedConfig.isClone){map[config.id]=this._cloneConfig(cachedConfig);cachedConfig=map[config.id]}this._copyProperties(cachedConfig,config)}else{map[config.id]=config}}else{allConfigs.push(config)}}}}},getAnimationConfig:function(type){var map={};var allConfigs=[];this._getAnimationConfigRecursive(type,map,allConfigs);for(var key in map){allConfigs.push(map[key])}return allConfigs}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const NeonAnimationRunnerBehaviorImpl={_configureAnimations:function(configs){var results=[];var resultsToPlay=[];if(configs.length>0){for(let config,index=0;config=configs[index];index++){let neonAnimation=document.createElement(config.name);if(neonAnimation.isNeonAnimation){let result=null;if(!neonAnimation.configure){neonAnimation.configure=function(config){return null}}result=neonAnimation.configure(config);resultsToPlay.push({result:result,config:config,neonAnimation:neonAnimation})}else{console.warn(this.is+":",config.name,"not found!")}}}for(var i=0;i<resultsToPlay.length;i++){let result=resultsToPlay[i].result;let config=resultsToPlay[i].config;let neonAnimation=resultsToPlay[i].neonAnimation;try{if(typeof result.cancel!="function"){result=document.timeline.play(result)}}catch(e){result=null;console.warn("Couldnt play","(",config.name,").",e)}if(result){results.push({neonAnimation:neonAnimation,config:config,animation:result})}}return results},_shouldComplete:function(activeEntries){var finished=true;for(var i=0;i<activeEntries.length;i++){if(activeEntries[i].animation.playState!="finished"){finished=false;break}}return finished},_complete:function(activeEntries){for(var i=0;i<activeEntries.length;i++){activeEntries[i].neonAnimation.complete(activeEntries[i].config)}for(var i=0;i<activeEntries.length;i++){activeEntries[i].animation.cancel()}},playAnimation:function(type,cookie){var configs=this.getAnimationConfig(type);if(!configs){return}this._active=this._active||{};if(this._active[type]){this._complete(this._active[type]);delete this._active[type]}var activeEntries=this._configureAnimations(configs);if(activeEntries.length==0){this.fire("neon-animation-finish",cookie,{bubbles:false});return}this._active[type]=activeEntries;for(var i=0;i<activeEntries.length;i++){activeEntries[i].animation.onfinish=function(){if(this._shouldComplete(activeEntries)){this._complete(activeEntries);delete this._active[type];this.fire("neon-animation-finish",cookie,{bubbles:false})}}.bind(this)}},cancelAnimation:function(){for(var k in this._active){var entries=this._active[k];for(var j in entries){entries[j].animation.cancel()}}this._active={}}};const NeonAnimationRunnerBehavior=[NeonAnimatableBehavior,NeonAnimationRunnerBehaviorImpl];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`
    <style>
      :host {
        position: fixed;
      }

      #contentWrapper ::slotted(*) {
        overflow: auto;
      }

      #contentWrapper.animating ::slotted(*) {
        overflow: hidden;
        pointer-events: none;
      }
    </style>

    <div id="contentWrapper">
      <slot id="content" name="dropdown-content"></slot>
    </div>
`,is:"iron-dropdown",behaviors:[IronControlState,IronA11yKeysBehavior,IronOverlayBehavior,NeonAnimationRunnerBehavior],properties:{horizontalAlign:{type:String,value:"left",reflectToAttribute:true},verticalAlign:{type:String,value:"top",reflectToAttribute:true},openAnimationConfig:{type:Object},closeAnimationConfig:{type:Object},focusTarget:{type:Object},noAnimations:{type:Boolean,value:false},allowOutsideScroll:{type:Boolean,value:false,observer:"_allowOutsideScrollChanged"}},listeners:{"neon-animation-finish":"_onNeonAnimationFinish"},observers:["_updateOverlayPosition(positionTarget, verticalAlign, horizontalAlign, verticalOffset, horizontalOffset)"],get containedElement(){var nodes=dom(this.$.content).getDistributedNodes();for(var i=0,l=nodes.length;i<l;i++){if(nodes[i].nodeType===Node.ELEMENT_NODE){return nodes[i]}}},ready:function(){if(!this.scrollAction){this.scrollAction=this.allowOutsideScroll?"refit":"lock"}this._readied=true},attached:function(){if(!this.sizingTarget||this.sizingTarget===this){this.sizingTarget=this.containedElement||this}},detached:function(){this.cancelAnimation()},_openedChanged:function(){if(this.opened&&this.disabled){this.cancel()}else{this.cancelAnimation();this._updateAnimationConfig();IronOverlayBehaviorImpl._openedChanged.apply(this,arguments)}},_renderOpened:function(){if(!this.noAnimations&&this.animationConfig.open){this.$.contentWrapper.classList.add("animating");this.playAnimation("open")}else{IronOverlayBehaviorImpl._renderOpened.apply(this,arguments)}},_renderClosed:function(){if(!this.noAnimations&&this.animationConfig.close){this.$.contentWrapper.classList.add("animating");this.playAnimation("close")}else{IronOverlayBehaviorImpl._renderClosed.apply(this,arguments)}},_onNeonAnimationFinish:function(){this.$.contentWrapper.classList.remove("animating");if(this.opened){this._finishRenderOpened()}else{this._finishRenderClosed()}},_updateAnimationConfig:function(){var animationNode=this.containedElement;var animations=[].concat(this.openAnimationConfig||[]).concat(this.closeAnimationConfig||[]);for(var i=0;i<animations.length;i++){animations[i].node=animationNode}this.animationConfig={open:this.openAnimationConfig,close:this.closeAnimationConfig}},_updateOverlayPosition:function(){if(this.isAttached){this.notifyResize()}},_allowOutsideScrollChanged:function(allowOutsideScroll){if(!this._readied){return}if(!allowOutsideScroll){this.scrollAction="lock"}else if(!this.scrollAction||this.scrollAction==="lock"){this.scrollAction="refit"}},_applyFocus:function(){var focusTarget=this.focusTarget||this.containedElement;if(focusTarget&&this.opened&&!this.noAutoFocus){focusTarget.focus()}else{IronOverlayBehaviorImpl._applyFocus.apply(this,arguments)}}});function getTemplate$D(){return html`<!--_html_template_start_-->    <style include="cr-shared-style cr-hidden-style">:host(:not([error-message-allowed])) cr-input{--cr-input-error-display:none}:host([opened_]) cr-input{--cr-input-border-radius:4px 4px 0 0}cr-input,iron-dropdown{width:var(--cr-searchable-drop-down-width,472px)}cr-input{--cr-input-padding-start:8px}iron-dropdown{max-height:270px}iron-dropdown [slot=dropdown-content]{background-color:var(--cr-searchable-drop-down-bg-color,#fff);border-radius:0 0 4px 4px;box-shadow:var(--cr-searchable-drop-down-shadow,0 2px 6px var(--paper-grey-500));min-width:128px;padding:8px 0}#input-overlay{border-radius:4px;height:100%;left:0;overflow:hidden;pointer-events:none;position:absolute;top:0;width:100%}#dropdown-icon{--iron-icon-height:20px;--iron-icon-width:20px;margin-top:-10px;padding-inline-end:6px;position:absolute;right:0;top:50%}:host-context([dir=rtl]) #dropdown-icon{left:0;right:unset}cr-input:focus-within #dropdown-icon{--iron-icon-fill-color:var(--cr-searchable-drop-down-icon-color-focus,
          var(--google-blue-600))}#input-box{height:100%;left:0;pointer-events:none;top:0;width:100%}#dropdown-box{pointer-events:initial;width:100%}#loading-box{align-items:center;box-sizing:border-box;display:flex;height:32px;padding:0 8px;text-align:start;width:100%}#loading-box div{font-size:12px;padding:0 16px}#loading-box paper-spinner-lite{--paper-spinner-color:var(--cr-searchable-drop-down-spinner-color,
          var(--google-blue-600));--paper-spinner-stroke-width:2px;height:16px;width:16px}.list-item{background:0 0;border:none;box-sizing:border-box;color:var(--cr-searchable-drop-down-list-item-color,var(--paper-grey-900));font:inherit;min-height:32px;padding:0 8px;text-align:start;width:100%}.list-item[selected_]{background-color:var(--cr-searchable-drop-down-list-bg-color-selected,rgba(0,0,0,.04));outline:0}.list-item:active{background-color:var(--cr-searchable-drop-down-list-bg-color-active,rgba(0,0,0,.12));outline:0}</style>
    
    <cr-input part="input" label="[[label]]" on-focus="onFocus_" on-keydown="onKeyDown_" value="[[value]]" on-input="onInput_" id="search" autofocus="[[autofocus]]" placeholder="[[placeholder]]" readonly="[[readonly]]" error-message="[[getErrorMessage_(errorMessage, errorMessageAllowed)]]" invalid="[[shouldShowErrorMessage_(errorMessage, errorMessageAllowed)]]" on-blur="onBlur_">
      <div id="input-overlay" slot="suffix">
        <div id="input-box">
          <iron-icon id="dropdown-icon" icon="cr:arrow-drop-down"></iron-icon>
        </div>
        <div id="dropdown-box">
          <iron-dropdown id="dropdown" horizontal-align="left" vertical-align="top" vertical-offset="0" no-cancel-on-outside-click no-cancel-on-esc-key>
            <div slot="dropdown-content">
              <div id="loading-box" hidden="[[!showLoading]]">
                <paper-spinner-lite active></paper-spinner-lite>
                <div class="cr-secondary-text">[[loadingMessage]]</div>
              </div>
              <template is="dom-repeat" items="[[items]]" filter="[[filterItems_(searchTerm_)]]">
                <button class="list-item" on-click="onSelect_" tabindex="-1">
                  [[item]]
                </button>
              </template>
            </div>
          </iron-dropdown>
        </div>
      </div>
    </cr-input>
<!--_html_template_end_-->`}
// Copyright 2018 The Chromium Authors
class CrSearchableDropDownElement extends PolymerElement{constructor(){super(...arguments);this.openDropdownTimeoutId_=0;this.resizeObserver_=null}static get is(){return"cr-searchable-drop-down"}static get template(){return getTemplate$D()}static get properties(){return{autofocus:{type:Boolean,value:false,reflectToAttribute:true},readonly:{type:Boolean,reflectToAttribute:true},errorMessageAllowed:{type:Boolean,value:false,reflectToAttribute:true},errorMessage:String,loadingMessage:String,placeholder:String,invalid:{type:Boolean,value:false,notify:true},items:{type:Array,observer:"onItemsChanged_"},value:{type:String,notify:true,observer:"updateInvalid_"},label:{type:String,value:""},updateValueOnInput:Boolean,showLoading:{type:Boolean,value:false},searchTerm_:String,dropdownRefitPending_:Boolean,opened_:{type:Boolean,value:false,reflectToAttribute:true}}}connectedCallback(){super.connectedCallback();this.pointerDownListener_=this.onPointerDown_.bind(this);document.addEventListener("pointerdown",this.pointerDownListener_);this.resizeObserver_=new ResizeObserver((()=>{this.resizeDropdown_()}));this.resizeObserver_.observe(this.$.search)}ready(){super.ready();this.addEventListener("mousemove",this.onMouseMove_.bind(this))}disconnectedCallback(){super.disconnectedCallback();document.removeEventListener("pointerdown",this.pointerDownListener_);this.resizeObserver_.unobserve(this.$.search)}enqueueDropdownRefit_(){const dropdown=this.$.dropdown;if(!this.dropdownRefitPending_&&dropdown.opened){this.dropdownRefitPending_=true;setTimeout((()=>{dropdown.refit();this.dropdownRefitPending_=false}),0)}}resizeDropdown_(){const dropdown=this.$.dropdown.containedElement;const dropdownWidth=Math.max(dropdown.offsetWidth,this.$.search.offsetWidth);dropdown.style.width=`${dropdownWidth}px`;this.enqueueDropdownRefit_()}openDropdown_(){this.$.dropdown.open();this.opened_=true}closeDropdown_(){if(this.openDropdownTimeoutId_){clearTimeout(this.openDropdownTimeoutId_)}this.$.dropdown.close();this.opened_=false}enqueueOpenDropdown_(){if(this.opened_){return}if(this.openDropdownTimeoutId_){clearTimeout(this.openDropdownTimeoutId_)}this.openDropdownTimeoutId_=setTimeout(this.openDropdown_.bind(this))}onItemsChanged_(){this.enqueueDropdownRefit_()}onFocus_(){if(this.readonly){return}this.openDropdown_()}onMouseMove_(event){const item=event.composedPath().find((elm=>{const element=elm;return element.classList&&element.classList.contains("list-item")}));if(!item){return}const selectedItem=this.findSelectedItem_();if(item===selectedItem){return}if(selectedItem){selectedItem.removeAttribute("selected_")}item.setAttribute("selected_","")}onPointerDown_(event){if(this.readonly){return}const paths=event.composedPath();const searchInput=this.$.search.inputElement;if(paths.includes(this.$.dropdown)){searchInput.focus();event.preventDefault()}else if(paths.includes(searchInput)){this.enqueueOpenDropdown_()}else{this.closeDropdown_()}}onKeyDown_(event){const dropdown=this.$.dropdown;if(!dropdown.opened){if(this.readonly){return}if(event.key==="Enter"){this.openDropdown_();event.preventDefault()}return}event.stopPropagation();switch(event.key){case"Tab":this.closeDropdown_();break;case"ArrowUp":case"ArrowDown":{const selected=this.findSelectedItemIndex_();const items=dropdown.querySelectorAll(".list-item");if(items.length===0){break}this.updateSelected_(items,selected,event.key==="ArrowDown");break}case"Enter":{const selected=this.findSelectedItem_();if(!selected){break}selected.removeAttribute("selected_");this.value=dropdown.querySelector("dom-repeat").modelForElement(selected).item;this.searchTerm_="";this.closeDropdown_();event.preventDefault();break}}}findSelectedItem_(){const items=Array.from(this.$.dropdown.querySelectorAll(".list-item"));return items.find((item=>item.hasAttribute("selected_")))}findSelectedItemIndex_(){const items=Array.from(this.$.dropdown.querySelectorAll(".list-item"));return items.findIndex((item=>item.hasAttribute("selected_")))}updateSelected_(items,currentIndex,moveDown){const numItems=items.length;let nextIndex=0;if(currentIndex===-1){nextIndex=moveDown?0:numItems-1}else{const delta=moveDown?1:-1;nextIndex=(numItems+currentIndex+delta)%numItems;items[currentIndex].removeAttribute("selected_")}items[nextIndex].setAttribute("selected_","");items[nextIndex].scrollIntoViewIfNeeded()}onInput_(){this.searchTerm_=this.$.search.value;if(this.updateValueOnInput){this.value=this.$.search.value}this.openDropdown_();this.enqueueDropdownRefit_();this.updateInvalid_()}onSelect_(event){this.closeDropdown_();this.value=event.model.item;this.searchTerm_="";const selected=this.findSelectedItem_();if(selected){selected.removeAttribute("selected_")}}filterItems_(searchTerm){if(!searchTerm){return null}return function(item){return item.toLowerCase().includes(searchTerm.toLowerCase())}}shouldShowErrorMessage_(errorMessage,errorMessageAllowed){return!!this.getErrorMessage_(errorMessage,errorMessageAllowed)}getErrorMessage_(errorMessage,errorMessageAllowed){if(!errorMessageAllowed){return""}return errorMessage}onBlur_(){if(!this.updateValueOnInput){this.$.search.value=this.value}this.updateInvalid_()}updateInvalid_(){this.invalid=!this.updateValueOnInput&&this.value!==this.$.search.value}}customElements.define(CrSearchableDropDownElement.is,CrSearchableDropDownElement);
// Copyright 2012 The Chromium Authors
const sanitizeInnerHtml=function(rawString,opts){opts=opts||{};return parseHtmlSubset("<b>"+rawString+"</b>",opts.tags,opts.attrs).firstChild.innerHTML};const parseHtmlSubset=function(){const allowAttribute=(node,value)=>true;const allowedAttributes=new Map([["href",(node,value)=>node.tagName==="A"&&(value.startsWith("chrome://")||value.startsWith("https://")||value==="#")],["target",(node,value)=>node.tagName==="A"&&value==="_blank"]]);const allowedOptionalAttributes=new Map([["class",allowAttribute],["id",allowAttribute],["is",(node,value)=>value==="action-link"||value===""],["role",(node,value)=>value==="link"],["src",(node,value)=>node.tagName==="IMG"&&value.startsWith("chrome://")],["tabindex",allowAttribute],["aria-hidden",allowAttribute],["aria-labelledby",allowAttribute]]);const allowedTags=new Set(["A","B","BR","DIV","KBD","P","PRE","SPAN","STRONG"]);const allowedOptionalTags=new Set(["IMG","LI","UL"]);let unsanitizedPolicy;function mergeTags(optTags){const clone=new Set(allowedTags);optTags.forEach((str=>{const tag=str.toUpperCase();if(allowedOptionalTags.has(tag)){clone.add(tag)}}));return clone}function mergeAttrs(optAttrs){const clone=new Map([...allowedAttributes]);optAttrs.forEach((key=>{if(allowedOptionalAttributes.has(key)){clone.set(key,allowedOptionalAttributes.get(key))}}));return clone}function walk(n,f){f(n);for(let i=0;i<n.childNodes.length;i++){walk(n.childNodes[i],f)}}function assertElement(tags,node){if(!tags.has(node.tagName)){throw Error(node.tagName+" is not supported")}}function assertAttribute(attrs,attrNode,node){const n=attrNode.nodeName;const v=attrNode.nodeValue;if(!attrs.has(n)||!attrs.get(n)(node,v)){throw Error(node.tagName+"["+n+'="'+v+'"] is not supported')}}return function(s,extraTags,extraAttrs){const tags=extraTags?mergeTags(extraTags):allowedTags;const attrs=extraAttrs?mergeAttrs(extraAttrs):allowedAttributes;const doc=document.implementation.createHTMLDocument("");const r=doc.createRange();r.selectNode(doc.body);if(window.trustedTypes){if(!unsanitizedPolicy){unsanitizedPolicy=trustedTypes.createPolicy("parse-html-subset",{createHTML:untrustedHTML=>untrustedHTML})}s=unsanitizedPolicy.createHTML(s)}const df=r.createContextualFragment(s);walk(df,(function(node){switch(node.nodeType){case Node.ELEMENT_NODE:assertElement(tags,node);const nodeAttrs=node.attributes;for(let i=0;i<nodeAttrs.length;++i){assertAttribute(attrs,nodeAttrs[i],node)}break;case Node.COMMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:case Node.TEXT_NODE:break;default:throw Error("Node type "+node.nodeType+" is not supported")}}));return df}}();
// Copyright 2015 The Chromium Authors
const i16nBehavior={properties:{locale:{type:String,value:""}},i16nUpdateLocale(){this.locale=loadTimeData$1.getString("app_locale")},i16nRaw_(id,varArgs){return arguments.length===1?loadTimeData$1.getString(id):loadTimeData$1.getStringF.apply(loadTimeData$1,arguments)},i16n(id,varArgs){const rawString=this.i16nRaw_.apply(this,arguments);return parseHtmlSubset("<b>"+rawString+"</b>").firstChild.textContent},i16nAdvanced(id,opts){opts=opts||{};const args=[id].concat(opts.substitutions||[]);const rawString=this.i16nRaw_.apply(this,args);return sanitizeInnerHtml(rawString,opts)},i16nDynamic(locale,id,varArgs){return this.i16n.apply(this,Array.prototype.slice.call(arguments,1))},i16nRecursive(locale,id,varArgs){let args=Array.prototype.slice.call(arguments,2);if(args.length>0){const self=this;args=args.map((function(str){return self.i16nExists(str)?loadTimeData$1.getString(str):str}))}return this.i16nDynamic.apply(this,[locale,id].concat(args))},i16nExists(id){return loadTimeData$1.valueExists(id)}};
// Copyright 2013 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function assert(condition,opt_message){if(!condition){let message="Assertion failed";if(opt_message){message=message+": "+opt_message}const error=new Error(message);const global=function(){const thisOrSelf=this||self;thisOrSelf.traceAssertionsForTesting;return thisOrSelf}();if(global.traceAssertionsForTesting){console.warn(error.stack)}throw error}return condition}function assertNotReached(message){assert(false,message||"Unreachable code hit")}function assertInstanceof(value,type,message){if(!(value instanceof type)){assertNotReached(message||"Value "+value+" is not a[n] "+(type.name||typeof type))}return value}
// Copyright 2014 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class ActionLink extends HTMLAnchorElement{constructor(){super(...arguments);this.boundOnKeyDown_=null;this.boundOnMouseDown_=null;this.boundOnBlur_=null}connectedCallback(){this.tabIndex=this.disabled?-1:0;if(!this.hasAttribute("role")){this.setAttribute("role","link")}this.boundOnKeyDown_=e=>{if(!this.disabled&&e.key==="Enter"&&!this.href){window.setTimeout((()=>this.click()),0)}};this.addEventListener("keydown",this.boundOnKeyDown_);function preventDefault(e){e.preventDefault()}function removePreventDefault(){document.removeEventListener("selectstart",preventDefault);document.removeEventListener("mouseup",removePreventDefault)}this.boundOnMouseDown_=()=>{document.addEventListener("selectstart",preventDefault);document.addEventListener("mouseup",removePreventDefault);if(document.activeElement!==this){this.classList.add("no-outline")}};this.addEventListener("mousedown",this.boundOnMouseDown_);this.boundOnBlur_=()=>this.classList.remove("no-outline");this.addEventListener("blur",this.boundOnBlur_)}disconnectedCallback(){this.removeEventListener("keydown",this.boundOnKeyDown_);this.boundOnKeyDown_=null;this.removeEventListener("mousedown",this.boundOnMouseDown_);this.boundOnMouseDown_=null;this.removeEventListener("blur",this.boundOnBlur_);this.boundOnBlur_=null}set disabled(disabled){if(disabled){HTMLAnchorElement.prototype.setAttribute.call(this,"disabled","")}else{HTMLAnchorElement.prototype.removeAttribute.call(this,"disabled")}this.tabIndex=disabled?-1:0}get disabled(){return this.hasAttribute("disabled")}setAttribute(attr,val){if(attr.toLowerCase()==="disabled"){this.disabled=true}else{super.setAttribute(attr,val)}}removeAttribute(attr){if(attr.toLowerCase()==="disabled"){this.disabled=false}else{super.removeAttribute(attr)}}}customElements.define("action-link",ActionLink,{extends:"a"});
// Copyright 2016 The Chromium Authors
let scrollTargetResolver=new PromiseResolver;const GlobalScrollTargetMixin=dedupingMixin((superClass=>{const superclassBase=RouteObserverMixin(superClass);class GlobalScrollTargetMixinInternal extends superclassBase{static get properties(){return{scrollTarget:{type:Object,readOnly:true},subpageScrollTarget:{type:Object,computed:"getActiveTarget_(scrollTarget, active_)"},subpageRoute:Object,active_:Boolean}}connectedCallback(){super.connectedCallback();this.active_=Router.getInstance().currentRoute===this.subpageRoute;scrollTargetResolver.promise.then(this._setScrollTarget.bind(this))}currentRouteChanged(route){if(route===this.subpageRoute){this.active_=true}else{setTimeout((()=>{this.active_=false}))}}getActiveTarget_(target,active){if(target===undefined||active===undefined){return null}return active?target:null}}return GlobalScrollTargetMixinInternal}));function setGlobalScrollTarget(scrollTarget){scrollTargetResolver.resolve(scrollTarget)}
// Copyright 2022 The Chromium Authors
const CrScrollableMixin=dedupingMixin((superClass=>{class CrScrollableMixin extends superClass{constructor(...args){super(...args);this.resizeObserver_=new ResizeObserver((entries=>{requestAnimationFrame((()=>{for(const entry of entries){this.onScrollableContainerResize_(entry.target)}}))}))}ready(){super.ready();beforeNextRender(this,(()=>{this.requestUpdateScroll();const scrollableElements=this.shadowRoot.querySelectorAll("[scrollable]");for(const scrollableElement of scrollableElements){scrollableElement.addEventListener("scroll",this.updateScrollEvent_.bind(this))}}))}disconnectedCallback(){super.disconnectedCallback();this.resizeObserver_.disconnect()}updateScrollableContents(){this.requestUpdateScroll();const ironLists=this.shadowRoot.querySelectorAll("[scrollable] iron-list");for(const ironList of ironLists){const scrollContainer=ironList.parentElement;const scrollHeight=scrollContainer.scrollHeight;if(scrollHeight<=1&&ironList.items.length>0&&window.getComputedStyle(scrollContainer).display!=="none"){this.resizeObserver_.observe(scrollContainer)}if(scrollHeight!==0){ironList.notifyResize()}}}requestUpdateScroll(){requestAnimationFrame((()=>{const scrollableElements=this.shadowRoot.querySelectorAll("[scrollable]");for(const scrollableElement of scrollableElements){this.updateScroll_(scrollableElement)}}))}saveScroll(list){list.savedScrollTops=list.savedScrollTops||[];list.savedScrollTops.push(list.scrollTarget.scrollTop)}restoreScroll(list){microTask.run((()=>{const scrollTop=list.savedScrollTops.shift();if(scrollTop!==0){list.scroll(0,scrollTop)}}))}updateScrollEvent_(event){const scrollable=event.target;this.updateScroll_(scrollable)}updateScroll_(scrollable){scrollable.classList.toggle("can-scroll",scrollable.clientHeight<scrollable.scrollHeight);scrollable.classList.toggle("is-scrolled",scrollable.scrollTop>0);scrollable.classList.toggle("scrolled-to-bottom",scrollable.scrollTop+scrollable.clientHeight>=scrollable.scrollHeight)}onScrollableContainerResize_(scrollable){const nodeList=scrollable.querySelectorAll("iron-list");if(nodeList.length===0||scrollable.scrollHeight>1){this.resizeObserver_.unobserve(scrollable)}if(scrollable.scrollHeight!==0){for(const node of nodeList){node.notifyResize()}}}}return CrScrollableMixin}));function getTemplate$C(){return html`<!--_html_template_start_--><style>:host{clip:rect(0 0 0 0);height:1px;overflow:hidden;position:fixed;width:1px}</style>

<div id="messages" role="alert" aria-live="polite" aria-relevant="additions">
</div>
<!--_html_template_end_-->`}
// Copyright 2021 The Chromium Authors
const TIMEOUT_MS=150;const instances=new Map;function getInstance(container=document.body){if(instances.has(container)){return instances.get(container)}assert$1(container.isConnected);const instance=new CrA11yAnnouncerElement;container.appendChild(instance);instances.set(container,instance);return instance}class CrA11yAnnouncerElement extends PolymerElement{constructor(){super(...arguments);this.currentTimeout_=null;this.messages_=[]}static get is(){return"cr-a11y-announcer"}static get template(){return getTemplate$C()}disconnectedCallback(){super.disconnectedCallback();if(this.currentTimeout_!==null){clearTimeout(this.currentTimeout_);this.currentTimeout_=null}for(const[parent,instance]of instances){if(instance===this){instances.delete(parent);break}}}announce(message){if(this.currentTimeout_!==null){clearTimeout(this.currentTimeout_);this.currentTimeout_=null}this.messages_.push(message);this.currentTimeout_=setTimeout((()=>{const messagesDiv=this.shadowRoot.querySelector("#messages");messagesDiv.innerHTML=window.trustedTypes.emptyHTML;for(const message of this.messages_){const div=document.createElement("div");div.textContent=message;messagesDiv.appendChild(div)}this.dispatchEvent(new CustomEvent("cr-a11y-announcer-messages-sent",{bubbles:true,detail:{messages:this.messages_.slice()}}));this.messages_.length=0;this.currentTimeout_=null}),TIMEOUT_MS)}}customElements.define(CrA11yAnnouncerElement.is,CrA11yAnnouncerElement);
// Copyright 2016 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class LifetimeBrowserProxyImpl{restart(){chrome.send("restart")}relaunch(){chrome.send("relaunch")}signOutAndRestart(){chrome.send("signOutAndRestart")}factoryReset(requestTpmFirmwareUpdate){chrome.send("factoryReset",[requestTpmFirmwareUpdate])}static getInstance(){return instance$q||(instance$q=new LifetimeBrowserProxyImpl)}static setInstance(obj){instance$q=obj}}let instance$q=null;const template$3=html`<!--
List icons here rather than importing large sets of (e.g. Polymer) icons.
NOTE: Chrome OS icons go in ./chromeos/os_icons.html.
-->
<iron-iconset-svg name="settings20" size="20">
  <svg>
    <defs>
      <g id="account-attention"><path d="M15 redacted"></path></g>
      <g id="account-circle"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path></g>
      <g id="ads-click"><path d="M10 redacted"></path></g>
      <g id="archive"><path d="M4.5 redacted"></path></g>
      <g id="auto-delete"><path d="M6.5 redacted"></path></g>
      <g id="background-replace"><path d="M3 redacted"></path></g>
      <g id="bar-chart"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 redacted"></path></g>
      <g id="block"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 redacted"></path></g>
      <g id="broken"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 redacted"></path></g>
      <g id="check-circle-outline"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 redacted"></path></g>
      <g id="checklist"><path d="M4 redacted"></path></g>
      <g id="credit-card"><path d="M16.4 redactedZ"></path></g>
      <g id="dashboard"><path d="M3 10.5 redacted"></path></g>
      <g id="data"><path d="M0 redacted" fill="none" fill-rule="evenodd"></path><path d="M6.5 redacted"></path><path d="M10 redacted"></path><path d="M7 redacted"></path><path d="M10.5 redacted"></path><path d="M13 redacted"></g>
      <g id="delete"><path d="M6.5 redacted"></path></g>
      <g id="delete-forever"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 redacted"></path></g>
      <g id="dns"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 redacted"></path></g>
      <g id="experiment"><path d="M17 redacted" fill="#5F6368"></path></g>
      <g id="filter-list"><path d="M8 redacted"></path></g>
      <g id="flash-on"><path d="M5 redacted"></path></g>
      <g id="googleg"><path d="M16 redacted"></path></g>
      <g id="history"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 redacted"></path></g>
      <g id="incognito" fill="#5F6368"><circle cx="6.8" cy="12.964" r="1.764"/><path d="M10 redacted"/><circle cx="redacted" cy="redacted" r="redacted"/></g>
      <g id="incognito-unfilled"><path d="M17.5 redacted"></path><path d="M14 redacted"></path><path d="M13 redacted"></path></g>
      <g id="interests"><path d="m2 9 redacted"></path></g>
      <g id="lightbulb"><path d="M7 redacted"></path></g>
      <g id="link"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 redacted"></path></g>
      <g id="logout"><path d="M14 redacted"></path></g>
      <g id="performance-max"><path d="m4 redacted"></path></g>
      <g id="public"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path></g>
      <g id="security"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 redacted"></path></g>
      <g id="shoppingcart"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 redacted"></path></g>
      <g id="spam"><path d="M15 redacted"></path></g>
      <g id="timer"><path d="M7.5 redacted"></path></g>
      <g id="undo"><path d="M11 redacted"></path></g>
      <g id="volume-down"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 redacted"></path></g>
      <g id="volume-up"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 redacted"></path></g>
      <g id="volume-up-off"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></g>
      <g id="volume-zero"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 redacted"></path></g>
      <g id="cloud-off"><path d="M16 redacted"></path></g>
      <!-- The polygon ("+" shape) within this icon will always be filled with
           the color #4285F4. Any color fills specified programmatically will
           only be applied to the outer layer. -->
      <g id="printer-add"><path d="M17 redacted"></path><polygon fill="#4285F4" points="redacted"></polygon></g>
      <g id="safety-check"><path d="M10 redacted"></path></g>
      <g id="web-asset"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 redacted"></path></g>
      <g id="wind-rise"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7 redacted"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path></g>
    </defs>
  </svg>
</iron-iconset-svg>

<!-- NOTE: In the common case that the final icon will be 20x20, export the SVG
     at 20px and place it in the section above. -->
<iron-iconset-svg name="settings" size="24">
  <svg>
    <defs>
      <!-- Ads icon in the Content Settings -->
      <g id="ads">
        <path d="M19 redacted"></path>
      </g>
      <g id="ads-off">
        <path d="M21.8 redacted"></path>
      </g>

      <!-- Cookie SVG obtained from rolfe@ -->
      <g id="cookie">
        <path d="M15.5 redacted" fill-rule="evenodd"></path>
      </g>

      <!-- Cookies Settings SVG -->
      <g id="block"><path d="M12 redacted"></path></g>

      <!-- The Google "G" icon in the Clear Browsing Data dialog. -->
      <g id="googleg">
        <path fill="#4285F4" d="M22.56 redacted"></path>
        <path fill="#FBBC05" d="M5.84 redacted"></path>
        <path fill="#EA4335" d="M12 redacted"></path>
        <path fill="none" d="M1 redacted"></path>
      </g>

      <!-- Permissions & Content Settings SVG -->
      <g id="permissions">
        <path d="M3 redacted"></path>
      </g>

      <!-- Protected Content SVG -->
      <g id="protected-content">
        <path d="M10,15 redacted"></path>
      </g>
      <g id="protected-content-off">
        <path d="M23 redacted"></path>
      </g>

      <!-- Safebrowsing SVG -->
      <g id="public"><path d="M12 redacted"></path></g>
      <g id="web"><path d="M20 redacted"></path></g>

      <!-- vr-headset SVG obtained from amyroberts@ -->
      <g id="vr-headset"><path d="M20.907 redacted"></path></g>
      <g id="vr-headset-off"><path d="M2 redacted"></path></g>

      <!--
      These icons are copied from Polymer's iron-icons and kept in sorted order.
      See http://goo.gl/Y1OdAq for instructions on adding additional icons.
      -->
      <g id="accessibility"><path d="M12 redacted"></path></g>
      <g id="apps"><path d="M4 redacted"></path></g>
      <g id="assignment"><path d="M19 3h-redacted"></path></g>

      <g id="check-circle"><path d="M12 redacted"></path></g>
      <g id="clipboard"><path d="M19 redacted"></path></g>
      <g id="clipboard-off"><path d="M21 redacted"></path></g>
      <g id="cloud"><path d="M19 redacted"></path></g>
      <g id="code"><path d="M9.4 redacted"></path></g>
      <g id="code-off"><path d="M19 redacted"></path></g>
      <g id="content-copy"><path d="M16 redacted"></path></g>
      <g id="database"><path d="M12 redacted"></path></g>
      <g id="database-off"><path d="M2 redacted"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4 redacted"></path></g>
      <g id="devices"><path d="M5 redacted"></path></g>
      <g id="devices-off"><path d="M22 redacted"></path></g>
      <g id="exit-to-app"><path d="M10 redacted"></path></g>
      <g id="federated-identity-api"><path d="M5 redacted"></path></g>
      <g id="federated-identity-api-off"><path d="M14 redacted"></path></g>
      <g id="file-download-off"><path d="M15.6 redacted"></path></g>
      <g id="file-editing-off"><path d="M19 redacted"></path></g>
      <g id="hid-device"><path d="M20 redacted"></path></g>
      <g id="hid-device-off"><path d="M20 redacted"></path></g>
      <g id="language"><path d="M11 redacted"></path></g>
      <g id="location-on"><path d="M12 redacted"></path></g>
      <g id="location-off"><path d="M12 redacted"></path><path d="M2 redacted"></path></g>
      <g id="mic-off"><path d="redacted"></path></g>
      <g id="midi"><path d="M19 redacted"></path></g>
      <g id="midi-off"><path d="M21 redacted"></path></g>
      <g id="music-note"><path d="M12 redacted"></path></g>
      <g id="notifications"><path d="M12 redacted"></path></g>
      <g id="notifications-none"><path d="M12 redacted"></path></g>
      <g id="notifications-off"><path d="M18 redacted"></path></g>
      <g id="open-in-new-off"><path d="M17 redacted"></path></g>
      <g id="open-in-browser"><path d="M20 redacted"></path></g>
      <g id="pdf"><path d="M7 redacted"></path><path fill="none" d="M0 0h24v24H0z"></path></g>
      <g id="palette"><path d="M12 redacted"></path></g>
      <g id="payment-handler"><path d="M20 redacted"></path></g>
      <g id="payment-handler-off"><path d="M6 redacted"></path></g>
      <g id="insecure-content"><path d="M1 redacted"></path></g>
      <g id="photo"><path d="M21 redacted"></path><path d="M2 redacted"></path></g>
      <g id="power-settings-new"><path d="M13 redacted"></path></g>
      <g id="protocol-handler"><path d="M21 redacted"></path></g>
      <g id="protocol-handler-off"><path d="M7 redacted"></path></g>
      <g id="refresh"><path d="M17.65 redacted"></path></g>
      <g id="restore"><path d="M13 redacted"></path></g>
      <g id="rotate-right"><path d="M15.55 redacted"></path></g>
      <g id="save-original"><path d="M11 redacted"></path></g>
      <g id="sensors-off"><path d="M16 redacted"></path></g>
      <g id="serial-port"><path d="M22 redacted"></path></g>
      <g id="serial-port-off"><path d="M7 redacted"></path></g>
      <g id="sync-off"><path d="M12 redacted"></path></g>
      <g id="sync-disabled"><path d="M10 redacted"></path></g>
      <g id="sync-problem"><path d="M3 redacted"></path></g>
      <g id="usb"><path d="M15 redacted"></path></g>
      <g id="usb-off"><path d="M15 redacted"></path></g>
      <g id="videocam-off"><path d="M21 redacted"></path></g>
      <g id="volume-down"><path d="M1 redacted"></path></g>
      <g id="volume-up"><path d="M3 redacted"></path></g>
      <g id="volume-up-off"><path d="M16 redacted"></path><path d="M19 redacted"></path><path d="M2 redacted"></path><polygon points="12 redacted"></polygon></g>
      <g id="bluetooth-scanning"><path d="M14 redacted"></path></g>
      <g id="bluetooth"><path d="M17 redacted"></path></g>
      <g id="bluetooth-off"><path d="M13 redacted"></path></g>

      <g id="window-management"><path d="M18 redacted"></path></g>
      <g id="window-management-off"><path d="m20 redacted"></path></g>
      <g id="zoom-in"><path d="M15 redacted"></path></g>
      <g id="local-fonts"><path d="M0 redacted" fill="none"></path><path d="M20 redacted"></path></g>
      <g id="local-fonts-off"><path d="M4 redacted"></path></g>
      <g id="file-handling"><path d="M8 redacted"></path></g>
      <g id="file-handling-off"><path d="M13 redacted" fill="#5F6368"></path><path d="M9 redacted" fill="#5F6368"></path></g>
      <g id="performance"><path d="M0 redacted" fill="none"></path><path d="m20 redacted"></path></g>
      <g id="feedback" viewBox="0 0 24 24"><path d="M20 redacted"></path></g>
    </defs>
  </svg>
</iron-iconset-svg>
`;document.head.appendChild(template$3.content);const styleMod$3=document.createElement("dom-module");styleMod$3.appendChild(html`
  <template>
    <style include="settings-shared md-select">

[slot='dialog-body'] .settings-box {
  border-top: none;
  margin-bottom: 10px;
}

[slot='dialog-body'] .settings-box.two-line {
  align-items: flex-start;
}

[slot='dialog-body'] .settings-box cr-input {
  width: 100%;
}

/* The only input that has error-message are at the end, so we don't
    need to allocate space for error-message under each input
    for consistency. */
[slot='dialog-body'] .settings-box cr-input:not([error-message]) {
  --cr-input-error-display: none;
}

[slot='dialog-body'] .settings-box .md-select {
  width: 100%;
}

[slot='dialog-body'] .settings-box .printer-name-input {
  width: 100%;
}

[slot='dialog-body'] .settings-box .browse-file-input {
  flex: 1;
  width: auto;
}

[slot='dialog-body'] .settings-box .browse-button {
  margin-bottom: 8px;
  margin-inline-start: 12px;
}

[slot='dialog-body'] .cr-form-field-label .select-ppd-and-view {
  align-items: center;
  display: flex;
}

[slot='dialog-body'] .cr-form-field-label .select-ppd-and-view .ppd-button {
  background: none;
  border: none;
  border-radius: 0;
  cursor: pointer;
  height: var(--cr-form-field-label-line-height);
  margin-inline-end: 0.25em;
  padding: 0;
  text-decoration: underline;
}

[slot='dialog-body'] .last {
  margin-top: 20px;
}

[slot='dialog-body'] .center {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  width: 100%;
}

[slot='dialog-buttons'] {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

[slot='dialog-buttons'] .eula {
  padding-top: 6px;
}

[slot='dialog-body'] {
  height: 350px;
}

.flex-auto {
  flex: 1 1 auto;
}

#search input[type='search'] {
  font: inherit;
}

#ppdLabel {
  padding-inline-start: 20px;
}

#no-search-results {
  text-align: center;
}
    </style>
  </template>
`.content);styleMod$3.register("cups-printer-shared");function getTemplate$B(){return html`<!--_html_template_start_--><style include="settings-shared">
  #dialog [slot=body] {
    padding-inline-end: 0;
    padding-inline-start: 0;
  }
</style>

<cr-dialog id="dialog" close-text="Close">
  <div slot="title">
    <slot name="dialog-title"></slot>
  </div>
  <div slot="body">
    <slot name="dialog-body"></slot>
  </div>
  <div slot="button-container">
    <slot name="dialog-buttons"></slot>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
class AddPrinterDialogElement extends PolymerElement{static get is(){return"add-printer-dialog"}static get template(){return getTemplate$B()}connectedCallback(){super.connectedCallback();this.$.dialog.showModal()}close(){this.$.dialog.close()}}customElements.define(AddPrinterDialogElement.is,AddPrinterDialogElement);function getTemplate$A(){return html`<!--_html_template_start_--><style>
  #error-wrap {
    align-items: center;
    display: flex;
  }

  #error-container {
    height: 20px;
    margin-top: 10px;
  }

  #error-icon {
    --iron-icon-fill-color: var(--cros-icon-color-alert);
  }

  #error-message {
    color: var(--cros-text-color-alert);
    font-size: 10px;
    margin-inline-start: 5px;
  }
</style>
<div id="error-container" hidden="[[!errorText]]">
  <div id="error-wrap">
    <iron-icon id="error-icon" icon="cr:warning"></iron-icon>
    <div id="error-message">
      [[errorText]]
    </div>
  </div>
</div>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
class PrinterDialogErrorElement extends PolymerElement{static get is(){return"printer-dialog-error"}static get template(){return getTemplate$A()}static get properties(){return{errorText:{type:String,value:""}}}}customElements.define(PrinterDialogErrorElement.is,PrinterDialogErrorElement);
// Copyright 2022 The Chromium Authors
var PrinterSetupResult;(function(PrinterSetupResult){PrinterSetupResult[PrinterSetupResult["FATAL_ERROR"]=0]="FATAL_ERROR";PrinterSetupResult[PrinterSetupResult["SUCCESS"]=1]="SUCCESS";PrinterSetupResult[PrinterSetupResult["PRINTER_UNREACHABLE"]=2]="PRINTER_UNREACHABLE";PrinterSetupResult[PrinterSetupResult["DBUS_ERROR"]=3]="DBUS_ERROR";PrinterSetupResult[PrinterSetupResult["NATIVE_PRINTERS_NOT_ALLOWED"]=4]="NATIVE_PRINTERS_NOT_ALLOWED";PrinterSetupResult[PrinterSetupResult["INVALID_PRINTER_UPDATE"]=5]="INVALID_PRINTER_UPDATE";PrinterSetupResult[PrinterSetupResult["COMPONENT_UNAVAILAVLE"]=6]="COMPONENT_UNAVAILAVLE";PrinterSetupResult[PrinterSetupResult["EDIT_SUCCESS"]=7]="EDIT_SUCCESS";PrinterSetupResult[PrinterSetupResult["PPD_TOO_LARGE"]=10]="PPD_TOO_LARGE";PrinterSetupResult[PrinterSetupResult["INVALID_PPD"]=11]="INVALID_PPD";PrinterSetupResult[PrinterSetupResult["PPD_NOT_FOUND"]=12]="PPD_NOT_FOUND";PrinterSetupResult[PrinterSetupResult["PPD_UNRETRIEVABLE"]=13]="PPD_UNRETRIEVABLE";PrinterSetupResult[PrinterSetupResult["IO_ERROR"]=14]="IO_ERROR";PrinterSetupResult[PrinterSetupResult["MEMORY_ALLOCATION_ERROR"]=15]="MEMORY_ALLOCATION_ERROR";PrinterSetupResult[PrinterSetupResult["BAD_URI"]=16]="BAD_URI";PrinterSetupResult[PrinterSetupResult["MANUAL_SETUP_REQUIRED"]=17]="MANUAL_SETUP_REQUIRED";PrinterSetupResult[PrinterSetupResult["DBUS_NO_REPLY"]=64]="DBUS_NO_REPLY";PrinterSetupResult[PrinterSetupResult["DBUS_TIMEOUT"]=65]="DBUS_TIMEOUT"})(PrinterSetupResult||(PrinterSetupResult={}));var PrintServerResult;(function(PrintServerResult){PrintServerResult[PrintServerResult["NO_ERRORS"]=0]="NO_ERRORS";PrintServerResult[PrintServerResult["INCORRECT_URL"]=1]="INCORRECT_URL";PrintServerResult[PrintServerResult["CONNECTION_ERROR"]=2]="CONNECTION_ERROR";PrintServerResult[PrintServerResult["HTTP_ERROR"]=3]="HTTP_ERROR";PrintServerResult[PrintServerResult["CANNOT_PARSE_IPP_RESPONSE"]=4]="CANNOT_PARSE_IPP_RESPONSE"})(PrintServerResult||(PrintServerResult={}));let instance$p=null;class CupsPrintersBrowserProxyImpl{static getInstance(){return instance$p||(instance$p=new CupsPrintersBrowserProxyImpl)}static setInstanceForTesting(obj){instance$p=obj}getCupsSavedPrintersList(){return sendWithPromise("getCupsSavedPrintersList")}getCupsEnterprisePrintersList(){return sendWithPromise("getCupsEnterprisePrintersList")}updateCupsPrinter(printerId,printerName){return sendWithPromise("updateCupsPrinter",printerId,printerName)}removeCupsPrinter(printerId,printerName){chrome.send("removeCupsPrinter",[printerId,printerName])}retrieveCupsPrinterPpd(printerId,printerName,eula){chrome.send("retrieveCupsPrinterPpd",[printerId,printerName,eula])}addCupsPrinter(newPrinter){return sendWithPromise("addCupsPrinter",newPrinter)}reconfigureCupsPrinter(printer){return sendWithPromise("reconfigureCupsPrinter",printer)}getCupsPrinterPpdPath(){return sendWithPromise("selectPPDFile")}startDiscoveringPrinters(){chrome.send("startDiscoveringPrinters")}stopDiscoveringPrinters(){chrome.send("stopDiscoveringPrinters")}getCupsPrinterManufacturersList(){return sendWithPromise("getCupsPrinterManufacturersList")}getCupsPrinterModelsList(manufacturer){return sendWithPromise("getCupsPrinterModelsList",manufacturer)}getPrinterInfo(newPrinter){return sendWithPromise("getPrinterInfo",newPrinter)}getPrinterPpdManufacturerAndModel(printerId){return sendWithPromise("getPrinterPpdManufacturerAndModel",printerId)}addDiscoveredPrinter(printerId){return sendWithPromise("addDiscoveredPrinter",printerId)}cancelPrinterSetUp(newPrinter){chrome.send("cancelPrinterSetUp",[newPrinter])}getEulaUrl(ppdManufacturer,ppdModel){return sendWithPromise("getEulaUrl",ppdManufacturer,ppdModel)}queryPrintServer(serverUrl){return sendWithPromise("queryPrintServer",serverUrl)}openPrintManagementApp(){chrome.send("openPrintManagementApp")}openScanningApp(){chrome.send("openScanningApp")}}
// Copyright 2018 The Chromium Authors
const NetworkListenerBehavior={observer_:null,attached(){this.observer_=new CrosNetworkConfigObserverReceiver(this);MojoInterfaceProviderImpl.getInstance().getMojoServiceRemote().addObserver(this.observer_.$.bindNewPipeAndPassRemote())},onActiveNetworksChanged(activeNetworks){},onNetworkStateChanged(network){},onNetworkStateListChanged(){},onDeviceStateListChanged(){},onVpnProvidersChanged(){},onNetworkCertificatesChanged(){},onPoliciesApplied(userhash){}};
// Copyright 2019 The Chromium Authors
const FAKE_CREDENTIAL="FAKE_CREDENTIAL_redacted";const VALID_DNS_CHARS_REGEX=RegExp("^[a-zA-Z0-9-\\.]*$");class OncMojo{static getEnumString(value){if(value===undefined){return"undefined"}return value.toString()}static getActivationStateTypeString(value){switch(value){case ActivationStateType.kUnknown:return"Unknown";case ActivationStateType.kNotActivated:return"NotActivated";case ActivationStateType.kActivating:return"Activating";case ActivationStateType.kPartiallyActivated:return"PartiallyActivated";case ActivationStateType.kActivated:return"Activated";case ActivationStateType.kNoService:return"NoService"}assertNotReached("Unexpected enum value: "+OncMojo.getEnumString(value));return""}static getActivationStateTypeFromString(value){switch(value){case"Unknown":return ActivationStateType.kUnknown;case"NotActivated":return ActivationStateType.kNotActivated;case"Activating":return ActivationStateType.kActivating;case"PartiallyActivated":return ActivationStateType.kPartiallyActivated;case"Activated":return ActivationStateType.kActivated;case"NoService":return ActivationStateType.kNoService}assertNotReached("Unexpected value: "+value);return ActivationStateType.kUnknown}static getPortalStateString(value){switch(value){case PortalState.kUnknown:return"Unknown";case PortalState.kOnline:return"Online";case PortalState.kPortalSuspected:return"PortalSuspected";case PortalState.kPortal:return"Portal";case PortalState.kProxyAuthRequired:return"ProxyAuthRequired";case PortalState.kNoInternet:return"NoInternet"}assertNotReached("Unexpected enum value: "+OncMojo.getEnumString(value));return""}static getConnectionStateTypeString(value){switch(value){case ConnectionStateType.kOnline:return"Online";case ConnectionStateType.kConnected:return"Connected";case ConnectionStateType.kPortal:return"Portal";case ConnectionStateType.kConnecting:return"Connecting";case ConnectionStateType.kNotConnected:return"NotConnected"}assertNotReached("Unexpected enum value: "+OncMojo.getEnumString(value));return""}static getConnectionStateTypeFromString(value){switch(value){case"Online":return ConnectionStateType.kOnline;case"Connected":return ConnectionStateType.kConnected;case"Portal":return ConnectionStateType.kPortal;case"Connecting":return ConnectionStateType.kConnecting;case"NotConnected":return ConnectionStateType.kNotConnected}assertNotReached("Unexpected value: "+value);return ConnectionStateType.kNotConnected}static connectionStateIsConnected(value){switch(value){case ConnectionStateType.kOnline:case ConnectionStateType.kConnected:case ConnectionStateType.kPortal:return true;case ConnectionStateType.kConnecting:case ConnectionStateType.kNotConnected:return false}assertNotReached("Unexpected enum value: "+OncMojo.getEnumString(value));return false}static getDeviceStateTypeString(value){switch(value){case DeviceStateType.kUninitialized:return"Uninitialized";case DeviceStateType.kDisabled:return"Disabled";case DeviceStateType.kDisabling:return"Disabling";case DeviceStateType.kEnabling:return"Enabling";case DeviceStateType.kEnabled:return"Enabled";case DeviceStateType.kProhibited:return"Prohibited";case DeviceStateType.kUnavailable:return"Unavailable"}assertNotReached("Unexpected enum value: "+OncMojo.getEnumString(value));return""}static deviceStateIsIntermediate(value){switch(value){case DeviceStateType.kUninitialized:case DeviceStateType.kDisabling:case DeviceStateType.kEnabling:case DeviceStateType.kUnavailable:return true;case DeviceStateType.kDisabled:case DeviceStateType.kEnabled:case DeviceStateType.kProhibited:return false}assertNotReached("Unexpected enum value: "+OncMojo.getEnumString(value));return false}static deviceIsInhibited(device){if(!device){return false}return device.inhibitReason!==InhibitReason.kNotInhibited}static getNetworkTypeString(value){switch(value){case NetworkType.kAll:return"All";case NetworkType.kCellular:return"Cellular";case NetworkType.kEthernet:return"Ethernet";case NetworkType.kMobile:return"Mobile";case NetworkType.kTether:return"Tether";case NetworkType.kVPN:return"VPN";case NetworkType.kWireless:return"Wireless";case NetworkType.kWiFi:return"WiFi"}assertNotReached("Unexpected enum value: "+OncMojo.getEnumString(value));return""}static networkTypeIsMobile(value){switch(value){case NetworkType.kCellular:case NetworkType.kMobile:case NetworkType.kTether:return true;case NetworkType.kAll:case NetworkType.kEthernet:case NetworkType.kVPN:case NetworkType.kWireless:case NetworkType.kWiFi:return false}assertNotReached("Unexpected enum value: "+OncMojo.getEnumString(value));return false}static networkTypeHasConfigurationFlow(value){return!OncMojo.networkTypeIsMobile(value)}static getNetworkTypeFromString(value){switch(value){case"All":return NetworkType.kAll;case"Cellular":return NetworkType.kCellular;case"Ethernet":return NetworkType.kEthernet;case"Mobile":return NetworkType.kMobile;case"Tether":return NetworkType.kTether;case"VPN":return NetworkType.kVPN;case"Wireless":return NetworkType.kWireless;case"WiFi":return NetworkType.kWiFi}assertNotReached("Unexpected value: "+value);return NetworkType.kAll}static getOncSourceString(value){switch(value){case OncSource.kNone:return"None";case OncSource.kDevice:return"Device";case OncSource.kDevicePolicy:return"DevicePolicy";case OncSource.kUser:return"User";case OncSource.kUserPolicy:return"UserPolicy"}assertNotReached("Unexpected enum value: "+OncMojo.getEnumString(value));return""}static getSecurityTypeString(value){switch(value){case SecurityType.kNone:return"None";case SecurityType.kWep8021x:return"WEP-8021X";case SecurityType.kWepPsk:return"WEP-PSK";case SecurityType.kWpaEap:return"WPA-EAP";case SecurityType.kWpaPsk:return"WPA-PSK"}assertNotReached("Unexpected enum value: "+OncMojo.getEnumString(value));return""}static getSecurityTypeFromString(value){switch(value){case"None":return SecurityType.kNone;case"WEP-8021X":return SecurityType.kWep8021x;case"WEP-PSK":return SecurityType.kWepPsk;case"WPA-EAP":return SecurityType.kWpaEap;case"WPA-PSK":return SecurityType.kWpaPsk}assertNotReached("Unexpected value: "+value);return SecurityType.kNone}static getVpnTypeString(value){switch(value){case VpnType.kIKEv2:return"IKEv2";case VpnType.kL2TPIPsec:return"L2TP-IPsec";case VpnType.kOpenVPN:return"OpenVPN";case VpnType.kWireGuard:return"WireGuard";case VpnType.kExtension:return"ThirdPartyVPN";case VpnType.kArc:return"ARCVPN"}assertNotReached("Unexpected enum value: "+OncMojo.getEnumString(value));return""}static getTypeString(key,value){if(key==="activationState"){return OncMojo.getActivationStateTypeString(value)}if(key==="connectionState"){return OncMojo.getConnectionStateTypeString(value)}if(key==="deviceState"){return OncMojo.getDeviceStateTypeString(value)}if(key==="type"){return OncMojo.getNetworkTypeString(value)}if(key==="source"){return OncMojo.getOncSourceString(value)}if(key==="security"){return OncMojo.getSecurityTypeString(value)}return value}static getEnforcedPolicySourceFromOncSource(source){switch(source){case OncSource.kNone:case OncSource.kDevice:case OncSource.kUser:return PolicySource.kNone;case OncSource.kDevicePolicy:return PolicySource.kDevicePolicyEnforced;case OncSource.kUserPolicy:return PolicySource.kUserPolicyEnforced}assert(source!==undefined,"OncSource undefined");assertNotReached("Invalid OncSource: "+source.toString());return PolicySource.kNone}static getNetworkTypeDisplayName(type){return loadTimeData$1.getStringF("OncType"+OncMojo.getNetworkTypeString(type))}static getVpnDisplayName(networkName,providerName){if(providerName){return loadTimeData$1.getStringF("vpnNameTemplate",providerName,networkName)}return networkName}static getNetworkStateDisplayName(network){if(!network.name){return OncMojo.getNetworkTypeDisplayName(network.type)}if(network.type===NetworkType.kVPN&&network.typeState.vpn.providerName){return OncMojo.getVpnDisplayName(network.name,network.typeState.vpn.providerName)}return network.name}static getNetworkName(network){if(!network.name||!network.name.activeValue){return OncMojo.getNetworkTypeDisplayName(network.type)}if(network.type===NetworkType.kVPN&&network.typeProperties.vpn.providerName){return OncMojo.getVpnDisplayName(network.name.activeValue,network.typeProperties.vpn.providerName)}return network.name.activeValue}static getSignalStrength(network){switch(network.type){case NetworkType.kCellular:return network.typeState.cellular.signalStrength;case NetworkType.kTether:return network.typeState.tether.signalStrength;case NetworkType.kWiFi:return network.typeState.wifi.signalStrength}assertNotReached();return 0}static isNetworkConnectable(network){if(!OncMojo.networkTypeHasConfigurationFlow(network.type)){return true}return network.connectable}static isTypeKey(key){return key.startsWith("cellular")||key.startsWith("ethernet")||key.startsWith("tether")||key.startsWith("vpn")||key.startsWith("wifi")}static getManagedPropertyKey(key){if(OncMojo.isTypeKey(key)){key="typeProperties."+key}return key}static getDefaultNetworkState(type,opt_name){const result={connectable:false,connectRequested:false,connectionState:ConnectionStateType.kNotConnected,guid:opt_name?opt_name+"_guid":"",name:opt_name||"",portalState:PortalState.kUnknown,priority:0,proxyMode:ProxyMode.kDirect,prohibitedByPolicy:false,source:OncSource.kNone,type:type,typeState:{},dnsQueriesMonitored:false};switch(type){case NetworkType.kCellular:result.typeState.cellular={iccid:"",eid:"",activationState:ActivationStateType.kUnknown,networkTechnology:"",roaming:false,signalStrength:0,simLockEnabled:false,simLocked:false,simLockType:""};break;case NetworkType.kEthernet:result.typeState.ethernet={authentication:AuthenticationType.kNone};break;case NetworkType.kTether:result.typeState.tether={batteryPercentage:0,carrier:"",hasConnectedToHost:false,signalStrength:0};break;case NetworkType.kVPN:result.typeState.vpn={type:VpnType.kOpenVPN,providerId:"",providerName:""};break;case NetworkType.kWiFi:result.typeState.wifi={bssid:"",frequency:0,hexSsid:opt_name||"",hiddenSsid:false,security:SecurityType.kNone,signalStrength:0,ssid:""};break;default:assertNotReached()}return result}static managedPropertiesToNetworkState(properties){const networkState=OncMojo.getDefaultNetworkState(properties.type);networkState.connectable=properties.connectable;networkState.connectionState=properties.connectionState;networkState.guid=properties.guid;if(properties.name){networkState.name=properties.name.activeValue}if(properties.priority){networkState.priority=properties.priority.activeValue}networkState.source=properties.source;switch(properties.type){case NetworkType.kCellular:const cellularProperties=properties.typeProperties.cellular;networkState.typeState.cellular.iccid=cellularProperties.iccid||"";networkState.typeState.cellular.eid=cellularProperties.eid||"";networkState.typeState.cellular.activationState=cellularProperties.activationState;networkState.typeState.cellular.networkTechnology=cellularProperties.networkTechnology||"";networkState.typeState.cellular.roaming=cellularProperties.roamingState==="Roaming";networkState.typeState.cellular.signalStrength=cellularProperties.signalStrength;networkState.typeState.cellular.simLocked=cellularProperties.simLocked;break;case NetworkType.kEthernet:networkState.typeState.ethernet.authentication=OncMojo.getActiveValue(properties.typeProperties.ethernet.authentication)==="8021X"?AuthenticationType.k8021x:AuthenticationType.kNone;break;case NetworkType.kTether:if(properties.typeProperties.tether){networkState.typeState.tether=Object.assign({},properties.typeProperties.tether)}break;case NetworkType.kVPN:networkState.typeState.vpn.providerName=properties.typeProperties.vpn.providerName;networkState.typeState.vpn.type=properties.typeProperties.vpn.type;break;case NetworkType.kWiFi:const wifiProperties=properties.typeProperties.wifi;networkState.typeState.wifi.bssid=wifiProperties.bssid||"";networkState.typeState.wifi.frequency=wifiProperties.frequency;networkState.typeState.wifi.hexSsid=OncMojo.getActiveString(wifiProperties.hexSsid);networkState.typeState.wifi.security=wifiProperties.security;networkState.typeState.wifi.signalStrength=wifiProperties.signalStrength;networkState.typeState.wifi.ssid=OncMojo.getActiveString(wifiProperties.ssid);break}return networkState}static getDefaultManagedProperties(type,guid,name){const result={connectionState:ConnectionStateType.kNotConnected,source:OncSource.kNone,type:type,connectable:false,guid:guid,name:OncMojo.createManagedString(name),ipAddressConfigType:OncMojo.createManagedString("DHCP"),nameServersConfigType:OncMojo.createManagedString("DHCP"),portalState:PortalState.kUnknown,trafficCounterProperties:OncMojo.createTrafficCounterProperties()};switch(type){case NetworkType.kCellular:result.typeProperties={cellular:{activationState:ActivationStateType.kUnknown,signalStrength:0,simLocked:false,supportNetworkScan:false}};break;case NetworkType.kEthernet:result.typeProperties={ethernet:{}};break;case NetworkType.kTether:result.typeProperties={tether:{batteryPercentage:0,carrier:"",hasConnectedToHost:false,signalStrength:0}};break;case NetworkType.kVPN:result.typeProperties={vpn:{providerName:"",type:VpnType.kOpenVPN,openVpn:{}}};break;case NetworkType.kWiFi:result.typeProperties={wifi:{bssid:"",frequency:0,ssid:OncMojo.createManagedString(""),security:SecurityType.kNone,signalStrength:0,isSyncable:false,isConfiguredByActiveUser:false,passpointId:"",passpointMatchType:MatchType.kNoMatch}};break}return result}static getDefaultConfigProperties(type){switch(type){case NetworkType.kCellular:return{typeConfig:{cellular:{}}};case NetworkType.kEthernet:return{typeConfig:{ethernet:{}}};case NetworkType.kVPN:return{typeConfig:{vpn:{}}};case NetworkType.kWiFi:return{typeConfig:{wifi:{security:SecurityType.kNone,hiddenSsid:HiddenSsidMode.kAutomatic}}}}assertNotReached("Unexpected type: "+type.toString());return{typeConfig:{}}}static setConfigProperty(config,key,value){if(OncMojo.isTypeKey(key)){key="typeConfig."+key}while(true){const index=key.indexOf(".");if(index<0){break}const keyComponent=key.substr(0,index);if(!config.hasOwnProperty(keyComponent)){config[keyComponent]={}}config=config[keyComponent];key=key.substr(index+1)}config[key]=value}static getActiveValue(property){if(!property){return undefined}return property.activeValue}static getActiveString(property){if(!property){return""}return property.activeValue}static getIPConfigForType(properties,desiredType){const ipConfigs=properties.ipConfigs;let ipConfig;if(ipConfigs){ipConfig=ipConfigs.find((ipconfig=>ipconfig.type===desiredType));if(ipConfig&&desiredType!==IPConfigType.kIPv4){return ipConfig}}if(desiredType!==IPConfigType.kIPv4){return undefined}if(!ipConfig){ipConfig={routingPrefix:0}}const staticIpConfig=properties.staticIpConfig;if(!staticIpConfig){return ipConfig}if(properties.ipAddressConfigType&&properties.ipAddressConfigType.activeValue==="Static"){if(staticIpConfig.gateway){ipConfig.gateway=staticIpConfig.gateway.activeValue}if(staticIpConfig.ipAddress){ipConfig.ipAddress=staticIpConfig.ipAddress.activeValue}if(staticIpConfig.routingPrefix){ipConfig.routingPrefix=staticIpConfig.routingPrefix.activeValue}ipConfig.type=staticIpConfig.type}if(properties.nameServersConfigType&&properties.nameServersConfigType.activeValue==="Static"){if(staticIpConfig.nameServers){ipConfig.nameServers=staticIpConfig.nameServers.activeValue}}return ipConfig}static ipConfigPropertiesMatch(staticValue,newValue){if(staticValue.type!==newValue.type){return false}if(newValue.gateway!==undefined&&staticValue.gateway!==newValue.gateway){return false}if(newValue.ipAddress!==undefined&&staticValue.ipAddress!==newValue.ipAddress){return false}if(staticValue.routingPrefix!==newValue.routingPrefix){return false}return true}static getUpdatedIPConfigProperties(managedProperties,field,newValue){let ipConfigType=OncMojo.getActiveString(managedProperties.ipAddressConfigType)||"DHCP";let nsConfigType=OncMojo.getActiveString(managedProperties.nameServersConfigType)||"DHCP";let staticIpConfig=OncMojo.getIPConfigForType(managedProperties,IPConfigType.kIPv4);let nameServers=staticIpConfig?staticIpConfig.nameServers:undefined;if(field==="ipAddressConfigType"){const newIpConfigType=newValue;if(newIpConfigType===ipConfigType){return null}ipConfigType=newIpConfigType}else if(field==="nameServersConfigType"){const newNsConfigType=newValue;if(newNsConfigType===nsConfigType){return null}nsConfigType=newNsConfigType}else if(field==="staticIpConfig"){const ipConfigValue=newValue;if(!ipConfigValue.ipAddress){console.error("Invalid StaticIPConfig: "+JSON.stringify(newValue));return null}if(ipConfigType==="Static"&&staticIpConfig&&OncMojo.ipConfigPropertiesMatch(staticIpConfig,ipConfigValue)){return null}ipConfigType="Static";staticIpConfig=ipConfigValue}else if(field==="nameServers"){const newNameServers=newValue;if(!newNameServers||!newNameServers.length){console.error("Invalid NameServers: "+JSON.stringify(newValue))}if(nsConfigType==="Static"&&JSON.stringify(nameServers)===JSON.stringify(newNameServers)){return null}nsConfigType="Static";nameServers=newNameServers}else{console.error("Unexpected field: "+field);return null}const config=OncMojo.getDefaultConfigProperties(managedProperties.type);config.ipAddressConfigType=ipConfigType;config.nameServersConfigType=nsConfigType;if(ipConfigType==="Static"){assert(staticIpConfig&&staticIpConfig.ipAddress);config.staticIpConfig=staticIpConfig}if(nsConfigType==="Static"){assert(nameServers&&nameServers.length);config.staticIpConfig=config.staticIpConfig||{routingPrefix:0};config.staticIpConfig.nameServers=nameServers}return config}static getManagedAutoConnect(properties){const type=properties.type;switch(type){case NetworkType.kCellular:return properties.typeProperties.cellular.autoConnect;case NetworkType.kVPN:return properties.typeProperties.vpn.autoConnect;case NetworkType.kWiFi:return properties.typeProperties.wifi.autoConnect}return undefined}static createManagedString(s){return{activeValue:s,policySource:PolicySource.kNone,policyValue:undefined}}static createManagedInt(n){return{activeValue:n,policySource:PolicySource.kNone,policyValue:0}}static createManagedBool(b){return{activeValue:b,policySource:PolicySource.kNone,policyValue:false}}static createTrafficCounterProperties(){return{lastResetTime:null,autoReset:false,userSpecifiedResetDay:1}}static getConnectionStateString(connectionState){switch(connectionState){case ConnectionStateType.kOnline:case ConnectionStateType.kConnected:case ConnectionStateType.kPortal:return"OncConnected";case ConnectionStateType.kConnecting:return"OncConnecting";case ConnectionStateType.kNotConnected:return"OncNotConnected"}assertNotReached();return"OncNotConnected"}static ipAddressMatch(a,b){if(!a||!b){return!!a===!!b}const abytes=a.addressBytes;const bbytes=b.addressBytes;if(abytes.length!==bbytes.length){return false}for(let i=0;i<abytes.length;++i){if(abytes[i]!==bbytes[i]){return false}}return true}static simLockStatusMatch(a,b){if(!a||!b){return!!a===!!b}return a.lockType===b.lockType&&a.lockEnabled===b.lockEnabled&&a.retriesLeft===b.retriesLeft}static simInfosMatch(a,b){if(!a||!b){return!!a===!!b}if(a.length!==b.length){return false}for(let i=0;i<a.length;i++){const acurrent=a[i];const bcurrent=b[i];if(acurrent.slotId!==bcurrent.slotId||acurrent.eid!==bcurrent.eid||acurrent.iccid!==bcurrent.iccid||acurrent.isPrimary!==bcurrent.isPrimary){return false}}return true}static apnMatch(a,b){if(!a||!b){return!!a===!!b}return a.accessPointName===b.accessPointName&&a.name===b.name&&a.username===b.username&&a.password===b.password}static apnListMatch(a,b){if(!a||!b){return!!a===!!b}if(a.length!==b.length){return false}return a.every(((apn,index)=>OncMojo.apnMatch(apn,b[index])))}static isRestrictedConnectivity(portal){if(portal===undefined){return false}switch(portal){case PortalState.kUnknown:case PortalState.kOnline:return false;case PortalState.kPortalSuspected:case PortalState.kPortal:case PortalState.kProxyAuthRequired:case PortalState.kNoInternet:return true}assertNotReached();return false}static serializeDomainSuffixMatch(domainSuffixMatch){if(!domainSuffixMatch||domainSuffixMatch.length===0){return""}return domainSuffixMatch.join(";")}static deserializeDomainSuffixMatch(domainSuffixMatch){const entries=domainSuffixMatch.trim().split(";");const result=[];for(const e of entries){const value=VALID_DNS_CHARS_REGEX.exec(e);if(!value||value.length!==1){console.warn("Invalid Domain Suffix Match entry: "+e);return null}const entry=value[0].trim();if(entry!==""){result.push(value[0])}}return result}static serializeSubjectAltNameMatch(subjectAltNameMatch){if(!subjectAltNameMatch||subjectAltNameMatch.length===0){return""}const result=[];for(const e of subjectAltNameMatch){let type;switch(e.type){case SubjectAltName_Type.kEmail:type="EMAIL";break;case SubjectAltName_Type.kDns:type="DNS";break;case SubjectAltName_Type.kUri:type="URI";break;default:assertNotReached("Unknown subjectAltNameMatchType "+e.type)}result.push(type+":"+e.value)}return result.join(";")}static deserializeSubjectAltNameMatch(subjectAltNameMatch){const regValidEmailChars=RegExp("^[a-zA-Z0-9-\\.\\+_~@]*$");const regValidUriChars=RegExp("^[a-zA-Z0-9-\\._~:/?#\\[\\]@!$&'()\\*\\+,;=]*$");const entries=subjectAltNameMatch.trim().split(";");const result=[];for(const entry of entries){if(entry===""){continue}let type;let value;if(entry.toUpperCase().startsWith("EMAIL:")){type=SubjectAltName_Type.kEmail;value=regValidEmailChars.exec(entry.substring(6))}else if(entry.toUpperCase().startsWith("DNS:")){type=SubjectAltName_Type.kDns;value=VALID_DNS_CHARS_REGEX.exec(entry.substring(4))}else if(entry.toUpperCase().startsWith("URI:")){type=SubjectAltName_Type.kUri;value=regValidUriChars.exec(entry.substring(4))}else{console.warn("Invalid Subject Alternative Name Match type "+entry);return null}if(!value||value.length!==1){console.warn("Invalid Subject Alternative Name Match value "+entry);return null}result.push({type:type,value:value[0]})}return result}}OncMojo.USE_ATTACH_APN_NAME="attach";function getTemplate$z(){return html`<!--_html_template_start_--><style include="cr-shared-style cups-printer-shared"></style>
<add-printer-dialog>
  <div slot="dialog-title">
    <iron-icon
      hidden="[[!pendingPrinter_.isManaged]]"
      icon="cr20:domain">
    </iron-icon>
    [[getDialogTitle_(pendingPrinter_.isManaged)]]
    <printer-dialog-error error-text="[[errorText_]]">
    </printer-dialog-error>
  </div>
  <div slot="dialog-body">
    <div class="settings-box first two-line">
      <cr-input class="printer-name-input"
          id="printerName"
          value="{{pendingPrinter_.printerName}}"
          on-input="onPrinterInfoChange_"
          label="Name"
          aria-label="Name"
          readonly="[[pendingPrinter_.isManaged]]"
          maxlength=64>
      </cr-input>
    </div>
    <div class="settings-box two-line">
      <cr-input label="Address"
          aria-label="Address"
          id="printerAddress"
          on-input="onPrinterInfoChange_"
          value="{{pendingPrinter_.printerAddress}}"
          disabled="[[!isInputFieldEnabled_(networkProtocolActive_,
              pendingPrinter_.printServerUri)]]"
          maxlength=63
          readonly="[[isInputFieldReadonly_(pendingPrinter_.isManaged,
              isOnline_)]]">
      </cr-input>
    </div>
    <div class="settings-box two-line">
      <div class="start">
        <div id="printerProtocol" class="cr-form-field-label"
            aria-hidden="true">
          Protocol
        </div>
        <div class="secondary">
          <select class="md-select" aria-labelledby="printerProtocol"
              value="[[pendingPrinter_.printerProtocol]]"
              on-change="onProtocolChange_"
              disabled="[[!protocolSelectEnabled_(
                  networkProtocolActive_,
                  pendingPrinter_.printServerUri,
                  pendingPrinter_.isManaged,
                  isOnline_)]]">
            <option value="ipp">
              Internet Printing Protocol (IPP)
            </option>
            <option value="ipps">
              Internet Printing Protocol (IPPS)
            </option>
            <option value="http"
                disabled="[[isAutoconfPrinter_(pendingPrinter_.*)]]">
              Hypertext Transport Protocol (HTTP)
            </option>
            <option value="https"
                disabled="[[isAutoconfPrinter_(pendingPrinter_.*)]]">
              Hypertext Transport Protocol Secure (HTTPS)
            </option>
            <option value="socket"
                disabled="[[isAutoconfPrinter_(pendingPrinter_.*)]]">
              AppSocket (TCP/IP)
            </option>
            <option value="lpd"
                disabled="[[isAutoconfPrinter_(pendingPrinter_.*)]]">
              Line Printer Daemon (LPD)
            </option>
            <option value="usb" disabled="[[networkProtocolActive_]]">
              USB
            </option>
            <option value="ippusb" disabled="[[networkProtocolActive_]]">
              IPP over USB (IPPUSB)
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="settings-box two-line">
      <cr-input id="printerQueue" label="Queue"
          aria-label="Queue"
          value="{{pendingPrinter_.printerQueue}}"
          on-input="onPrinterInfoChange_"
          maxlength=64
          disabled="[[!isInputFieldEnabled_(networkProtocolActive_,
              pendingPrinter_.printServerUri)]]"
          readonly="[[isInputFieldReadonly_(pendingPrinter_.isManaged,
              isOnline_)]]">
      </cr-input>
    </div>
    <div class="settings-box two-line">
      <cr-input label="URI" readonly
          aria-label="URI"
          value="[[getPrinterUri_(pendingPrinter_)]]"
          disabled="[[!isInputFieldEnabled_(networkProtocolActive_,
              pendingPrinter_.printServerUri)]]"
          readonly="[[pendingPrinter_.isManaged]]">
      </cr-input>
    </div>
    <template id="makeAndModelSection" is="dom-if"
        if="[[!isAutoconfPrinter_(pendingPrinter_.*)]]">
      <div class="settings-box two-line">
        <cr-searchable-drop-down items="[[manufacturerList]]"
            id="printerPPDManufacturer"
            label="Manufacturer"
            aria-label="Manufacturer"
            value="{{pendingPrinter_.ppdManufacturer}}"
            readonly="[[isInputFieldReadonly_(pendingPrinter_.isManaged,
                isOnline_)]]"
            invalid="{{isManufacturerInvalid_}}">
        </cr-searchable-drop-down>
      </div>
      <div class="settings-box two-line">
        <cr-searchable-drop-down items="[[modelList]]"
            id="printerPPDModel"
            label="Model"
            value="{{pendingPrinter_.ppdModel}}"
            readonly="[[isInputFieldReadonly_(pendingPrinter_.isManaged,
                isOnline_)]]"
            invalid="{{isModelInvalid_}}">
        </cr-searchable-drop-down>
      </div>
      <div id="ppdLabel" class="cr-form-field-label"
           hidden="[[pendingPrinter_.isManaged]]">
        <div class="select-ppd-and-view">
          <cr-button class="ppd-button" on-click="onViewPpd_"
                     disabled="[[!isViewPpdEnabled_(printerInfoChanged_,
                         viewPpdEnabled_)]]">
            View printer PPD
          </cr-button>
          <localized-link localized-string="or select PPD. &lt;a&gt;Learn more&lt;/a&gt;"
                          link-url="https://support.google.com/chromebook/?p=printing_advancedconfigurations&amp;b=jacuzzi-signed-mp-v13keys">
          </localized-link>
        </div>
      </div>
      <div class="settings-box two-line"
           hidden="[[pendingPrinter_.isManaged]]">
        <cr-input class="browse-file-input" readonly input-tabindex="-1"
            value="[[userPPD_]]" aria-labelledby="ppdLabel"
            error-message="Invalid file selected. Try again."
            invalid="[[invalidPPD_]]">
        </cr-input>
        <cr-button class="browse-button" on-click="onBrowseFile_"
            disabled="[[!isOnline_]]"
            aria-label="Browse to specify your printer PPD">
          Browse
        </cr-button>
      </div>
    </template>
  </div>
  <div slot="dialog-buttons">
    <div>
      <div class="eula" id="eulaUrl" hidden="[[!eulaUrl_]]">
        <a href="[[eulaUrl_]]" target="_blank">End User Licence Agreement</a>
      </div>
    </div>
    <div>
      <cr-button class="cancel-button" on-click="onCancelClick_"
          hidden="[[pendingPrinter_.isManaged]]">
        Cancel
      </cr-button>
      <cr-button class="action-button" on-click="onSaveClick_"
          disabled="[[!canSavePrinter_(pendingPrinter_.*,
              printerInfoChanged_,
              isOnline_, isManufacturerInvalid_, isModelInvalid_)]]"
              hidden="[[pendingPrinter_.isManaged]]">
        Save
      </cr-button>
      <cr-button class="close-button" on-click="onCancelClick_"
       hidden="[[!pendingPrinter_.isManaged]]">
       Close
      </cr-button>
    </div>
  </div>
</add-printer-dialog>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
function isNetworkProtocol(protocol){return["ipp","ipps","http","https","socket","lpd"].includes(protocol)}function isNameAndAddressValid(printer){if(!printer){return false}const name=printer.printerName;const address=printer.printerAddress;if(!isNetworkProtocol(printer.printerProtocol)&&!!name){return true}if(!name||!address){return false}const hostnamePrefix="([a-z\\d]|[a-z\\d][a-z\\d\\-]{0,61}[a-z\\d])";const hostnameSuffix=`(\\.${hostnamePrefix})*`;const portNumber="(:\\d+)?";const ipv6Full="(([a-f\\d]){1,4}(:(:)?([a-f\\d]){1,4}){1,7})";const ipv6Prefix="(::([a-f\\d]){1,4})";const ipv6Suffix="(([a-f\\d]){1,4}::)";const ipv6Combined=`(${ipv6Full}|${ipv6Prefix}|${ipv6Suffix})`;const ipv6WithPort=`(\\[${ipv6Combined}\\]${portNumber})`;const hostnameRegex=new RegExp(`^${hostnamePrefix}${hostnameSuffix}${portNumber}$`,"i");const ipv6AddressRegex=new RegExp(`^(${ipv6Combined}|${ipv6WithPort})$`,"i");const invalidIpv6Regex=new RegExp(".*::.*::.*");return hostnameRegex.test(address)||ipv6AddressRegex.test(address)&&!invalidIpv6Regex.test(address)}function isPPDInfoValid(manufacturer,model,ppdPath){return!!(manufacturer&&model||ppdPath)}function getBaseName(path){if(path&&path.length>0){return path.substring(path.lastIndexOf("/")+1)}return""}function alphabeticalSort(first,second){return first.printerName.toLocaleLowerCase().localeCompare(second.printerName.toLocaleLowerCase())}function getErrorText(result){switch(result){case PrinterSetupResult.FATAL_ERROR:return loadTimeData.getString("printerAddedFatalErrorMessage");case PrinterSetupResult.PRINTER_UNREACHABLE:return loadTimeData.getString("printerAddedUnreachableMessage");case PrinterSetupResult.DBUS_ERROR:return loadTimeData.getString("printerAddedFailedMessage");case PrinterSetupResult.NATIVE_PRINTERS_NOT_ALLOWED:return loadTimeData.getString("printerAddedNativePrintersNotAllowedMessage");case PrinterSetupResult.INVALID_PRINTER_UPDATE:return loadTimeData.getString("editPrinterInvalidPrinterUpdate");case PrinterSetupResult.PPD_TOO_LARGE:return loadTimeData.getString("printerAddedPpdTooLargeMessage");case PrinterSetupResult.INVALID_PPD:return loadTimeData.getString("printerAddedInvalidPpdMessage");case PrinterSetupResult.PPD_NOT_FOUND:return loadTimeData.getString("printerAddedPpdNotFoundMessage");case PrinterSetupResult.PPD_UNRETRIEVABLE:return loadTimeData.getString("printerAddedPpdUnretrievableMessage");default:return loadTimeData.getString("printerAddedFailedMessage")}}function getPrintServerErrorText(result){switch(result){case PrintServerResult.CONNECTION_ERROR:return loadTimeData.getString("printServerConnectionError");case PrintServerResult.CANNOT_PARSE_IPP_RESPONSE:case PrintServerResult.HTTP_ERROR:return loadTimeData.getString("printServerConfigurationErrorMessage");default:assertNotReached$1()}}function sortPrinters(first,second){if(first.printerType===second.printerType){return alphabeticalSort(first.printerInfo,second.printerInfo)}return first.printerType-second.printerType}function matchesSearchTerm(printer,searchTerm){return printer.printerName.toLowerCase().includes(searchTerm.toLowerCase())}function findDifference(firstArr,secondArr){return firstArr.filter((p1=>!secondArr.some((p2=>p2.printerInfo.printerId===p1.printerInfo.printerId))))}
// Copyright 2022 The Chromium Authors
var DialogActions;(function(DialogActions){DialogActions[DialogActions["DIALOG_OPENED"]=0]="DIALOG_OPENED";DialogActions[DialogActions["VIEW_PPD_CLICKED"]=1]="VIEW_PPD_CLICKED"})(DialogActions||(DialogActions={}));const METRICS_KEYWORD="Printing.CUPS.EditDialog";const SettingsCupsEditPrinterDialogElementBase=mixinBehaviors([NetworkListenerBehavior],i16nMixin(PolymerElement));class SettingsCupsEditPrinterDialogElement extends SettingsCupsEditPrinterDialogElementBase{static get is(){return"settings-cups-edit-printer-dialog"}static get template(){return getTemplate$z()}static get properties(){return{activePrinter:Object,pendingPrinter_:Object,needsReconfigured_:{type:Boolean,value:false},userPPD_:String,arePrinterFieldsInitialized_:{type:Boolean,value:false},printerInfoChanged_:{type:Boolean,value:false},viewPpdEnabled_:{type:Boolean,value:loadTimeData.getBoolean("isViewPpdEnabled")},networkProtocolActive_:{type:Boolean,computed:"isNetworkProtocol_(pendingPrinter_.printerProtocol)"},manufacturerList:Array,modelList:Array,invalidPPD_:{type:Boolean,value:false},newUserPPD_:String,eulaUrl_:{type:String,value:""},isOnline_:{type:Boolean,value:true},errorText_:{type:String,value:""},isManufacturerInvalid_:{type:Boolean,value:false},isModelInvalid_:{type:Boolean,value:false}}}static get observers(){return["printerPathChanged_(pendingPrinter_.*)","selectedEditManufacturerChanged_(pendingPrinter_.ppdManufacturer)","onModelChanged_(pendingPrinter_.ppdModel)"]}constructor(){super();this.browserProxy_=CupsPrintersBrowserProxyImpl.getInstance();this.networkConfig_=MojoInterfaceProviderImpl.getInstance().getMojoServiceRemote()}connectedCallback(){super.connectedCallback();chrome.metricsPrivate.recordEnumerationValue(METRICS_KEYWORD,DialogActions.DIALOG_OPENED,Object.keys(DialogActions).length);this.pendingPrinter_=Object.assign({},this.activePrinter);this.refreshNetworks_();this.browserProxy_.getPrinterPpdManufacturerAndModel(this.pendingPrinter_.printerId).then(this.onGetPrinterPpdManufacturerAndModel_.bind(this),this.onGetPrinterPpdManufacturerAndModelFailed_.bind(this));this.browserProxy_.getCupsPrinterManufacturersList().then(this.manufacturerListChanged_.bind(this));this.userPPD_=getBaseName(this.pendingPrinter_.printerPPDPath)}onActiveNetworksChanged(networks){this.isOnline_=networks.some((function(network){return OncMojo.connectionStateIsConnected(network.connectionState)}))}printerPathChanged_(change){if(change.path!=="pendingPrinter_.printerName"){this.needsReconfigured_=true}}onProtocolChange_(event){const selectEl=cast(event.target,HTMLSelectElement);this.set("pendingPrinter_.printerProtocol",selectEl.value);this.onPrinterInfoChange_()}onPrinterInfoChange_(){this.printerInfoChanged_=true}onCancelClick_(){this.shadowRoot.querySelector("add-printer-dialog").close()}onPrinterEditSucceeded_(result){const showCupsPrinterToastEvent=new CustomEvent("show-cups-printer-toast",{bubbles:true,composed:true,detail:{resultCode:result,printerName:this.activePrinter.printerName}});this.dispatchEvent(showCupsPrinterToastEvent);this.shadowRoot.querySelector("add-printer-dialog").close()}onPrinterEditFailed_(result){this.errorText_=getErrorText(result)}onSaveClick_(){this.updateActivePrinter_();if(!this.needsReconfigured_||!this.isOnline_){this.browserProxy_.updateCupsPrinter(this.activePrinter.printerId,this.activePrinter.printerName).then(this.onPrinterEditSucceeded_.bind(this),this.onPrinterEditFailed_.bind(this))}else{this.browserProxy_.reconfigureCupsPrinter(this.activePrinter).then(this.onPrinterEditSucceeded_.bind(this),this.onPrinterEditFailed_.bind(this))}recordSettingChange()}getDialogTitle_(){return this.pendingPrinter_.isManaged?this.i16n("viewPrinterDialogTitle"):this.i16n("editPrinterDialogTitle")}getPrinterUri_(printer){if(!printer){return""}else if(printer.printerProtocol&&printer.printerAddress&&printer.printerQueue){return printer.printerProtocol+"://"+printer.printerAddress+"/"+printer.printerQueue}else if(printer.printerProtocol&&printer.printerAddress){return printer.printerProtocol+"://"+printer.printerAddress}else{return""}}onGetPrinterPpdManufacturerAndModel_(info){this.set("pendingPrinter_.ppdManufacturer",info.ppdManufacturer);this.set("pendingPrinter_.ppdModel",info.ppdModel);this.needsReconfigured_=false}onGetPrinterPpdManufacturerAndModelFailed_(){this.needsReconfigured_=false}isNetworkProtocol_(protocol){return isNetworkProtocol(protocol)}isAutoconfPrinter_(){return this.pendingPrinter_.printerPpdReference.autoconf}canSavePrinter_(){return this.printerInfoChanged_&&(this.isPrinterConfigured_()||!this.isOnline_)&&!this.isManufacturerInvalid_&&!this.isModelInvalid_}selectedEditManufacturerChanged_(manufacturer){this.set("pendingPrinter_.ppdModel","");this.modelList=[];if(!!manufacturer&&manufacturer.length!==0){this.browserProxy_.getCupsPrinterModelsList(manufacturer).then(this.modelListChanged_.bind(this))}}onModelChanged_(){if(this.arePrinterFieldsInitialized_){this.printerInfoChanged_=true}if(!this.pendingPrinter_.ppdManufacturer||!this.pendingPrinter_.ppdModel){this.onGetEulaUrlCompleted_("");return}this.attemptPpdEulaFetch_()}onGetEulaUrlCompleted_(eulaUrl){this.eulaUrl_=eulaUrl}onViewPpd_(){chrome.metricsPrivate.recordEnumerationValue(METRICS_KEYWORD,DialogActions.VIEW_PPD_CLICKED,Object.keys(DialogActions).length);const eula=this.eulaUrl_||"";this.browserProxy_.retrieveCupsPrinterPpd(this.activePrinter.printerId,this.activePrinter.printerName,eula)}onBrowseFile_(){this.browserProxy_.getCupsPrinterPpdPath().then(this.printerPpdPathChanged_.bind(this))}manufacturerListChanged_(manufacturersInfo){if(!manufacturersInfo.success){return}this.manufacturerList=manufacturersInfo.manufacturers;if(this.pendingPrinter_.ppdManufacturer.length!==0){this.browserProxy_.getCupsPrinterModelsList(this.pendingPrinter_.ppdManufacturer).then(this.modelListChanged_.bind(this))}}modelListChanged_(modelsInfo){if(modelsInfo.success){this.modelList=modelsInfo.models;this.arePrinterFieldsInitialized_=true;this.attemptPpdEulaFetch_()}}printerPpdPathChanged_(path){this.set("pendingPrinter_.printerPPDPath",path);this.invalidPPD_=!path;if(!this.invalidPPD_){this.onPrinterInfoChange_()}this.userPPD_=getBaseName(path)}isPrinterConfigured_(){return isNameAndAddressValid(this.pendingPrinter_)&&(this.isAutoconfPrinter_()||isPPDInfoValid(this.pendingPrinter_.ppdManufacturer,this.pendingPrinter_.ppdModel,this.pendingPrinter_.printerPPDPath))}updateActivePrinter_(){if(!this.isOnline_){this.activePrinter.printerName=this.pendingPrinter_.printerName;return}this.activePrinter=Object.assign({},this.pendingPrinter_);this.activePrinter.ppdModel=this.pendingPrinter_.ppdModel}refreshNetworks_(){this.networkConfig_.getNetworkStateList({filter:FilterType.kActive,networkType:NetworkType.kAll,limit:NO_LIMIT}).then((responseParams=>{this.onActiveNetworksChanged(responseParams.result)}))}protocolSelectEnabled_(){if(this.pendingPrinter_){if(this.pendingPrinter_.printServerUri){return false}if(this.pendingPrinter_.isManaged){return false}}return this.isOnline_&&this.networkProtocolActive_}attemptPpdEulaFetch_(){if(!this.pendingPrinter_.ppdManufacturer||!this.pendingPrinter_.ppdModel){return}this.browserProxy_.getEulaUrl(this.pendingPrinter_.ppdManufacturer,this.pendingPrinter_.ppdModel).then(this.onGetEulaUrlCompleted_.bind(this))}isInputFieldEnabled_(){if(this.pendingPrinter_.printServerUri){return false}return this.networkProtocolActive_}isInputFieldReadonly_(){return!this.isOnline_||this.pendingPrinter_&&this.pendingPrinter_.isManaged}isViewPpdEnabled_(){return this.viewPpdEnabled_&&!this.printerInfoChanged_}}customElements.define(SettingsCupsEditPrinterDialogElement.is,SettingsCupsEditPrinterDialogElement);
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var PrinterType;(function(PrinterType){PrinterType[PrinterType["SAVED"]=0]="SAVED";PrinterType[PrinterType["PRINTSERVER"]=1]="PRINTSERVER";PrinterType[PrinterType["AUTOMATIC"]=2]="AUTOMATIC";PrinterType[PrinterType["DISCOVERED"]=3]="DISCOVERED";PrinterType[PrinterType["ENTERPRISE"]=4]="ENTERPRISE"})(PrinterType||(PrinterType={}));
// Copyright 2022 The Chromium Authors
class FocusRowMixinDelegate{constructor(listItem){this.listItem_=listItem}onFocus(_row,e){const element=e.composedPath()[0];const focusableElement=FocusRow$1.getFocusableElement(element);if(element!==focusableElement){focusableElement.focus()}this.listItem_.lastFocused=focusableElement}onKeydown(_row,e){if(e.key==="Enter"){e.stopPropagation()}return false}getCustomEquivalent(sampleElement){return this.listItem_.overrideCustomEquivalent?this.listItem_.getCustomEquivalent(sampleElement):null}}let VirtualFocusRow$1=class VirtualFocusRow extends FocusRow$1{constructor(root,delegate){super(root,null,delegate)}getCustomEquivalent(sampleElement){const equivalent=this.delegate?this.delegate.getCustomEquivalent(sampleElement):null;return equivalent||super.getCustomEquivalent(sampleElement)}};const FocusRowMixin=dedupingMixin((superClass=>{class FocusRowMixin extends superClass{constructor(){super(...arguments);this.firstControl_=null;this.controlObservers_=[];this.boundOnFirstControlKeydown_=null}static get properties(){return{row_:Object,mouseFocused_:Boolean,id:{type:String,reflectToAttribute:true},isFocused:{type:Boolean,notify:true},focusRowIndex:{type:Number,observer:"focusRowIndexChanged"},lastFocused:{type:Object,notify:true},ironListTabIndex:{type:Number,observer:"ironListTabIndexChanged_"},listBlurred:{type:Boolean,notify:true}}}connectedCallback(){super.connectedCallback();this.classList.add("no-outline");this.boundOnFirstControlKeydown_=this.onFirstControlKeydown_.bind(this);afterNextRender(this,(()=>{const rowContainer=this.root.querySelector("[focus-row-container]");assert$1(rowContainer);this.row_=new VirtualFocusRow$1(rowContainer,new FocusRowMixinDelegate(this));this.addItems_();this.addEventListener("focus",this.onFocus_);this.addEventListener("dom-change",this.addItems_);this.addEventListener("mousedown",this.onMouseDown_);this.addEventListener("blur",this.onBlur_)}))}disconnectedCallback(){super.disconnectedCallback();this.removeEventListener("focus",this.onFocus_);this.removeEventListener("dom-change",this.addItems_);this.removeEventListener("mousedown",this.onMouseDown_);this.removeEventListener("blur",this.onBlur_);this.removeObservers_();if(this.firstControl_&&this.boundOnFirstControlKeydown_){this.firstControl_.removeEventListener("keydown",this.boundOnFirstControlKeydown_);this.boundOnFirstControlKeydown_=null}if(this.row_){this.row_.destroy()}}computeId_(index){return index!==undefined?`frb${index}`:undefined}focusRowIndexChanged(newIndex,oldIndex){this.setAttribute("aria-rowindex",(newIndex+1).toString());if(this.id===this.computeId_(oldIndex)){this.id=this.computeId_(newIndex)||""}}getFocusRow(){assert$1(this.row_);return this.row_}updateFirstControl_(){const newFirstControl=this.row_.getFirstFocusable();if(newFirstControl===this.firstControl_){return}if(this.firstControl_){this.firstControl_.removeEventListener("keydown",this.boundOnFirstControlKeydown_)}this.firstControl_=newFirstControl;if(this.firstControl_){this.firstControl_.addEventListener("keydown",this.boundOnFirstControlKeydown_)}}removeObservers_(){if(this.controlObservers_.length>0){this.controlObservers_.forEach((observer=>{observer.disconnect()}))}this.controlObservers_=[]}addItems_(){this.ironListTabIndexChanged_();if(this.row_){this.removeObservers_();this.row_.destroy();const controls=this.root.querySelectorAll("[focus-row-control]");controls.forEach((control=>{assert$1(control);this.row_.addItem(control.getAttribute("focus-type"),FocusRow$1.getFocusableElement(control));this.addMutationObservers_(control)}));this.updateFirstControl_()}}createObserver_(){return new MutationObserver((mutations=>{const mutation=mutations[0];if(mutation.attributeName==="style"&&mutation.oldValue){const newStyle=window.getComputedStyle(mutation.target);const oldDisplayValue=mutation.oldValue.match(/^display:(.*)(?=;)/);const oldVisibilityValue=mutation.oldValue.match(/^visibility:(.*)(?=;)/);if(oldDisplayValue&&newStyle.display===oldDisplayValue[1].trim()&&oldVisibilityValue&&newStyle.visibility===oldVisibilityValue[1].trim()){return}}this.updateFirstControl_()}))}addMutationObservers_(control){let current=control;while(current&&current!==this.root){const currentObserver=this.createObserver_();currentObserver.observe(current,{attributes:true,attributeFilter:["hidden","disabled","style"],attributeOldValue:true});this.controlObservers_.push(currentObserver);current=current.parentNode}}onFocus_(e){if(this.mouseFocused_){this.mouseFocused_=false;return}const restoreFocusToFirst=this.listBlurred&&e.composedPath()[0]===this;if(this.lastFocused&&!restoreFocusToFirst){focusWithoutInk$1(this.row_.getEquivalentElement(this.lastFocused))}else{assert$1(this.firstControl_);const firstFocusable=this.firstControl_;focusWithoutInk$1(firstFocusable)}this.listBlurred=false;this.isFocused=true}onFirstControlKeydown_(e){const keyEvent=e;if(keyEvent.shiftKey&&keyEvent.key==="Tab"){this.focus()}}ironListTabIndexChanged_(){if(this.row_){this.row_.makeActive(this.ironListTabIndex===0)}if(this.ironListTabIndex===0){this.listBlurred=false}}onMouseDown_(){this.mouseFocused_=true}onBlur_(e){this.mouseFocused_=false;this.isFocused=false;const node=e.relatedTarget?e.relatedTarget:null;if(!this.parentNode.contains(node)){this.listBlurred=true}}}return FocusRowMixin}));function getTemplate$y(){return html`<!--_html_template_start_--><style include="settings-shared">
  :host-context(body.jelly-enabled) .list-item:focus-within {
    background-color: var(--cros-sys-hover_on_subtle);
  }

  .icon-more-vert {
    background-color: none;
  }

  .printer-name {
    flex: 1;
  }

  .list-item:focus-within {
    background-color: var(--cros-highlight-color);
    outline: none;
  }
</style>
<div focus-row-container>
  <div id="entry" class="list-item" focus-row-control focus-type="entry">
    <div class="printer-name text-elide">
      <span id="printerName" aria-hidden="true">
          <iron-icon
            hidden="[[!printerEntry.printerInfo.isManaged]]"
            icon="cr20:domain">
          </iron-icon>
          <iron-icon id="printerStatusIcon"
            hidden="[[!showPrinterStatusIcon_(printerEntry.printerType)]]"
            icon="[[getPrinterStatusIcon_(
                printerEntry.printerInfo.printerOnlineState)]]">
          </iron-icon>
          [[printerEntry.printerInfo.printerName]]
      </span>
      <div id="printerSubtext" hidden="[[!subtext]]" class="secondary"
          aria-hidden="true">
        [[subtext]]
      </div>
    </div>
    <template is="dom-if"
        if="[[showActionsMenu_(printerEntry.printerType)]]">
      <cr-icon-button id="moreActions" class="icon-more-vert"
          on-click="onOpenActionMenuClick_" title="More actions"
          aria-labelledby="printerName" focus-row-control
          focus-type="moreActions" tabindex$="[[tabindex]]">
      </cr-icon-button>
    </template>
    <template is="dom-if"
        if="[[isDiscoveredPrinter_(printerEntry.printerType)]]">
      <cr-button id="setupPrinterButton"
          on-click="onAddDiscoveredPrinterClick_"
          aria-label$="[[getSetupButtonAria_()]]"
          focus-row-control
          focus-type="setupPrinterButton"
          disabled="[[isConfigureDisabled_(userPrintersAllowed,
              savingPrinter)]]">
        Set up
      </cr-button>
    </template>
    <template is="dom-if"
        if="[[isAutomaticPrinter_(printerEntry.printerType)]]">
      <cr-button id="automaticPrinterButton" class="save-printer-button"
          on-click="onAddAutomaticPrinterClick_"
          aria-label$="[[getSaveButtonAria_()]]"
          focus-row-control
          focus-type="automaticPrinterButton"
          disabled="[[isConfigureDisabled_(userPrintersAllowed,
              savingPrinter)]]">
        Save
      </cr-button>
    </template>
    <template is="dom-if"
        if="[[isPrintServerPrinter_(printerEntry.printerType)]]">
      <cr-button id="savePrinterButton"
      class="save-printer-button" on-click="onAddServerPrinterClick_"
          aria-label$="[[getSaveButtonAria_()]]"
          focus-row-control
          focus-type="savePrinterButton"
          disabled="[[isConfigureDisabled_(userPrintersAllowed,
              savingPrinter)]]">
        Save
      </cr-button>
    </template>
  </div>
</div>
<!--_html_template_end_-->`}
// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var PrinterStatusReason;(function(PrinterStatusReason){PrinterStatusReason[PrinterStatusReason["UNKNOWN_REASON"]=0]="UNKNOWN_REASON";PrinterStatusReason[PrinterStatusReason["DEVICE_ERROR"]=1]="DEVICE_ERROR";PrinterStatusReason[PrinterStatusReason["DOOR_OPEN"]=2]="DOOR_OPEN";PrinterStatusReason[PrinterStatusReason["LOW_ON_INK"]=3]="LOW_ON_INK";PrinterStatusReason[PrinterStatusReason["LOW_ON_PAPER"]=4]="LOW_ON_PAPER";PrinterStatusReason[PrinterStatusReason["NO_ERROR"]=5]="NO_ERROR";PrinterStatusReason[PrinterStatusReason["OUT_OF_INK"]=6]="OUT_OF_INK";PrinterStatusReason[PrinterStatusReason["OUT_OF_PAPER"]=7]="OUT_OF_PAPER";PrinterStatusReason[PrinterStatusReason["OUTPUT_ALMOST_FULL"]=8]="OUTPUT_ALMOST_FULL";PrinterStatusReason[PrinterStatusReason["OUTPUT_FULL"]=9]="OUTPUT_FULL";PrinterStatusReason[PrinterStatusReason["PAPER_JAM"]=10]="PAPER_JAM";PrinterStatusReason[PrinterStatusReason["PAUSED"]=11]="PAUSED";PrinterStatusReason[PrinterStatusReason["PRINTER_QUEUE_FULL"]=12]="PRINTER_QUEUE_FULL";PrinterStatusReason[PrinterStatusReason["PRINTER_UNREACHABLE"]=13]="PRINTER_UNREACHABLE";PrinterStatusReason[PrinterStatusReason["STOPPED"]=14]="STOPPED";PrinterStatusReason[PrinterStatusReason["TRAY_MISSING"]=15]="TRAY_MISSING"})(PrinterStatusReason||(PrinterStatusReason={}));var PrinterStatusSeverity;(function(PrinterStatusSeverity){PrinterStatusSeverity[PrinterStatusSeverity["UNKNOWN_SEVERITY"]=0]="UNKNOWN_SEVERITY";PrinterStatusSeverity[PrinterStatusSeverity["REPORT"]=1]="REPORT";PrinterStatusSeverity[PrinterStatusSeverity["WARNING"]=2]="WARNING";PrinterStatusSeverity[PrinterStatusSeverity["ERROR"]=3]="ERROR"})(PrinterStatusSeverity||(PrinterStatusSeverity={}));var PrinterOnlineState;(function(PrinterOnlineState){PrinterOnlineState[PrinterOnlineState["UNKNOWN"]=0]="UNKNOWN";PrinterOnlineState[PrinterOnlineState["OFFLINE"]=1]="OFFLINE";PrinterOnlineState[PrinterOnlineState["ONLINE"]=2]="ONLINE"})(PrinterOnlineState||(PrinterOnlineState={}));function getStatusReasonFromPrinterStatus(printerStatus){if(!printerStatus.printerId){console.warn("Received printer status missing printer id");return PrinterStatusReason.UNKNOWN_REASON}let statusReason=PrinterStatusReason.NO_ERROR;for(const printerStatusReason of printerStatus.statusReasons){const reason=printerStatusReason.reason;const severity=printerStatusReason.severity;if(severity!==PrinterStatusSeverity.ERROR&&severity!==PrinterStatusSeverity.WARNING){continue}if(reason!==PrinterStatusReason.UNKNOWN_REASON&&severity===PrinterStatusSeverity.ERROR){return reason}if(reason!==PrinterStatusReason.UNKNOWN_REASON||statusReason===PrinterStatusReason.NO_ERROR){statusReason=reason}}return statusReason}
// Copyright 2022 The Chromium Authors
const SettingsCupsPrintersEntryElementBase=FocusRowMixin(PolymerElement);class SettingsCupsPrintersEntryElement extends SettingsCupsPrintersEntryElementBase{static get is(){return"settings-cups-printers-entry"}static get template(){return getTemplate$y()}static get properties(){return{printerEntry:Object,subtext:{type:String,value:""},savingPrinter:Boolean,userPrintersAllowed:{type:Boolean,value:false},isPrinterSettingsRevampEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("isPrinterSettingsRevampEnabled"),readOnly:true}}}onOpenActionMenuClick_(e){const openActionMenuEvent=new CustomEvent("open-action-menu",{bubbles:true,composed:true,detail:{target:e.target,item:this.printerEntry}});this.dispatchEvent(openActionMenuEvent)}onAddDiscoveredPrinterClick_(){const queryDiscoveredPrinterEvent=new CustomEvent("query-discovered-printer",{bubbles:true,composed:true,detail:{item:this.printerEntry}});this.dispatchEvent(queryDiscoveredPrinterEvent)}onAddAutomaticPrinterClick_(){const addAutomaticPrinterEvent=new CustomEvent("add-automatic-printer",{bubbles:true,composed:true,detail:{item:this.printerEntry}});this.dispatchEvent(addAutomaticPrinterEvent)}onAddServerPrinterClick_(){const addPrintServer=new CustomEvent("add-print-server-printer",{bubbles:true,composed:true,detail:{item:this.printerEntry}});this.dispatchEvent(addPrintServer)}showActionsMenu_(){return this.printerEntry.printerType===PrinterType.SAVED||this.printerEntry.printerType===PrinterType.ENTERPRISE}isDiscoveredPrinter_(){return this.printerEntry.printerType===PrinterType.DISCOVERED}isAutomaticPrinter_(){return this.printerEntry.printerType===PrinterType.AUTOMATIC}isPrintServerPrinter_(){return this.printerEntry.printerType===PrinterType.PRINTSERVER}isSavedPrinter_(){return this.printerEntry.printerType===PrinterType.SAVED}isConfigureDisabled_(){return!this.userPrintersAllowed||this.savingPrinter}getSaveButtonAria_(){return loadTimeData.getStringF("savePrinterAria",this.printerEntry.printerInfo.printerName)}getSetupButtonAria_(){return loadTimeData.getStringF("setupPrinterAria",this.printerEntry.printerInfo.printerName)}showPrinterStatusIcon_(){return this.isSavedPrinter_()&&this.isPrinterSettingsRevampEnabled_}getPrinterStatusIcon_(){let iconColor="";switch(this.printerEntry.printerInfo.printerOnlineState){case PrinterOnlineState.ONLINE:iconColor="green";break;case PrinterOnlineState.OFFLINE:iconColor="red";break;case PrinterOnlineState.UNKNOWN:iconColor="grey";break;default:assertNotReached$1("Invalid PrinterOnlineState")}return`os-settings:printer-status-${iconColor}`}}customElements.define(SettingsCupsPrintersEntryElement.is,SettingsCupsPrintersEntryElement);function getTemplate$x(){return html`<!--_html_template_start_--><style include="cups-printer-shared iron-flex iron-flex-alignment
    iron-flex-factors">
  :host {
    display: flex;
    flex-direction: column;
  }

  #no-search-results {
    margin-top: 20px;
  }

  /** Height of iron list row entry. */
  #show-more-container {
    align-items: center;
    min-height: var(--cr-section-min-height);
  }

  /** Border line that is the same size as a list entry's border. */
  #show-more-line-separator {
    border-bottom: var(--cr-separator-line);
    margin-inline-end: 20px;
    margin-inline-start: 60px;
    position: relative;
    width: 596px;
  }

  #show-more-icon {
    --cr-icon-button-margin-end: 0;
  }

  #show-more-text {
    flex: 1;
  }
</style>

<cr-action-menu role-description="Menu">
  <button id="viewButton" class="dropdown-item" on-click="onViewClick_">
    View
  </button>
  <button id="removeButton" class="dropdown-item" disabled>
    Remove
  </button>
</cr-action-menu>

<iron-list class="list-frame vertical-list flex-auto" id="printerEntryList"
    items="[[filteredPrinters_]]">
  <template>
    <settings-cups-printers-entry printer-entry="[[item]]"
        tabindex$="[[tabIndex]]" last-focused="{{lastFocused_}}"
        list-blurred="{{listBlurred_}}" focus-row-index="[[index]]"
        iron-list-tab-index="[[tabIndex]]">
    </settings-cups-printers-entry>
  </template>
</iron-list>
<template is="dom-if" id="show-more-button-section"
    if="[[shouldPrinterListBeCollapsed_(searchTerm, enterprisePrinters.*,
    hasShowMoreBeenTapped_)]]" restamp>
  <div id="show-more-line-separator"></div>
  <div class="list-frame layout horizontal" id="show-more-container">
    <div id="show-more-text">Show more</div>
    <cr-icon-button class="action-button" id="show-more-icon"
        iron-icon="cr:expand-more"
        on-click="onShowMoreClick_"
        title="Show more">
    </cr-icon-button>
  </div>
</template>
<div id="no-search-results"
    hidden="[[!showNoSearchResultsMessage_(searchTerm,
        filteredPrinters_.*)]]">
  No search results found
</div>
<!--_html_template_end_-->`}
// Copyright 2021 The Chromium Authors
const ListPropertyUpdateMixin=dedupingMixin((superClass=>{class ListPropertyUpdateMixin extends superClass{updateList(propertyPath,identityGetter,updatedList,identityBasedUpdate=false){const list=this.get(propertyPath);const splices=calculateSplices(updatedList.map((item=>identityGetter(item))),list.map(identityGetter));splices.forEach((splice=>{const index=splice.index;const deleteCount=splice.removed.length;splice.removed=list.slice(index,index+deleteCount);splice.object=list;splice.type="splice";const added=updatedList.slice(index,index+splice.addedCount);const spliceParams=[index,deleteCount].concat(added);list.splice.apply(list,spliceParams)}));let updated=splices.length>0;if(!identityBasedUpdate){list.forEach(((item,index)=>{const updatedItem=updatedList[index];if(JSON.stringify(item)!==JSON.stringify(updatedItem)){this.set([propertyPath,index],updatedItem);updated=true}}))}if(splices.length>0){this.notifySplices(propertyPath,splices)}return updated}}return ListPropertyUpdateMixin}));
// Copyright 2022 The Chromium Authors
let instance$o=null;class CupsPrintersEntryManager{static getInstance(){return instance$o||(instance$o=new CupsPrintersEntryManager)}static setInstanceForTesting(obj){instance$o=obj}constructor(){this.savedPrinters_=[];this.nearbyPrinters_=[];this.enterprisePrinters_=[];this.onSavedPrintersChangedListeners_=[];this.printServerPrinters=[];this.onNearbyPrintersChangedListeners_=[];this.onNearbyPrintersChangedListener_=null;this.onEnterprisePrintersChangedListeners_=[];this.onEnterprisePrintersChangedListener_=null}addWebUiListeners(){this.onNearbyPrintersChangedListener_=addWebUiListener("on-nearby-printers-changed",this.setNearbyPrintersList.bind(this));this.onEnterprisePrintersChangedListener_=addWebUiListener("on-enterprise-printers-changed",this.setEnterprisePrintersList.bind(this));CupsPrintersBrowserProxyImpl.getInstance().startDiscoveringPrinters()}removeWebUiListeners(){if(this.onNearbyPrintersChangedListener_){removeWebUiListener(this.onNearbyPrintersChangedListener_);this.onNearbyPrintersChangedListener_=null}if(this.onEnterprisePrintersChangedListener_){removeWebUiListener(this.onEnterprisePrintersChangedListener_);this.onEnterprisePrintersChangedListener_=null}}get savedPrinters(){return this.savedPrinters_}get nearbyPrinters(){return this.nearbyPrinters_}get enterprisePrinters(){return this.enterprisePrinters_}addOnSavedPrintersChangedListener(listener){this.onSavedPrintersChangedListeners_.push(listener)}removeOnSavedPrintersChangedListener(listener){this.onSavedPrintersChangedListeners_=this.onSavedPrintersChangedListeners_.filter((lis=>lis!==listener))}addOnNearbyPrintersChangedListener(listener){this.onNearbyPrintersChangedListeners_.push(listener)}removeOnNearbyPrintersChangedListener(listener){this.onNearbyPrintersChangedListeners_=this.onNearbyPrintersChangedListeners_.filter((lis=>lis!==listener))}addOnEnterprisePrintersChangedListener(listener){this.onEnterprisePrintersChangedListeners_.push(listener)}removeOnEnterprisePrintersChangedListener(listener){this.onEnterprisePrintersChangedListeners_=this.onEnterprisePrintersChangedListeners_.filter((lis=>lis!==listener))}setSavedPrintersList(printerList){if(printerList.length>this.savedPrinters_.length){const diff=findDifference(printerList,this.savedPrinters_);this.savedPrinters_=printerList;this.notifyOnSavedPrintersChangedListeners_(this.savedPrinters_,diff,[]);return}if(printerList.length<this.savedPrinters_.length){const diff=findDifference(this.savedPrinters_,printerList);this.savedPrinters_=printerList;this.notifyOnSavedPrintersChangedListeners_(this.savedPrinters_,[],diff);return}this.savedPrinters_=printerList;this.notifyOnSavedPrintersChangedListeners_(this.savedPrinters_,[],[])}setNearbyPrintersList(automaticPrinters,discoveredPrinters){if(!automaticPrinters&&!discoveredPrinters){return}this.nearbyPrinters_=[];for(const printer of automaticPrinters){this.nearbyPrinters_.push({printerInfo:printer,printerType:PrinterType.AUTOMATIC})}for(const printer of discoveredPrinters){this.nearbyPrinters_.push({printerInfo:printer,printerType:PrinterType.DISCOVERED})}this.notifyOnNearbyPrintersChangedListeners_()}setEnterprisePrintersList(enterprisePrinters){this.enterprisePrinters_=enterprisePrinters;this.notifyOnEnterprisePrintersChangedListeners_()}addPrintServerPrinters(foundPrinters){const newPrinters=foundPrinters.printerList.filter((p1=>!this.printServerPrinters.some((p2=>p2.printerInfo.printerId===p1.printerId))));for(const printer of newPrinters){this.printServerPrinters.push({printerInfo:printer,printerType:PrinterType.PRINTSERVER})}this.notifyOnNearbyPrintersChangedListeners_()}notifyOnSavedPrintersChangedListeners_(savedPrinters,addedPrinter,removedPrinter){this.onSavedPrintersChangedListeners_.forEach((listener=>listener(savedPrinters,addedPrinter,removedPrinter)))}notifyOnNearbyPrintersChangedListeners_(){this.onNearbyPrintersChangedListeners_.forEach((listener=>listener(this.nearbyPrinters_)))}notifyOnEnterprisePrintersChangedListeners_(){this.onEnterprisePrintersChangedListeners_.forEach((listener=>listener(this.enterprisePrinters_)))}}
// Copyright 2023 The Chromium Authors
const CupsPrintersEntryListMixin=dedupingMixin((superClass=>{const superclassBase=ListPropertyUpdateMixin(superClass);class CupsPrintersEntryListMixinInternal extends superclassBase{static get properties(){return{entryManager_:Object,savedPrinters:{type:Array,value:()=>[]},nearbyPrinters:{type:Array,value:()=>[]},enterprisePrinters:{type:Array,value:()=>[]}}}constructor(){super();this.entryManager_=CupsPrintersEntryManager.getInstance()}connectedCallback(){this.entryManager_.addOnSavedPrintersChangedListener(this.onSavedPrintersChanged_.bind(this));this.entryManager_.addOnNearbyPrintersChangedListener(this.onNearbyPrintersChanged_.bind(this));this.entryManager_.addOnEnterprisePrintersChangedListener(this.onEnterprisePrintersChanged_.bind(this));this.onSavedPrintersChanged_(this.entryManager_.savedPrinters,[],[]);this.onNearbyPrintersChanged_(this.entryManager_.nearbyPrinters);this.onEnterprisePrintersChanged_(this.entryManager_.enterprisePrinters)}disconnectedCallback(){this.entryManager_.removeOnSavedPrintersChangedListener(this.onSavedPrintersChanged_.bind(this));this.entryManager_.removeOnNearbyPrintersChangedListener(this.onNearbyPrintersChanged_.bind(this));this.entryManager_.removeOnEnterprisePrintersChangedListener(this.onEnterprisePrintersChanged_.bind(this))}onSavedPrintersChanged_(savedPrinters,addedPrinters,removedPrinters){this.updateList("savedPrinters",(printer=>printer.printerInfo.printerId),savedPrinters);assert$1(!(addedPrinters.length&&removedPrinters.length));if(addedPrinters.length){this.onSavedPrintersAdded(addedPrinters)}else if(removedPrinters.length){this.onSavedPrintersRemoved(removedPrinters)}}onNearbyPrintersChanged_(printerList){this.entryManager_.printServerPrinters=findDifference(this.entryManager_.printServerPrinters,this.savedPrinters);printerList=printerList.concat(this.entryManager_.printServerPrinters);this.updateList("nearbyPrinters",(printer=>printer.printerInfo.printerId),printerList)}onEnterprisePrintersChanged_(enterprisePrinters){this.updateList("enterprisePrinters",(printer=>printer.printerInfo.printerId),enterprisePrinters)}onSavedPrintersAdded(_addedPrinters){}onSavedPrintersRemoved(_removedPrinters){}}return CupsPrintersEntryListMixinInternal}));
// Copyright 2022 The Chromium Authors
const MIN_VISIBLE_PRINTERS$1=3;const SettingsCupsEnterprisePrintersElementBase=CupsPrintersEntryListMixin(WebUiListenerMixin(PolymerElement));class SettingsCupsEnterprisePrintersElement extends SettingsCupsEnterprisePrintersElementBase{static get is(){return"settings-cups-enterprise-printers"}static get template(){return getTemplate$x()}static get properties(){return{searchTerm:{type:String,value:""},activePrinter:{type:Object,notify:true},activePrinterListEntryIndex_:{type:Number,value:-1},printersCount:{type:Number,computed:"getFilteredPrintersLength_(filteredPrinters_.*)",notify:true},filteredPrinters_:{type:Array,value:()=>[]},hasShowMoreBeenTapped_:{type:Boolean,value:false},lastFocused_:Object,listBlurred_:Boolean}}static get observers(){return["onSearchOrPrintersChanged_(enterprisePrinters.*, searchTerm, "+"hasShowMoreBeenTapped_)"]}constructor(){super();this.browserProxy_=CupsPrintersBrowserProxyImpl.getInstance();this.visiblePrinterCounter_=MIN_VISIBLE_PRINTERS$1}ready(){super.ready();this.addEventListener("open-action-menu",(event=>{this.onOpenActionMenu_(event)}))}onSearchOrPrintersChanged_(){if(!this.enterprisePrinters){return}let updatedPrinters=this.searchTerm?this.enterprisePrinters.filter((item=>matchesSearchTerm(item.printerInfo,this.searchTerm))):this.enterprisePrinters.slice();updatedPrinters.sort(sortPrinters);if(this.shouldPrinterListBeCollapsed_()){updatedPrinters=updatedPrinters.filter(((_,idx)=>idx<this.visiblePrinterCounter_))}this.updateList("filteredPrinters_",(printer=>printer.printerInfo.printerId),updatedPrinters)}onShowMoreClick_(){this.hasShowMoreBeenTapped_=true}shouldPrinterListBeCollapsed_(){if(this.searchTerm){return false}if(this.hasShowMoreBeenTapped_){return false}if(this.enterprisePrinters.length-this.visiblePrinterCounter_<1){return false}return true}showNoSearchResultsMessage_(){return!!this.searchTerm&&!this.filteredPrinters_.length}getFilteredPrintersLength_(){return this.filteredPrinters_.length}getCrActionMenu(){return castExists(this.shadowRoot.querySelector("cr-action-menu"))}onOpenActionMenu_(e){const item=e.detail.item;this.activePrinterListEntryIndex_=this.enterprisePrinters.findIndex((printer=>printer.printerInfo.printerId===item.printerInfo.printerId));this.activePrinter=this.get(["enterprisePrinters",this.activePrinterListEntryIndex_]).printerInfo;const target=e.detail.target;this.getCrActionMenu().showAt(target)}onViewClick_(){const editCupsPrinterDetailsEvent=new CustomEvent("edit-cups-printer-details",{bubbles:true,composed:true});this.dispatchEvent(editCupsPrinterDetailsEvent);this.closeActionMenu_()}closeActionMenu_(){this.getCrActionMenu().close()}}customElements.define(SettingsCupsEnterprisePrintersElement.is,SettingsCupsEnterprisePrintersElement);function getTemplate$w(){return html`<!--_html_template_start_--><style include="cups-printer-shared iron-flex iron-flex-alignment
    iron-flex-factors">
  :host {
    display: flex;
    flex-direction: column;
  }

  #no-search-results {
    margin-bottom: 20px;
  }

  /** Height of iron list row entry. */
  #show-more-container {
    align-items: center;
    min-height: var(--cr-section-min-height);
  }

  /** Border line that is the same size as a list entry's border. */
  #show-more-line-separator {
    border-bottom: var(--cr-separator-line);
    margin-inline-end: 20px;
    margin-inline-start: 60px;
    position: relative;
    width: 596px;
  }

  #show-more-icon {
    --cr-icon-button-margin-end: 0;
  }

  #show-more-text {
    flex: 1;
  }
</style>

<cr-action-menu role-description="Menu">
  <button id="editButton" class="dropdown-item" on-click="onEditClick_">
    Edit
  </button>
  <button id="removeButton" class="dropdown-item" on-click="onRemoveClick_">
    Remove
  </button>
</cr-action-menu>

<iron-list class="list-frame vertical-list flex-auto" id="printerEntryList"
    items="[[filteredPrinters_]]">
  <template>
    <settings-cups-printers-entry printer-entry="[[item]]"
        tabindex$="[[tabIndex]]" last-focused="{{lastFocused_}}"
        list-blurred="{{listBlurred_}}" focus-row-index="[[index]]"
        iron-list-tab-index="[[tabIndex]]">
    </settings-cups-printers-entry>
  </template>
</iron-list>
<template is="dom-if" id="show-more-button-section"
    if="[[shouldPrinterListBeCollapsed_(searchTerm, savedPrinters.*,
        newPrinters_.*, hasShowMoreBeenTapped_)]]" restamp>
  <div id="show-more-line-separator"></div>
  <div class="list-frame layout horizontal" id="show-more-container">
    <div id="show-more-text">Show more</div>
    <cr-icon-button class="action-button" id="show-more-icon"
        iron-icon="cr:expand-more"
        on-click="onShowMoreClick_"
        title="Show more">
    </cr-icon-button>
  </div>
</template>

<div id="no-search-results"
    hidden="[[!showNoSearchResultsMessage_(searchTerm,
        filteredPrinters_.*)]]">
  No search results found
</div>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
const MIN_VISIBLE_PRINTERS=3;function moveEntryInPrinters(printerArr,fromIndex,toIndex){const element=printerArr[fromIndex];printerArr.splice(fromIndex,1);printerArr.splice(toIndex,0,element)}const SettingsCupsSavedPrintersElementBase=CupsPrintersEntryListMixin(WebUiListenerMixin(PolymerElement));class SettingsCupsSavedPrintersElement extends SettingsCupsSavedPrintersElementBase{static get is(){return"settings-cups-saved-printers"}static get template(){return getTemplate$w()}static get properties(){return{searchTerm:{type:String,value:""},activePrinter:{type:Object,notify:true},printersCount:{type:Number,computed:"getFilteredPrintersLength_(filteredPrinters_.*)",notify:true},activePrinterListEntryIndex_:{type:Number,value:-1},filteredPrinters_:{type:Array,value:()=>[]},newPrinters_:{type:Array,value:()=>[]},hasShowMoreBeenTapped_:{type:Boolean,value:false},lastFocused_:Object,listBlurred_:Boolean}}static get observers(){return["onSearchOrPrintersChanged_(savedPrinters.*, searchTerm,"+"hasShowMoreBeenTapped_, newPrinters_.*)"]}constructor(){super();this.browserProxy_=CupsPrintersBrowserProxyImpl.getInstance();this.visiblePrinterCounter_=MIN_VISIBLE_PRINTERS}ready(){super.ready();this.addEventListener("open-action-menu",(event=>{this.onOpenActionMenu_(event)}))}onSearchOrPrintersChanged_(){if(!this.savedPrinters){return}const updatedPrinters=this.getVisiblePrinters_();this.updateList("filteredPrinters_",(printer=>printer.printerInfo.printerId),updatedPrinters)}onOpenActionMenu_(e){const item=e.detail.item;this.activePrinterListEntryIndex_=this.savedPrinters.findIndex((printer=>printer.printerInfo.printerId===item.printerInfo.printerId));this.activePrinter=this.get(["savedPrinters",this.activePrinterListEntryIndex_]).printerInfo;const target=e.detail.target;this.shadowRoot.querySelector("cr-action-menu").showAt(target)}onEditClick_(){const editCupsPrinterDetailsEvent=new CustomEvent("edit-cups-printer-details",{bubbles:true,composed:true});this.dispatchEvent(editCupsPrinterDetailsEvent);this.closeActionMenu_()}onRemoveClick_(){this.browserProxy_.removeCupsPrinter(this.activePrinter.printerId,this.activePrinter.printerName);recordSettingChange();this.activePrinter=null;this.activePrinterListEntryIndex_=-1;this.closeActionMenu_()}onShowMoreClick_(){this.hasShowMoreBeenTapped_=true}getVisiblePrinters_(){const updatedPrinters=this.searchTerm?this.savedPrinters.filter((item=>matchesSearchTerm(item.printerInfo,this.searchTerm))):this.savedPrinters.slice();updatedPrinters.sort(sortPrinters);this.moveNewlyAddedPrinters_(updatedPrinters,0);if(this.shouldPrinterListBeCollapsed_()){return updatedPrinters.filter(((_,idx)=>idx<this.visiblePrinterCounter_))}return updatedPrinters}closeActionMenu_(){this.shadowRoot.querySelector("cr-action-menu").close()}showNoSearchResultsMessage_(){return!!this.searchTerm&&!this.filteredPrinters_.length}onSavedPrintersAdded(addedPrinters){const currArr=this.newPrinters_.slice();for(const printer of addedPrinters){this.visiblePrinterCounter_++;currArr.push(printer)}this.set("newPrinters_",currArr)}onSavedPrintersRemoved(removedPrinters){const currArr=this.newPrinters_.slice();for(const printer of removedPrinters){const newPrinterRemovedIdx=currArr.findIndex((p=>p.printerInfo.printerId===printer.printerInfo.printerId));if(newPrinterRemovedIdx>-1){currArr.splice(newPrinterRemovedIdx,1)}this.visiblePrinterCounter_=Math.max(MIN_VISIBLE_PRINTERS,--this.visiblePrinterCounter_)}this.set("newPrinters_",currArr)}shouldPrinterListBeCollapsed_(){if(this.searchTerm){return false}if(this.hasShowMoreBeenTapped_){return false}if(this.savedPrinters.length-this.visiblePrinterCounter_<1){return false}return true}moveNewlyAddedPrinters_(printerArr,toIndex){if(!this.newPrinters_.length){return}for(const printer of this.newPrinters_){const idx=printerArr.findIndex((p=>p.printerInfo.printerId===printer.printerInfo.printerId));if(idx>-1){moveEntryInPrinters(printerArr,idx,toIndex)}}}getFilteredPrintersLength_(){return this.filteredPrinters_.length}}customElements.define(SettingsCupsSavedPrintersElement.is,SettingsCupsSavedPrintersElement);function getTemplate$v(){return html`<!--_html_template_start_--><style include="cups-printer-shared">
  [slot='dialog-body'] {
    height: 90px;
  }
  [slot='dialog-buttons'] {
    width: auto;
  }
</style>
<add-printer-dialog id="printServerDialog">
  <div slot="dialog-title">
    Add a print server
    <printer-dialog-error id="server-dialog-error" error-text="[[errorText_]]">
    </printer-dialog-error>
  </div>
  <div slot="dialog-body">
    <div class="settings-box first two-line">
      <cr-input
        id="printServerAddressInput"
        label="Address"
        value="{{printServerAddress_}}"
        error-message="Invalid address. Please check the address and try again."
        on-keypress="onKeypress"
        maxlength="63"
        autofocus
      >
      </cr-input>
    </div>
  </div>
  <div slot="dialog-buttons">
    <cr-button class="cancel-button" on-click="onCancelClick_">
      Cancel
    </cr-button>
    <cr-button
      class="action-button"
      on-click="onAddPrintServerClick_"
      disabled="[[inProgress_]]"
    >
      Add
    </cr-button>
  </div>
</add-printer-dialog>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
class AddPrintServerDialogElement extends PolymerElement{static get is(){return"add-print-server-dialog"}static get template(){return getTemplate$v()}static get properties(){return{printServerAddress_:{type:String,value:""},errorText_:{type:String,value:""},inProgress_:{type:Boolean,value:false}}}constructor(){super();this.browserProxy_=CupsPrintersBrowserProxyImpl.getInstance()}onCancelClick_(){this.shadowRoot.querySelector("add-printer-dialog").close()}onAddPrintServerClick_(){this.inProgress_=true;this.shadowRoot.querySelector("#printServerAddressInput").invalid=false;this.browserProxy_.queryPrintServer(this.printServerAddress_).then(this.onPrintServerAddedSucceeded_.bind(this),this.onPrintServerAddedFailed_.bind(this))}onPrintServerAddedSucceeded_(printers){this.inProgress_=false;const addPrintServerEvent=new CustomEvent("add-print-server-and-show-toast",{bubbles:true,composed:true,detail:{printers:printers}});this.dispatchEvent(addPrintServerEvent);this.shadowRoot.querySelector("add-printer-dialog").close()}onPrintServerAddedFailed_(addPrintServerError){this.inProgress_=false;if(addPrintServerError===PrintServerResult.INCORRECT_URL){this.shadowRoot.querySelector("#printServerAddressInput").invalid=true;return}this.errorText_=getPrintServerErrorText(addPrintServerError)}onKeypress(event){if(event.key!=="Enter"){return}event.stopPropagation();this.onAddPrintServerClick_()}}customElements.define(AddPrintServerDialogElement.is,AddPrintServerDialogElement);function getTemplate$u(){return html`<!--_html_template_start_--><style include="cups-printer-shared"></style>
<add-printer-dialog>
  <div slot="dialog-title">
    <span>Add a printer manually</span>
    <printer-dialog-error error-text="[[errorText_]]">
    </printer-dialog-error>
  </div>
  <div slot="dialog-body">
    <div class="settings-box first two-line">
      <cr-input class="printer-name-input" autofocus
        id="printerNameInput" value="{{newPrinter.printerName}}"
        label="Name" maxlength=64 on-keypress="onKeypress_">
      </cr-input>
    </div>
    <div class="settings-box two-line">
      <cr-input id="printerAddressInput" label="Address"
          value="{{newPrinter.printerAddress}}" maxlength=63
          error-message="Couldn&#39;t detect a printer. Please enter printer address again."
          on-keypress="onKeypress_">
      </cr-input>
    </div>
    <div class="settings-box two-line">
      <div class="start">
        <div id="printerProtocol" class="cr-form-field-label"
            aria-hidden="true">
          Protocol
        </div>
        <div class="secondary">
          <select class="md-select" aria-labelledby="printerProtocol"
              value="[[newPrinter.printerProtocol]]"
              on-change="onProtocolChange_">
            <option value="ipp">Internet Printing Protocol (IPP)</option>
            <option value="ipps">Internet Printing Protocol (IPPS)</option>
            <option value="http">Hypertext Transport Protocol (HTTP)</option>
            <option value="https">Hypertext Transport Protocol Secure (HTTPS)</option>
            <option value="socket">AppSocket (TCP/IP)
            </option>
            <option value="lpd">Line Printer Daemon (LPD)</option>
          </select>
        </div>
      </div>
    </div>
    <template is="dom-if" if="[[showPrinterQueue_]]" restamp>
      <div class="settings-box two-line">
        <cr-input id="printerQueueInput" label="Queue"
            value="{{newPrinter.printerQueue}}" maxlength=64
            on-keypress="onKeypress_">
        </cr-input>
      </div>
    </template>
  </div>
  <div slot="dialog-buttons">
    <!-- Left Group -->
    <div>
      <cr-button id="print-server-button" on-click="onPrintServerClick_">
        Print server
      </cr-button>
    </div>
    <!-- Right Group -->
    <div>
      <cr-button class="cancel-button" on-click="onCancelClick_">
        Cancel
      </cr-button>
      <cr-button id="addPrinterButton" class="action-button"
          on-click="addPressed_"
          disabled="[[!canAddPrinter_(newPrinter.*,
                                      addPrinterInProgress_)]]">
        Add
      </cr-button>
    </div>
  </div>
</add-printer-dialog>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
function getEmptyPrinter$1(){return{ppdManufacturer:"",ppdModel:"",printerAddress:"",printerDescription:"",printerId:"",printerMakeAndModel:"",printerName:"",printerOnlineState:PrinterOnlineState.UNKNOWN,printerPPDPath:"",printerPpdReference:{userSuppliedPpdUrl:"",effectiveMakeAndModel:"",autoconf:false},printerProtocol:"ipp",printerQueue:"ipp/print",printServerUri:""}}class AddPrinterManuallyDialogElement extends PolymerElement{static get is(){return"add-printer-manually-dialog"}static get template(){return getTemplate$u()}static get properties(){return{newPrinter:{type:Object,notify:true,value:getEmptyPrinter$1},addPrinterInProgress_:{type:Boolean,value:false},errorText_:{type:String,value:""},showPrinterQueue_:{type:Boolean,value:true}}}static get observers(){return["printerInfoChanged_(newPrinter.*)"]}constructor(){super();this.browserProxy_=CupsPrintersBrowserProxyImpl.getInstance()}getAddPrinterDialog_(){return castExists(this.shadowRoot.querySelector("add-printer-dialog"))}onCancelClick_(){this.getAddPrinterDialog_().close()}onAddPrinterSucceeded_(result){const showCupsPrinterToastEvent=new CustomEvent("show-cups-printer-toast",{bubbles:true,composed:true,detail:{resultCode:result,printerName:this.newPrinter.printerName}});this.dispatchEvent(showCupsPrinterToastEvent);this.getAddPrinterDialog_().close()}onAddPrinterFailed_(result){this.errorText_=getErrorText(result)}openManufacturerModelDialog_(){const event=new CustomEvent("open-manufacturer-model-dialog",{bubbles:true,composed:true});this.dispatchEvent(event)}onPrinterFound_(info){const newPrinter=Object.assign({},this.newPrinter);newPrinter.printerMakeAndModel=info.makeAndModel;newPrinter.printerPpdReference.userSuppliedPpdUrl=info.ppdRefUserSuppliedPpdUrl;newPrinter.printerPpdReference.effectiveMakeAndModel=info.ppdRefEffectiveMakeAndModel;newPrinter.printerPpdReference.autoconf=info.autoconf;this.newPrinter=newPrinter;if(info.ppdReferenceResolved){this.browserProxy_.addCupsPrinter(this.newPrinter).then(this.onAddPrinterSucceeded_.bind(this),this.onAddPrinterFailed_.bind(this))}else{this.getAddPrinterDialog_().close();this.openManufacturerModelDialog_()}}infoFailed_(result){this.addPrinterInProgress_=false;if(result===PrinterSetupResult.PRINTER_UNREACHABLE){this.$.printerAddressInput.invalid=true;return}this.errorText_=getErrorText(result)}addPressed_(){this.addPrinterInProgress_=true;if(this.newPrinter.printerProtocol==="ipp"||this.newPrinter.printerProtocol==="ipps"){this.browserProxy_.getPrinterInfo(this.newPrinter).then(this.onPrinterFound_.bind(this),this.infoFailed_.bind(this))}else{this.getAddPrinterDialog_().close();this.openManufacturerModelDialog_()}}onPrintServerClick_(){this.getAddPrinterDialog_().close();const openAddPrintServerDialogEvent=new CustomEvent("open-add-print-server-dialog",{bubbles:true,composed:true});this.dispatchEvent(openAddPrintServerDialogEvent)}onProtocolChange_(event){const selectEl=cast(event.target,HTMLSelectElement);this.showPrinterQueue_=selectEl.value!=="socket";this.set("newPrinter.printerProtocol",selectEl.value)}canAddPrinter_(){return!this.addPrinterInProgress_&&isNameAndAddressValid(this.newPrinter)}printerInfoChanged_(){this.$.printerAddressInput.invalid=false;this.errorText_=""}onKeypress_(event){if(event.key!=="Enter"){return}event.stopPropagation();if(this.canAddPrinter_()){this.addPressed_()}}}customElements.define(AddPrinterManuallyDialogElement.is,AddPrinterManuallyDialogElement);function getTemplate$t(){return html`<!--_html_template_start_--><style include="cups-printer-shared">
  .subtext {
    margin-bottom: 10px;
    padding-inline-end: 20px;
    padding-inline-start: 20px;
  }

  #make-model-body {
    height: 290px;
  }
</style>
<add-printer-dialog>
  <div slot="dialog-title">
    <span>Advanced printer configuration</span>
    <printer-dialog-error error-text="[[errorText_]]">
    </printer-dialog-error>
  </div>
  <div id="make-model-body" slot="dialog-body">
    <div class="subtext" id="makeModelTextInfo">
      <localized-link
          localized-string=
              "[[getManufacturerAndModelSubtext_(activePrinter.*)]]"
          link-url="https://support.google.com/chromebook?p=chromebook_printing&amp;b=jacuzzi-signed-mp-v13keys">
      </localized-link>
    </div>
    <div class="settings-box two-line">
      <cr-searchable-drop-down id="manufacturerDropdown"
          items="[[manufacturerList]]"
          label="Manufacturer"
          value="{{activePrinter.ppdManufacturer}}"
          invalid="{{isManufacturerInvalid_}}">
      </cr-searchable-drop-down>
    </div>
    <div class="settings-box two-line">
      <cr-searchable-drop-down id="modelDropdown"
          items="[[modelList]]"
          label="Model"
          value="{{activePrinter.ppdModel}}"
          invalid="{{isModelInvalid_}}">
      </cr-searchable-drop-down>
    </div>
    <div id="ppdLabel" class="cr-form-field-label">
      <localized-link localized-string="Alternatively, select printer PPD. &lt;a&gt;Learn more&lt;/a&gt;"
                      link-url="https://support.google.com/chromebook/?p=printing_advancedconfigurations&amp;b=jacuzzi-signed-mp-v13keys">
      </localized-link>
    </div>
    <div class="settings-box two-line">
      <cr-input class="browse-file-input" readonly value="[[newUserPPD_]]"
          aria-labelledby="ppdLabel" invalid="[[invalidPPD_]]"
          error-message="Invalid file selected. Try again." input-tabindex="-1">
      </cr-input>
      <cr-button class="browse-button" on-click="onBrowseFile_"
          aria-label="Browse to specify your printer PPD">
        Browse
      </cr-button>
    </div>
  </div>
  <div slot="dialog-buttons">
    <div> <!-- Left group -->
      <div class="eula" id="eulaUrl" hidden="[[!eulaUrl_]]">
        <a href="[[eulaUrl_]]" target="_blank">End User Licence Agreement</a>
      </div>
    </div>
    <div> <!-- Right group -->
      <cr-button class="cancel-button" on-click="onCancelClick_">
        Cancel
      </cr-button>
      <cr-button class="action-button" id="addPrinterButton"
          disabled="[[!canAddPrinter_(activePrinter.ppdManufacturer,
                                      activePrinter.ppdModel,
                                      activePrinter.printerPPDPath,
                                      addPrinterInProgress_,
                                      isManufacturerInvalid_,
                                      isModelInvalid_)]]"
          on-click="addPrinter_">
        Add
      </cr-button>
    </div>
  </div>
</add-printer-dialog>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
class AddPrinterManufacturerModelDialogElement extends PolymerElement{static get is(){return"add-printer-manufacturer-model-dialog"}static get template(){return getTemplate$t()}static get properties(){return{activePrinter:{type:Object,notify:true},manufacturerList:Array,modelList:Array,invalidPPD_:{type:Boolean,value:false},newUserPPD_:String,eulaUrl_:{type:String,value:""},addPrinterInProgress_:{type:Boolean,value:false},errorText_:{type:String,value:""},isManufacturerInvalid_:Boolean,isModelInvalid_:Boolean}}static get observers(){return["selectedManufacturerChanged_(activePrinter.ppdManufacturer)","selectedModelChanged_(activePrinter.ppdModel)"]}constructor(){super();this.browserProxy_=CupsPrintersBrowserProxyImpl.getInstance()}connectedCallback(){super.connectedCallback();this.browserProxy_.getCupsPrinterManufacturersList().then(this.manufacturerListChanged_.bind(this))}close(){this.shadowRoot.querySelector("add-printer-dialog").close()}onPrinterAddedSucceeded_(result){const showCupsPrinterToastEvent=new CustomEvent("show-cups-printer-toast",{bubbles:true,composed:true,detail:{resultCode:result,printerName:this.activePrinter.printerName}});this.dispatchEvent(showCupsPrinterToastEvent);this.close()}onPrinterAddedFailed_(result){this.addPrinterInProgress_=false;this.errorText_=getErrorText(result)}getManufacturerAndModelSubtext_(){if(this.activePrinter.printerMakeAndModel){return loadTimeData.getStringF("manufacturerAndModelAdditionalInformation",this.activePrinter.printerMakeAndModel)}return loadTimeData.getStringF("manufacturerAndModelAdditionalInformation",this.activePrinter.printerName)}selectedManufacturerChanged_(manufacturer){this.set("activePrinter.ppdModel","");this.modelList=[];if(manufacturer&&manufacturer.length!==0){this.browserProxy_.getCupsPrinterModelsList(manufacturer).then(this.modelListChanged_.bind(this))}}selectedModelChanged_(){this.errorText_="";if(!this.activePrinter.ppdManufacturer||!this.activePrinter.ppdModel){this.onGetEulaUrlCompleted_("");return}this.browserProxy_.getEulaUrl(this.activePrinter.ppdManufacturer,this.activePrinter.ppdModel).then(this.onGetEulaUrlCompleted_.bind(this))}onGetEulaUrlCompleted_(eulaUrl){this.eulaUrl_=eulaUrl}manufacturerListChanged_(manufacturersInfo){if(!manufacturersInfo.success){return}this.manufacturerList=manufacturersInfo.manufacturers;if(this.activePrinter.ppdManufacturer.length!==0){this.browserProxy_.getCupsPrinterModelsList(this.activePrinter.ppdManufacturer).then(this.modelListChanged_.bind(this))}}modelListChanged_(modelsInfo){if(modelsInfo.success){this.modelList=modelsInfo.models}}onBrowseFile_(){this.browserProxy_.getCupsPrinterPpdPath().then(this.printerPpdPathChanged_.bind(this))}printerPpdPathChanged_(path){this.set("activePrinter.printerPPDPath",path);this.invalidPPD_=!path;this.newUserPPD_=getBaseName(path)}onCancelClick_(){this.close();this.browserProxy_.cancelPrinterSetUp(this.activePrinter)}addPrinter_(){this.addPrinterInProgress_=true;this.browserProxy_.addCupsPrinter(this.activePrinter).then(this.onPrinterAddedSucceeded_.bind(this),this.onPrinterAddedFailed_.bind(this))}canAddPrinter_(ppdManufacturer,ppdModel,printerPPDPath,addPrinterInProgress,isManufacturerInvalid,isModelInvalid){return!addPrinterInProgress&&isPPDInfoValid(ppdManufacturer,ppdModel,printerPPDPath)&&!isManufacturerInvalid&&!isModelInvalid}}customElements.define(AddPrinterManufacturerModelDialogElement.is,AddPrinterManufacturerModelDialogElement);function getTemplate$s(){return html`<!--_html_template_start_--><style include="settings-shared"></style>

<!-- Manually Add Printer Dialog -->
<template is="dom-if" if="[[showManuallyAddDialog_]]" restamp>
  <add-printer-manually-dialog new-printer="{{newPrinter}}">
  </add-printer-manually-dialog>
</template>

<!-- Manufacturer and Model Dialog -->
<template is="dom-if" if="[[showManufacturerDialog_]]" restamp>
  <add-printer-manufacturer-model-dialog active-printer="{{newPrinter}}">
  </add-printer-manufacturer-model-dialog>
</template>

<!-- Add Print Server Dialog -->
<template is="dom-if" if="[[showAddPrintServerDialog_]]" restamp>
  <add-print-server-dialog></add-print-server-dialog>
</template>

<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
var AddPrinterDialogs;(function(AddPrinterDialogs){AddPrinterDialogs["MANUALLY"]="add-printer-manually-dialog";AddPrinterDialogs["MANUFACTURER"]="add-printer-manufacturer-model-dialog";AddPrinterDialogs["PRINTSERVER"]="add-print-server-dialog"})(AddPrinterDialogs||(AddPrinterDialogs={}));function getEmptyPrinter(){return{isManaged:false,ppdManufacturer:"",ppdModel:"",printerAddress:"",printerDescription:"",printerId:"",printerMakeAndModel:"",printerName:"",printerOnlineState:PrinterOnlineState.UNKNOWN,printerPPDPath:"",printerPpdReference:{userSuppliedPpdUrl:"",effectiveMakeAndModel:"",autoconf:false},printerProtocol:"ipp",printerQueue:"ipp/print",printServerUri:""}}class SettingsCupsAddPrinterDialogElement extends PolymerElement{static get is(){return"settings-cups-add-printer-dialog"}static get template(){return getTemplate$s()}static get properties(){return{newPrinter:{type:Object},previousDialog_:String,currentDialog_:String,showManuallyAddDialog_:{type:Boolean,value:false},showManufacturerDialog_:{type:Boolean,value:false},showAddPrintServerDialog_:{type:Boolean,value:false}}}ready(){super.ready();this.addEventListener("open-manually-add-printer-dialog",this.openManuallyAddPrinterDialog_);this.addEventListener("open-manufacturer-model-dialog",this.openManufacturerModelDialogForCurrentPrinter_);this.addEventListener("open-add-print-server-dialog",this.openPrintServerDialog_)}open(){this.resetData_();this.switchDialog_("",AddPrinterDialogs.MANUALLY,"showManuallyAddDialog_")}resetData_(){if(this.newPrinter){this.newPrinter=getEmptyPrinter()}}openManuallyAddPrinterDialog_(){this.switchDialog_(this.currentDialog_,AddPrinterDialogs.MANUALLY,"showManuallyAddDialog_")}openManufacturerModelDialogForCurrentPrinter_(){this.switchDialog_(this.currentDialog_,AddPrinterDialogs.MANUFACTURER,"showManufacturerDialog_")}openManufacturerModelDialogForSpecifiedPrinter(printer){this.newPrinter=printer;this.switchDialog_("",AddPrinterDialogs.MANUFACTURER,"showManufacturerDialog_")}openPrintServerDialog_(){this.switchDialog_(this.currentDialog_,AddPrinterDialogs.PRINTSERVER,"showAddPrintServerDialog_")}switchDialog_(fromDialog,toDialog,domIfBooleanName){this.previousDialog_=fromDialog;this.currentDialog_=toDialog;this.set(domIfBooleanName,true);microTask.run((()=>{const dialog=this.shadowRoot.querySelector(toDialog);dialog.addEventListener("close",(()=>{this.set(domIfBooleanName,false)}))}))}}customElements.define(SettingsCupsAddPrinterDialogElement.is,SettingsCupsAddPrinterDialogElement);function getTemplate$r(){return html`<!--_html_template_start_--><style include="cups-printer-shared action-link iron-flex
    iron-flex-alignment">
  .custom-list-item {
    border-bottom: var(--cr-separator-line);
    min-height: var(--cr-section-min-height);
  }

  .padded {
    padding: 20px;
  }

  #addPrinterText {
    flex: 1;
  }

  #addManualPrinterIcon {
    --cr-icon-button-fill-color: var(--cros-button-icon-color-secondary);
    --cr-icon-button-margin-end: 0;
  }

  :host-context(body.jelly-enabled) #addManualPrinterIcon {
    --cr-icon-button-fill-color: var(--cros-sys-primary);
  }

  #cloudOffIcon {
    --iron-icon-fill-color: var(--cros-icon-color-secondary);
    margin-top: 10px;
  }

  #connectionMessage {
    padding-inline-start: 20px;
  }

  #noConnectivityContentContainer {
    border-bottom: var(--cr-separator-line);
    padding-inline-start: 20px;
  }

  #noSearchResultsMessage {
    color: var(--md-loading-message-color);
    font-size: 16px;
    font-weight: 500;
    margin-top: 80px;
    text-align: center;
  }

  #savedPrintersContainer {
    border-bottom: var(--cr-separator-line);
  }

  #enterprisePrintersContainer {
    border-top: var(--cr-separator-line);
  }

  :host(:not([can-add-printer])) #addPrinterSection,
  :host(:not([can-add-printer])) #nearbyPrinters {
    opacity: var(--cr-disabled-opacity);
    pointer-events: none;
  }
</style>

<template is="dom-if" if="[[!canAddPrinter]]">
  <div id="noConnectivityContentContainer"
      class="layout horizontal padded">
    <iron-icon id="cloudOffIcon" icon="settings20:cloud-off"></iron-icon>
    <div id="connectionMessage" class="layout vertical">
      <div>No internet connection</div>
      <div class="secondary">Connect to a network and try again</div>
    </div>
  </div>
</template>

<template is="dom-if"
    if="[[doesAccountHaveSavedPrinters_(savedPrinters_)]]" restamp>
  <div id="savedPrintersContainer">
    <div class="padded first">
      <div class="start">
        <span aria-label$="[[savedPrintersAriaLabel_]]">
          Your saved printers
        </span>
      </div>
      <div class="secondary" hidden="[[!isPrinterSettingsRevampEnabled_]]">
        Saved printers will appear here for easier managing and access.
      </div>
    </div>

    <settings-cups-saved-printers id="savedPrinters"
        active-printer="{{activePrinter}}"
        search-term="[[searchTerm]]"
        printers-count="{{savedPrinterCount_}}">
    </settings-cups-saved-printers>
  </div>
</template>
<template is="dom-if" if="[[attemptedLoadingPrinters_]]">
  <div class="padded first" id="nearbyPrinters">
    <div aria-label$="[[nearbyPrintersAriaLabel_]]"
        hidden="[[isPrinterSettingsRevampEnabled_]]">
      Add printers to your profile
    </div>
    <div id="availablePrintersReadyTitle"
        aria-label$="[[nearbyPrintersAriaLabel_]]"
        hidden="[[!isPrinterSettingsRevampEnabled_]]">
      Available printers ready to use
    </div>
    <localized-link class="secondary"
        localized-string="Save detected printers to your profile, or add a new printer. &lt;a&gt;Learn more&lt;/a&gt;"
        link-url="https://support.google.com/chromebook?p=chromebook_printing&amp;b=jacuzzi-signed-mp-v13keys"
        hidden="[[isPrinterSettingsRevampEnabled_]]">
    </localized-link>
    <div id="availablePrintersReadySubtext" class="secondary"
        hidden="[[!isPrinterSettingsRevampEnabled_]]">
      Connected printers will automatically appear here and ready to use or save to your profile.
    </div>
    <template is="dom-if" if="[[!addPrinterButtonActive_(canAddPrinter,
      prefs.native_printing.user_native_printers_allowed.value)]]">
      <cr-policy-pref-indicator
          pref="[[prefs.native_printing.user_native_printers_allowed]]"
          icon-aria-label="Print and scan">
      </cr-policy-pref-indicator>
    </template>
  </div>

  <div id="addPrinterSection" class="list-frame">
    <div class="layout horizontal center custom-list-item">
      <div id="addPrinterText" aria-hidden="true">
        Add printer
      </div>
      <cr-icon-button class="action-button" id="addManualPrinterIcon"
          iron-icon="os-settings:printer-add"
          on-click="onAddPrinterClick_"
          disabled="[[!addPrinterButtonActive_(canAddPrinter,
              prefs.native_printing.user_native_printers_allowed.value)]]"
          title="Add printer"
          deep-link-focus-id$="[[Setting.kAddPrinter]]">
      </cr-icon-button>
    </div>
  </div>

  <template is="dom-if" if="[[canAddPrinter]]" restamp>
    <settings-cups-nearby-printers search-term="[[searchTerm]]"
        user-printers-allowed="[[!prefs.native_printing.
            user_native_printers_allowed.value]]"
        active-printer="{{activePrinter}}"
        printers-count="{{nearbyPrinterCount_}}">
    </settings-cups-nearby-printers>
  </template>
</template>

<template is="dom-if"
    if="[[doesAccountHaveEnterprisePrinters_(enterprisePrinters_)]]"
    restamp>
  <div id="enterprisePrintersContainer">
    <div class="settings-box first">
      <div class="start">
        <span aria-label$="[[enterprisePrintersAriaLabel_]]">
          Managed printers
        </span>
      </div>
    </div>
    <settings-cups-enterprise-printers
        id="enterprisePrinters"
        active-printer="{{activePrinter}}"
        search-term="[[searchTerm]]"
        printers-count="{{enterprisePrinterCount_}}">
    </settings-cups-enterprise-printers>
  </div>
</template>

<settings-cups-add-printer-dialog id="addPrinterDialog"
    on-close="onAddPrinterDialogClose_">
</settings-cups-add-printer-dialog>

<template is="dom-if" if="[[showCupsEditPrinterDialog_]]" restamp>
  <settings-cups-edit-printer-dialog id="editPrinterDialog"
      active-printer="{{activePrinter}}"
      on-close="onEditPrinterDialogClose_">
  </settings-cups-edit-printer-dialog>
</template>

<cr-toast id="errorToast" duration="3000">
  <div class="error-message" id="addPrinterDoneMessage">
    [[addPrinterResultText_]]
  </div>
</cr-toast>

<cr-toast id="printServerErrorToast" duration="3000">
  <div class="error-message" id="addPrintServerDoneMessage">
    [[addPrintServerResultText_]]
  </div>
</cr-toast>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
const SettingsCupsPrintersElementBase=mixinBehaviors([NetworkListenerBehavior],DeepLinkingMixin(RouteObserverMixin(WebUiListenerMixin(PolymerElement))));class SettingsCupsPrintersElement extends SettingsCupsPrintersElementBase{static get is(){return"settings-cups-printers"}static get template(){return getTemplate$r()}static get properties(){return{printers:{type:Array,notify:true},prefs:Object,activePrinter:{type:Object,notify:true},onPrintersChangedListener_:{type:Object,value:null},onEnterprisePrintersChangedListener_:{type:Object,value:null},searchTerm:{type:String},canAddPrinter:{type:Boolean,reflectToAttribute:true},savedPrinters_:{type:Array,value:()=>[]},enterprisePrinters_:{type:Array,value:()=>[]},attemptedLoadingPrinters_:{type:Boolean,value:false},showCupsEditPrinterDialog_:Boolean,addPrinterResultText_:String,nearbyPrintersAriaLabel_:{type:String,computed:"getNearbyPrintersAriaLabel_(nearbyPrinterCount_)"},savedPrintersAriaLabel_:{type:String,computed:"getSavedPrintersAriaLabel_(savedPrinterCount_)"},enterprisePrintersAriaLabel_:{type:String,computed:"getEnterprisePrintersAriaLabel_(enterprisePrinterCount_)"},nearbyPrinterCount_:{type:Number,value:0},savedPrinterCount_:{type:Number,value:0},enterprisePrinterCount_:{type:Number,value:0},supportedSettingIds:{type:Object,value:()=>new Set([Setting.kAddPrinter,Setting.kSavedPrinters])},isPrinterSettingsRevampEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("isPrinterSettingsRevampEnabled"),readOnly:true}}}constructor(){super();this.networkConfig_=MojoInterfaceProviderImpl.getInstance().getMojoServiceRemote();this.entryManager_=CupsPrintersEntryManager.getInstance();this.addPrintServerResultText_=""}connectedCallback(){super.connectedCallback();this.networkConfig_.getNetworkStateList({filter:FilterType.kActive,networkType:NetworkType.kAll,limit:NO_LIMIT}).then((responseParams=>{this.onActiveNetworksChanged(responseParams.result)}))}ready(){super.ready();this.updateCupsPrintersList_();this.addEventListener("edit-cups-printer-details",this.onShowCupsEditPrinterDialog_);this.addEventListener("show-cups-printer-toast",(event=>{this.openResultToast_(event)}));this.addEventListener("add-print-server-and-show-toast",(event=>{this.addPrintServerAndShowResultToast_(event)}));this.addEventListener("open-manufacturer-model-dialog-for-specified-printer",(event=>{this.openManufacturerModelDialogForSpecifiedPrinter_(event)}))}beforeDeepLinkAttempt(settingId){if(settingId!==Setting.kSavedPrinters){return true}afterNextRender(this,(()=>{const savedPrinters=this.shadowRoot.querySelector("#savedPrinters");const printerEntry=savedPrinters.shadowRoot.querySelector("settings-cups-printers-entry");const deepLinkElement=printerEntry.shadowRoot.querySelector("#moreActions");if(!deepLinkElement||deepLinkElement.hidden){console.warn(`Element with deep link id ${settingId} not focusable.`);return}this.showDeepLinkElement(deepLinkElement)}));return false}currentRouteChanged(route){if(route!==routes.CUPS_PRINTERS){if(this.onPrintersChangedListener_){removeWebUiListener(this.onPrintersChangedListener_);this.onPrintersChangedListener_=null}this.entryManager_.removeWebUiListeners();return}this.entryManager_.addWebUiListeners();this.onPrintersChangedListener_=addWebUiListener("on-saved-printers-changed",this.onSavedPrintersChanged_.bind(this));this.onEnterprisePrintersChangedListener_=addWebUiListener("on-enterprise-printers-changed",this.onEnterprisePrintersChanged_.bind(this));this.updateCupsPrintersList_();this.attemptDeepLink()}onActiveNetworksChanged(networks){this.canAddPrinter=networks.some((network=>network.connectionState===ConnectionStateType.kOnline))}openResultToast_(event){const printerName=event.detail.printerName;switch(event.detail.resultCode){case PrinterSetupResult.SUCCESS:this.addPrinterResultText_=loadTimeData.getStringF("printerAddedSuccessfulMessage",printerName);break;case PrinterSetupResult.EDIT_SUCCESS:this.addPrinterResultText_=loadTimeData.getStringF("printerEditedSuccessfulMessage",printerName);break;case PrinterSetupResult.PRINTER_UNREACHABLE:this.addPrinterResultText_=loadTimeData.getStringF("printerUnavailableMessage",printerName);break;default:assertNotReached$1()}this.$.errorToast.show()}addPrintServerAndShowResultToast_(event){this.entryManager_.addPrintServerPrinters(event.detail.printers);const length=event.detail.printers.printerList.length;if(length===0){this.addPrintServerResultText_=loadTimeData.getString("printServerFoundZeroPrinters")}else if(length===1){this.addPrintServerResultText_=loadTimeData.getString("printServerFoundOnePrinter")}else{this.addPrintServerResultText_=loadTimeData.getStringF("printServerFoundManyPrinters",length)}this.$.printServerErrorToast.show()}openManufacturerModelDialogForSpecifiedPrinter_(e){const item=e.detail.item;this.$.addPrinterDialog.openManufacturerModelDialogForSpecifiedPrinter(item)}updateCupsPrintersList_(){CupsPrintersBrowserProxyImpl.getInstance().getCupsSavedPrintersList().then(this.onSavedPrintersChanged_.bind(this));CupsPrintersBrowserProxyImpl.getInstance().getCupsEnterprisePrintersList().then(this.onEnterprisePrintersChanged_.bind(this))}onSavedPrintersChanged_(cupsPrintersList){this.savedPrinters_=cupsPrintersList.printerList.map((printer=>({printerInfo:printer,printerType:PrinterType.SAVED})));this.entryManager_.setSavedPrintersList(this.savedPrinters_);this.attemptedLoadingPrinters_=true}onEnterprisePrintersChanged_(cupsPrintersList){this.enterprisePrinters_=cupsPrintersList.printerList.map((printer=>({printerInfo:printer,printerType:PrinterType.ENTERPRISE})));this.entryManager_.setEnterprisePrintersList(this.enterprisePrinters_)}onAddPrinterClick_(){this.$.addPrinterDialog.open()}onAddPrinterDialogClose_(){const icon=this.shadowRoot.querySelector("#addManualPrinterIcon");assert$1(icon);focusWithoutInk$1(icon)}onShowCupsEditPrinterDialog_(){this.showCupsEditPrinterDialog_=true}onEditPrinterDialogClose_(){this.showCupsEditPrinterDialog_=false}showNoSearchResultsMessage_(searchTerm){if(!searchTerm||!this.printers.length){return false}searchTerm=searchTerm.toLowerCase();return!this.printers.some((printer=>printer.printerName.toLowerCase().includes(searchTerm)))}addPrinterButtonActive_(connectedToNetwork,userPrintersAllowed){return connectedToNetwork&&userPrintersAllowed}doesAccountHaveSavedPrinters_(){return!!this.savedPrinters_.length}doesAccountHaveEnterprisePrinters_(){return!!this.enterprisePrinters_.length}getSavedPrintersAriaLabel_(){let printerLabel="";if(this.savedPrinterCount_===0){printerLabel="savedPrintersCountNone"}else if(this.savedPrinterCount_===1){printerLabel="savedPrintersCountOne"}else{printerLabel="savedPrintersCountMany"}return loadTimeData.getStringF(printerLabel,this.savedPrinterCount_)}getNearbyPrintersAriaLabel_(){let printerLabel="";if(this.nearbyPrinterCount_===0){printerLabel="nearbyPrintersCountNone"}else if(this.nearbyPrinterCount_===1){printerLabel="nearbyPrintersCountOne"}else{printerLabel="nearbyPrintersCountMany"}return loadTimeData.getStringF(printerLabel,this.nearbyPrinterCount_)}getEnterprisePrintersAriaLabel_(){let printerLabel="";if(this.enterprisePrinterCount_===0){printerLabel="enterprisePrintersCountNone"}else if(this.enterprisePrinterCount_===1){printerLabel="enterprisePrintersCountOne"}else{printerLabel="enterprisePrintersCountMany"}return loadTimeData.getStringF(printerLabel,this.enterprisePrinterCount_)}}customElements.define(SettingsCupsPrintersElement.is,SettingsCupsPrintersElement);function getTemplate$q(){return html`<!--_html_template_start_--><style include="settings-shared"></style>
<os-settings-animated-pages id="pages" section="osPrinting"
    focus-config="[[focusConfig_]]">
  <div route-path="default">
    <cr-link-row id="cupsPrinters" label="Printers"
        on-click="onTapCupsPrinters_"
        role-description="Subpage button">
    </cr-link-row>
    <cr-link-row class="hr" id="printManagement"
        on-click="onOpenPrintManagement_"
        label="Print jobs"
        sub-label="View and manage print jobs"
        external
        deep-link-focus-id$="[[Setting.kPrintJobs]]">
    </cr-link-row>
    <cr-link-row class="hr" id="scanningApp"
        on-click="onOpenScanningApp_"
        label="Scan"
        sub-label="Scan documents and images"
        external
        deep-link-focus-id$="[[Setting.kScanningApp]]">
    </cr-link-row>
  </div>
  <template is="dom-if" route-path="/cupsPrinters">
    <os-settings-subpage
        page-title="Printers"
        search-label="Search printers"
        search-term="{{searchTerm}}">
      <settings-cups-printers search-term="{{searchTerm}}"
          prefs="[[prefs]]">
      </settings-cups-printers>
    </os-settings-subpage>
  </template>
</os-settings-animated-pages>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
const OsSettingsPrintingPageElementBase=DeepLinkingMixin(RouteObserverMixin(PolymerElement));class OsSettingsPrintingPageElement extends OsSettingsPrintingPageElementBase{static get is(){return"os-settings-printing-page"}static get template(){return getTemplate$q()}static get properties(){return{prefs:{type:Object,notify:true},searchTerm:{type:String},focusConfig_:{type:Object,value(){const map=new Map;if(routes.CUPS_PRINTERS){map.set(routes.CUPS_PRINTERS.path,"#cupsPrinters")}return map}},supportedSettingIds:{type:Object,value:()=>new Set([Setting.kPrintJobs,Setting.kScanningApp])}}}constructor(){super();this.browserProxy_=CupsPrintersBrowserProxyImpl.getInstance()}currentRouteChanged(route){if(route!==routes.OS_PRINTING){return}this.attemptDeepLink()}onTapCupsPrinters_(){Router.getInstance().navigateTo(routes.CUPS_PRINTERS)}onOpenPrintManagement_(){this.browserProxy_.openPrintManagementApp()}onOpenScanningApp_(){this.browserProxy_.openScanningApp();recordSettingChange(Setting.kScanningApp)}}customElements.define(OsSettingsPrintingPageElement.is,OsSettingsPrintingPageElement);function getTemplate$p(){return html`<!--_html_template_start_--><style include="settings-shared">
  div {
    color: var(--cr-primary-text-color);
    margin-top: 10px;
  }

  /* This id is in the string returned from getItemInnerHtml_() */
  #providerName {
    color: var(--cros-text-color-disabled);
  }
</style>
<div inner-h-t-m-l="[[getItemInnerHtml_(profileProperties_)]]">
</div>
<!--_html_template_end_-->`}
// Copyright 2021 The Chromium Authors
const OsSettingsPowerwashDialogEsimItemElementBase=i16nMixin(PolymerElement);class OsSettingsPowerwashDialogEsimItemElement extends OsSettingsPowerwashDialogEsimItemElementBase{static get is(){return"os-settings-powerwash-dialog-esim-item"}static get template(){return getTemplate$p()}static get properties(){return{profile:{type:Object,value:null,observer:"onProfileChanged_"},profileProperties_:{type:Object,value:null}}}onProfileChanged_(){if(!this.profile){this.profileProperties_=null;return}this.profile.getProperties().then((response=>{this.profileProperties_=response.properties}))}getItemInnerHtml_(){if(!this.profileProperties_){return window.trustedTypes.emptyHTML}const profileName=this.getProfileName_(this.profileProperties_);const providerName=this.escapeHtml_(String.fromCharCode(...this.profileProperties_.serviceProvider.data));if(!providerName){return sanitizeInnerHtml$1(profileName)}return this.i16nAdvanced("powerwashDialogESimListItemTitle",{attrs:["id"],substitutions:[profileName,providerName]})}getProfileName_(profileProperties){if(!profileProperties.nickname.data||!profileProperties.nickname.data.length){return this.escapeHtml_(String.fromCharCode(...profileProperties.name.data))}return this.escapeHtml_(String.fromCharCode(...profileProperties.nickname.data))}escapeHtml_(string){return string.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}}customElements.define(OsSettingsPowerwashDialogEsimItemElement.is,OsSettingsPowerwashDialogEsimItemElement);function getTemplate$o(){return html`<!--_html_template_start_--><style include="settings-shared">
  :host {
    --cr-dialog-width: 400px;
  }

  :host cr-checkbox {
    --cr-checkbox-label-color: var(--cr-secondary-text-color);
    --cr-checkbox-label-padding-start: 12px;
    --cr-checkbox-unchecked-box-color: var(--cros-icon-color-primary);
  }

  iron-list {
    background-color: var(--cros-textfield-background-color);
    border-radius: 4px;
    margin-top: 8px;
    padding-bottom: 8px;
  }

  os-settings-powerwash-dialog-esim-item {
    height: 32px;
    padding-inline-end: 16px;
    padding-inline-start: 16px;
  }

  #profilesListContainer {
    margin-bottom: 8px;
    margin-top: 20px;
  }

  #profilesListTitle {
    font-size: calc(14 / 13 * 100%);
  }

  #checkboxLabel {
    margin-top: 16px;
  }
</style>
<cr-dialog id="dialog" close-text="Close"
    ignore-enter-key>
  <template is="dom-if" if="[[shouldShowESimWarning_]]" restamp>
    <div slot="title">Remove eSIM profiles before Powerwash</div>
    <div slot="body">
      <localized-link
          localized-string="Powerwashing your device won&#39;t remove your eSIM profiles. Go to &lt;a href=&quot;#&quot;&gt;Mobile settings&lt;/a&gt; to manually remove these profiles."
          on-link-clicked="onMobileSettingsLinkClicked_">
      </localized-link>
      <div id="profilesListContainer">
        <div id="profilesListTitle">
          Active profiles
        </div>
        <iron-list items="[[installedESimProfiles]]"
            scroll-target="profilesListContainer"
            role="listbox">
          <template>
            <os-settings-powerwash-dialog-esim-item
                profile="[[item]]"
                tabindex="0"
                role="option">
            </os-powerwash-dialog-esim-item>
          </template>
        </iron-list>
      </div>
      <cr-checkbox checked="{{isESimCheckboxChecked_}}">
        <div id="checkboxLabel">
          I understand that installed eSIM profiles will not be removed by Powerwash
        </div>
      </cr-checkbox>
    </div>
  </template>
  <template is="dom-if" if="[[!shouldShowESimWarning_]]" restamp>
    <div slot="title">Restart your device</div>
    <div slot="body">
      <div id="powerwashContainer">
        <localized-link
          localized-string="A restart is required before your device can be reset with Powerwash. &lt;a&gt;Learn more&lt;/a&gt;"
          link-url="https://support.google.com/chromebook/answer/183084?hl=en-GB">
        </localized-link>
      </div>
    </div>
  </template>
  <div slot="button-container">
    <cr-button class="cancel-button" on-click="onCancelClick_"
        id="cancel">Cancel</cr-button>
    <template is="dom-if" if="[[!shouldShowESimWarning_]]" restamp>
      <cr-button class="action-button" id="powerwash"
          on-click="onRestartClick_">
        Restart
      </cr-button>
    </template>
    <template is="dom-if" if="[[shouldShowESimWarning_]]" restamp>
      <cr-button class="action-button" id="continue"
          on-click="onContinueClick_"
          disabled="[[!isESimCheckboxChecked_]]">
        Continue
      </cr-button>
    </template>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}
// Copyright 2019 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$n=null;class OsResetBrowserProxyImpl{static getInstance(){return instance$n||(instance$n=new OsResetBrowserProxyImpl)}static setInstanceForTesting(obj){instance$n=obj}onPowerwashDialogShow(){chrome.send("onPowerwashDialogShow")}requestFactoryResetRestart(){chrome.send("requestFactoryResetRestart")}}
// Copyright 2019 The Chromium Authors
class OsSettingsPowerwashDialogElement extends PolymerElement{static get is(){return"os-settings-powerwash-dialog"}static get template(){return getTemplate$o()}static get properties(){return{requestTpmFirmwareUpdate:{type:Boolean,value:false},installedESimProfiles:{type:Array,value(){return[]}},shouldShowESimWarning_:{type:Boolean,value:false,computed:"computeShouldShowEsimWarning_(installedESimProfiles, hasContinueBeenTapped_)"},isESimCheckboxChecked_:{type:Boolean,value:false},hasContinueBeenTapped_:{type:Boolean,value:false}}}constructor(){super();this.osResetBrowserProxy_=OsResetBrowserProxyImpl.getInstance();this.lifetimeBrowserProxy_=LifetimeBrowserProxyImpl.getInstance()}connectedCallback(){super.connectedCallback();this.osResetBrowserProxy_.onPowerwashDialogShow();this.$.dialog.showModal()}onCancelClick_(){this.$.dialog.close()}onRestartClick_(){recordSettingChange();LifetimeBrowserProxyImpl.getInstance().factoryReset(this.requestTpmFirmwareUpdate)}onContinueClick_(){this.hasContinueBeenTapped_=true}onMobileSettingsLinkClicked_(event){event.detail.event.preventDefault();const params=new URLSearchParams;params.append("type",OncMojo.getNetworkTypeString(NetworkType.kCellular));Router.getInstance().navigateTo(routes.INTERNET_NETWORKS,params);this.$.dialog.close()}computeShouldShowEsimWarning_(){if(this.hasContinueBeenTapped_){return false}return!!this.installedESimProfiles.length}}customElements.define(OsSettingsPowerwashDialogElement.is,OsSettingsPowerwashDialogElement);
// Copyright 2020 The Chromium Authors
function getPendingESimProfiles(euicc){return euicc.getProfileList().then((response=>filterByProfileProperties_(response.profiles,(properties=>properties.state===ProfileState.kPending))))}function getNonPendingESimProfiles(euicc){return euicc.getProfileList().then((response=>filterByProfileProperties_(response.profiles,(properties=>properties.state!==ProfileState.kPending))))}function filterByProfileProperties_(profiles,callback){const profilePromises=profiles.map((profile=>profile.getProperties().then((response=>{if(!callback(response.properties)){return null}return profile}))));return Promise.all(profilePromises).then((profiles=>profiles.filter((profile=>profile!==null))))}function getNumESimProfiles(){return getEuicc().then((euicc=>euicc.getProfileList())).then((response=>response.profiles.length))}async function getEuicc(){const eSimManagerRemote=getESimManagerRemote();const response=await eSimManagerRemote.getAvailableEuiccs();if(!response||!response.euiccs){return null}if(response.euiccs.length===0){return null}if(response.euiccs.length===1){return response.euiccs[0]}const euiccIndex=loadTimeData$1.getBoolean("useSecondEuicc")?1:0;return response.euiccs[euiccIndex]}async function getESimProfileDetails(iccid){if(!iccid){return null}const euicc=await getEuicc();if(!euicc){console.error("No Euiccs found");return null}const esimProfilesRemotes=await euicc.getProfileList();for(const profileRemote of esimProfilesRemotes.profiles){const profilePropertiesResponse=await profileRemote.getProperties();if(!profilePropertiesResponse||!profilePropertiesResponse.properties){return null}const profileProperties=profilePropertiesResponse.properties;if(profileProperties.iccid===iccid){return{profileRemote:profileRemote,profileProperties:profileProperties}}}return null}async function getESimProfile(iccid){const details=await getESimProfileDetails(iccid);if(!details){return null}return details.profileRemote}async function getESimProfileProperties(iccid){const details=await getESimProfileDetails(iccid);if(!details){return null}return details.profileProperties}const styleMod$2=document.createElement("dom-module");styleMod$2.appendChild(html`
  <template>
    <style include="settings-shared">

network-icon {
  padding-inline-end: var(--cr-section-padding);
}

iron-icon.policy {
  margin-inline-end: var(--cr-controlled-by-spacing);
}

.indented {
  margin-inline-start: var(--cr-section-padding);
}

.stretch {
  align-items: stretch;
}

.title {
  font-size: 107.69%;  /* 14px / 13px */
  font-weight: 500;
}
    </style>
  </template>
`.content);styleMod$2.register("internet-shared");const styleMod$1=document.createElement("dom-module");styleMod$1.appendChild(html`
  <template>
    <style include="cr-shared-style cros-color-overrides">

/* Common styles for network elements. */

:host {
  /* Margin for the show/hide password icon */
  --network-control-margin: 40px;
}

.property-box {
  align-items: center;
  display: flex;
  min-height: var(--cr-section-min-height);
}

.property-box.hr {
  border-top: var(--cr-separator-line);
}

.property-box.indented {
  margin-inline-start: var(--cr-section-padding);
}

.property-box.single-column {
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}

.property-box.stretch {
  align-items: stretch;
}

.property-box.two-line {
  min-height: var(--cr-section-two-line-min-height);
}

.property-box > .start {
  align-items: center;
  flex: auto;
}

.property-box > .middle {
  align-items: center;
  flex: auto;
  padding-inline-start: 16px;
}

cr-input {
  --cr-input-error-display: none;
  margin-bottom: var(--cr-form-field-bottom-spacing);
}

.network-attribute-container {
  align-items: center;
  display: flex;
  margin: 5px;
}

.network-attribute-label {
  flex: 1;
  padding-inline-start: 10px;
}

.network-attribute-value {
  flex: 1;
}

.type-icon {
  height: var(--cr-icon-size);
  width: var(--cr-icon-size);
}
    </style>
  </template>
`.content);styleMod$1.register("network-shared");
// Copyright 2021 The Chromium Authors
const ApnDetailDialogMode={CREATE:"create",EDIT:"edit",VIEW:"view"};function hasActiveCellularNetwork(){const networkConfig=MojoInterfaceProviderImpl.getInstance().getMojoServiceRemote();return networkConfig.getNetworkStateList({filter:FilterType.kActive,networkType:NetworkType.kCellular,limit:NO_LIMIT}).then((response=>response.result.some((network=>network.connectionState!==ConnectionStateType.kNotConnected))))}function getSimSlotCount(deviceState){let pSimSlots=0;let eSimSlots=0;if(!deviceState||!deviceState.simInfos){return{pSimSlots:pSimSlots,eSimSlots:eSimSlots}}for(const simInfo of deviceState.simInfos){if(simInfo.eid){eSimSlots++;continue}pSimSlots++}return{pSimSlots:pSimSlots,eSimSlots:eSimSlots}}function isConnectedToNonCellularNetwork(){const networkConfig=MojoInterfaceProviderImpl.getInstance().getMojoServiceRemote();return networkConfig.getNetworkStateList({filter:FilterType.kActive,networkType:NetworkType.kAll,limit:NO_LIMIT}).then((response=>response.result.some((network=>network.connectionState===ConnectionStateType.kOnline&&network.type!==NetworkType.kCellular))))}function isActiveSim(networkState,deviceState){if(!networkState||networkState.type!==NetworkType.kCellular){return false}const iccid=networkState.typeState.cellular.iccid;if(!iccid||!deviceState||!deviceState.simInfos){return false}const isActiveSim=deviceState.simInfos.find((simInfo=>simInfo.iccid===iccid&&simInfo.isPrimary));return!!isActiveSim}function deviceStatesMatch(a,b){return a.type===b.type&&a.macAddress===b.macAddress&&a.simAbsent===b.simAbsent&&a.deviceState===b.deviceState&&a.managedNetworkAvailable===b.managedNetworkAvailable&&OncMojo.ipAddressMatch(a.ipv4Address,b.ipv4Address)&&OncMojo.ipAddressMatch(a.ipv6Address,b.ipv6Address)&&OncMojo.simLockStatusMatch(a.simLockStatus,b.simLockStatus)&&OncMojo.simInfosMatch(a.simInfos,b.simInfos)&&a.inhibitReason===b.inhibitReason}function processDeviceState(type,devices,deviceState){const newDeviceState=devices.find((device=>device.type===type))||null;let shouldGetNetworkDetails=false;if(!deviceState||!newDeviceState){deviceState=newDeviceState;shouldGetNetworkDetails=!!deviceState}else if(!deviceStatesMatch(deviceState,newDeviceState)){shouldGetNetworkDetails=deviceState.deviceState!==newDeviceState.deviceState;deviceState=newDeviceState}else if(deviceState.scanning!==newDeviceState.scanning){deviceState.scanning=newDeviceState.scanning;if(type===NetworkType.kCellular){shouldGetNetworkDetails=true}}else if(type===NetworkType.kCellular){shouldGetNetworkDetails=true}return{deviceState:deviceState,shouldGetNetworkDetails:shouldGetNetworkDetails}}function getTemplate$n(){return html`<!--_html_template_start_-->    <style include="cr-actionable-row-style">:host([disabled]){opacity:.65;pointer-events:none}:host([disabled]) cr-icon-button{display:var(--cr-expand-button-disabled-display,initial)}#label{flex:1;padding:var(--cr-section-vertical-padding) 0}cr-icon-button{--cr-icon-button-icon-size:var(--cr-expand-button-icon-size, 20px);--cr-icon-button-size:var(--cr-expand-button-size, 36px)}</style>

    <div id="label" aria-hidden="true"><slot></slot></div>
    <cr-icon-button id="icon" aria-labelledby="label" disabled="[[disabled]]" tabindex="[[tabIndex]]" part="icon"></cr-icon-button>
<!--_html_template_end_-->`}
// Copyright 2015 The Chromium Authors
class CrExpandButtonElement extends PolymerElement{static get is(){return"cr-expand-button"}static get template(){return getTemplate$n()}static get properties(){return{expanded:{type:Boolean,value:false,notify:true,observer:"onExpandedChange_"},disabled:{type:Boolean,value:false,reflectToAttribute:true},ariaLabel:{type:String,observer:"onAriaLabelChange_"},tabIndex:{type:Number,value:0},expandIcon:{type:String,value:"cr:expand-more",observer:"onIconChange_"},collapseIcon:{type:String,value:"cr:expand-less",observer:"onIconChange_"},expandTitle:String,collapseTitle:String,tooltipText_:{type:String,computed:"computeTooltipText_(expandTitle, collapseTitle, expanded)",observer:"onTooltipTextChange_"}}}static get observers(){return["updateAriaExpanded_(disabled, expanded)"]}ready(){super.ready();this.addEventListener("click",this.toggleExpand_)}computeTooltipText_(){return this.expanded?this.collapseTitle:this.expandTitle}onTooltipTextChange_(){this.title=this.tooltipText_}focus(){this.$.icon.focus()}onAriaLabelChange_(){if(this.ariaLabel){this.$.icon.removeAttribute("aria-labelledby");this.$.icon.setAttribute("aria-label",this.ariaLabel)}else{this.$.icon.removeAttribute("aria-label");this.$.icon.setAttribute("aria-labelledby","label")}}onExpandedChange_(){this.updateIcon_()}onIconChange_(){this.updateIcon_()}updateIcon_(){this.$.icon.ironIcon=this.expanded?this.collapseIcon:this.expandIcon}toggleExpand_(event){event.stopPropagation();event.preventDefault();this.scrollIntoViewIfNeeded();this.expanded=!this.expanded;focusWithoutInk$1(this.$.icon)}updateAriaExpanded_(){if(this.disabled){this.$.icon.removeAttribute("aria-expanded")}else{this.$.icon.setAttribute("aria-expanded",this.expanded?"true":"false")}}}customElements.define(CrExpandButtonElement.is,CrExpandButtonElement);
// Copyright 2015 The Chromium Authors
var CrPolicyStrings;const CrPolicyIndicatorType={DEVICE_POLICY:"devicePolicy",EXTENSION:"extension",NONE:"none",OWNER:"owner",PRIMARY_USER:"primary_user",RECOMMENDED:"recommended",USER_POLICY:"userPolicy",PARENT:"parent",CHILD_RESTRICTION:"childRestriction"};const CrPolicyIndicatorBehavior={properties:{indicatorType:{type:String,value:CrPolicyIndicatorType.NONE},indicatorSourceName:{type:String,value:""},indicatorVisible:{type:Boolean,computed:"getIndicatorVisible_(indicatorType)"},indicatorIcon:{type:String,computed:"getIndicatorIcon_(indicatorType)"}},getIndicatorVisible_(type){return type!==CrPolicyIndicatorType.NONE},getIndicatorIcon_(type){switch(type){case CrPolicyIndicatorType.EXTENSION:return"cr:extension";case CrPolicyIndicatorType.NONE:return"";case CrPolicyIndicatorType.PRIMARY_USER:return"cr:group";case CrPolicyIndicatorType.OWNER:return"cr:person";case CrPolicyIndicatorType.USER_POLICY:case CrPolicyIndicatorType.DEVICE_POLICY:case CrPolicyIndicatorType.RECOMMENDED:return"cr20:domain";case CrPolicyIndicatorType.PARENT:case CrPolicyIndicatorType.CHILD_RESTRICTION:return"cr20:kite";default:assertNotReached()}},getIndicatorTooltip(type,name,matches){if(!window["CrPolicyStrings"]){return""}CrPolicyStrings=window["CrPolicyStrings"];switch(type){case CrPolicyIndicatorType.EXTENSION:return name.length>0?CrPolicyStrings.controlledSettingExtension.replace("$1",name):CrPolicyStrings.controlledSettingExtensionWithoutName;case CrPolicyIndicatorType.PRIMARY_USER:return CrPolicyStrings.controlledSettingShared.replace("$1",name);case CrPolicyIndicatorType.OWNER:return name.length>0?CrPolicyStrings.controlledSettingWithOwner.replace("$1",name):CrPolicyStrings.controlledSettingNoOwner;case CrPolicyIndicatorType.USER_POLICY:case CrPolicyIndicatorType.DEVICE_POLICY:return CrPolicyStrings.controlledSettingPolicy;case CrPolicyIndicatorType.RECOMMENDED:return matches?CrPolicyStrings.controlledSettingRecommendedMatches:CrPolicyStrings.controlledSettingRecommendedDiffers;case CrPolicyIndicatorType.PARENT:return CrPolicyStrings.controlledSettingParent;case CrPolicyIndicatorType.CHILD_RESTRICTION:return CrPolicyStrings.controlledSettingChildRestriction}return""}};
// Copyright 2015 The Chromium Authors
const CrPolicyNetworkBehaviorMojo={isNetworkPolicyControlled(property){if(!property){return false}return property.policySource!==PolicySource.kNone&&property.policySource!==PolicySource.kActiveExtension},isExtensionControlled(property){if(!property){return false}return property.policySource===PolicySource.kActiveExtension},isControlled(property){if(!property){return false}return property.policySource!==PolicySource.kNone},isEditable(property){if(!property){return false}return property.policySource!==PolicySource.kUserPolicyEnforced&&property.policySource!==PolicySource.kDevicePolicyEnforced&&property.policySource!==PolicySource.kActiveExtension},isNetworkPolicyEnforced(property){if(!property){return false}return property.policySource===PolicySource.kUserPolicyEnforced||property.policySource===PolicySource.kDevicePolicyEnforced},isNetworkPolicyRecommended(property){if(!property){return false}return property.policySource===PolicySource.kUserPolicyRecommended||property.policySource===PolicySource.kDevicePolicyRecommended},getEnforcedPolicyValue(property){if(!property||!this.isNetworkPolicyEnforced(property)){return null}return property.policyValue===undefined?null:property.policyValue},getRecommendedPolicyValue(property){if(!property||!this.isNetworkPolicyRecommended(property)){return null}return property.policyValue===undefined?null:property.policyValue},isPolicySource(source){return source===OncSource.kDevicePolicy||source===OncSource.kUserPolicy},getIndicatorTypeForSource(source){if(source===OncSource.kDevicePolicy){return CrPolicyIndicatorType.DEVICE_POLICY}if(source===OncSource.kUserPolicy){return CrPolicyIndicatorType.USER_POLICY}return CrPolicyIndicatorType.NONE},getPolicyIndicatorType(property){if(!property){return CrPolicyIndicatorType.NONE}if(property.policySource===PolicySource.kUserPolicyEnforced||property.policySource===PolicySource.kUserPolicyRecommended){return CrPolicyIndicatorType.USER_POLICY}if(property.policySource===PolicySource.kDevicePolicyEnforced||property.policySource===PolicySource.kDevicePolicyRecommended){return CrPolicyIndicatorType.DEVICE_POLICY}if(property.policySource===PolicySource.kActiveExtension){return CrPolicyIndicatorType.EXTENSION}return CrPolicyIndicatorType.NONE}};function getTemplate$m(){return html`<!--_html_template_start_--><style include="cr-hidden-style">
  /* CSS variable for controlling the margin of the icon outside the
    * indicator element (i.e. in the element including the indicator). */
  :host {
    --cr-tooltip-icon-margin-start: 0;
  }

  cr-tooltip-icon {
    margin-inline-start: var(--cr-tooltip-icon-margin-start);
  }
</style>
<cr-tooltip-icon hidden$="[[!indicatorVisible]]"
    tooltip-text="[[indicatorTooltip_]]" icon-class="[[indicatorIcon]]"
    tooltip-position="[[tooltipPosition]]">
</cr-tooltip-icon>
<!--_html_template_end_-->`}
// Copyright 2019 The Chromium Authors
Polymer({_template:getTemplate$m(),is:"cr-policy-network-indicator-mojo",behaviors:[CrPolicyIndicatorBehavior,CrPolicyNetworkBehaviorMojo],properties:{property:Object,tooltipPosition:String,indicatorTooltip_:{type:String,computed:"getNetworkIndicatorTooltip_(indicatorType, property.*)"}},observers:["propertyChanged_(property.*)"],propertyChanged_(){const property=this.property;if(property===null||property===undefined||!this.isControlled(property)){this.indicatorType=CrPolicyIndicatorType.NONE;return}switch(property.policySource){case PolicySource.kNone:this.indicatorType=CrPolicyIndicatorType.NONE;break;case PolicySource.kUserPolicyEnforced:this.indicatorType=CrPolicyIndicatorType.USER_POLICY;break;case PolicySource.kDevicePolicyEnforced:this.indicatorType=CrPolicyIndicatorType.DEVICE_POLICY;break;case PolicySource.kUserPolicyRecommended:case PolicySource.kDevicePolicyRecommended:this.indicatorType=CrPolicyIndicatorType.RECOMMENDED;break;case PolicySource.kActiveExtension:this.indicatorType=CrPolicyIndicatorType.EXTENSION;break}},getNetworkIndicatorTooltip_(){if(this.property===undefined){return""}const matches=!!this.property&&this.property.activeValue===this.property.policyValue;return this.getIndicatorTooltip(this.indicatorType,"",matches)}});
// Copyright 2018 The Chromium Authors
const NetworkConfigElementBehavior={properties:{disabled:{type:Boolean,value:false,reflectToAttribute:true},property:{type:Object,value:null}},getDisabled_(disabled,property){return disabled||!!property&&this.isNetworkPolicyEnforced(property)}};function getTemplate$l(){return html`<!--_html_template_start_--><style include="network-shared">
  :host {
    cursor: pointer;
  }
  :host([disabled]) {
    cursor: initial;
  }
  cr-policy-network-indicator-mojo {
    --cr-tooltip-icon-margin-start: var(--cr-controlled-by-spacing);
  }
  cr-policy-network-indicator-mojo.left {
    margin-inline-end: var(--cr-controlled-by-spacing);
  }
  div.property-box {
    width: 100%;
  }
  #sub-label {
    font-size: 0.75rem;
  }
</style>

<div class="property-box">
  <div class="start">
    <div aria-hidden="true">[[label]]</div>
    <div id="sub-label" class="cr-secondary-text" aria-hidden="true">
      [[subLabel]]
    </div>
  </div>
  <template is="dom-if" if="[[policyOnLeft]]">
    <cr-policy-network-indicator-mojo class="left"
        property="[[property]]" tooltip-position="left">
    </cr-policy-network-indicator-mojo>
  </template>
  <cr-toggle checked="{{checked}}"
      disabled="[[getDisabled_(disabled, property)]]"
      aria-label$="[[label]]" aria-describedby="sub-label">
  </cr-toggle>
  <template is="dom-if" if="[[!policyOnLeft]]">
    <cr-policy-network-indicator-mojo
        property="[[property]]" tooltip-position="left">
    </cr-policy-network-indicator-mojo>
  </template>
</div>
<!--_html_template_end_-->`}
// Copyright 2018 The Chromium Authors
Polymer({_template:getTemplate$l(),is:"network-config-toggle",behaviors:[CrPolicyNetworkBehaviorMojo,NetworkConfigElementBehavior],properties:{label:String,subLabel:String,checked:{type:Boolean,value:false,reflectToAttribute:true,notify:true},policyOnLeft:{type:Boolean,value:false,reflectToAttribute:true}},listeners:{click:"onHostTap_"},focus(){this.$$("cr-toggle").focus()},onHostTap_(e){e.stopPropagation();if(this.getDisabled_(this.disabled,this.property)){return}this.checked=!this.checked;this.fire("change")}});const template$2=html`<!-- These icons were converted from source .svg files. -->

<iron-iconset-svg name="network" size="20">
  <svg>
    <defs>
      <!-- Badges -->
      <g id="badge-1x"><path d="M3 redacted"></path></g>
      <g id="badge-3g"><path d="M3 redacted"></path></g>
      <g id="badge-4g"><path d="M8 redacted"></path></g>
      <g id="badge-edge"><path d="M3 redacted"></path></g>
      <g id="badge-evdo"><path d="M2 redacted"></path></g>
      <g id="badge-gsm"><path d="M5 redacted"></path></g>
      <g id="badge-hspa"><path d="M5 redacted"></path></g>
      <g id="badge-hspa-plus"><path d="M5 redacted"></path></g>
      <g id="badge-lte"><path d="M2 redacted"></path></g>
      <g id="badge-lte-advanced"><path d="M2 redacted"></path></g>
      <g id="badge-5g"><path d="M0 redacted"></path><path d="M9 redacted"></path></g>

      <!-- Icons -->
      <!-- TODO(crbug.com/redacted) Update network_icon to use iron_icon
      and migrate the rest of the icons used by network_icon
      into this iconset. -->
      <g id="cellular-0"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 redacted" ></g>

      <g id="download" viewBox="0 0 20 20"><path d="M11 redacted"></path></g>
    </defs>
  </svg>
</iron-iconset-svg>
<iron-iconset-svg name="network8" size="8">
  <svg>
    <defs>
      <g id="badge-secure" fill-rule="evenodd">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2. redacted"></path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg>
`;document.head.appendChild(template$2.content);function getTemplate$k(){return html`<!--_html_template_start_--><style include="cr-hidden-style">
  :host {
    display: inline-flex;
    overflow: hidden;
    padding: 2px;
    position: relative;
  }

  #icon {
    background: var(--cros-icon-color-primary, rgba(0, 0, 0, 0.65));
    height: 20px;
    width: 20px;
  }

  /* Upper-left corner */
  #technology {
    --iron-icon-fill-color: var(--cros-icon-color-secondary);
    height: 20px;
    left: 0;
    position: absolute;
    top: 1px;
    width: 20px;
  }

  :host-context([dir='rtl']) #technology {
    left: auto;
    right: 4px;
  }

  /* Lower-right corner */
  #secure {
    --iron-icon-fill-color: var(--cros-icon-color-secondary);
    height: 8px;
    left: 16px;
    position: absolute;
    top: 16px;
    width: 8px;
  }

  :host-context([dir='rtl']) #secure {
    left: auto;
    right: 0;
  }

  /* Upper-left corner */
  #roaming {
    -webkit-mask: url(chrome://resources/ash/common/network/roaming_badge.svg);
    background-color: var(--cros-icon-color-secondary);
    height: 8px;
    left: 3px;
    position: absolute;
    top: 4px;
    width: 8px;
  }

  :host-context([dir='rtl']) #roaming {
    left: auto;
    right: 16px;
  }

  /* Images */
  #icon.ethernet {
    -webkit-mask: url(chrome://resources/ash/common/network/ethernet.svg);
  }

  #icon.vpn {
    -webkit-mask: url(chrome://resources/ash/common/network/vpn.svg);
  }

  /* Wi-Fi images */
  #icon.wifi-not-connected {
    -webkit-mask: url(chrome://resources/ash/common/network/wifi_0_with_x.svg);
  }

  #icon.wifi-no-network,
  #icon.wifi-0 {
    -webkit-mask: url(chrome://resources/ash/common/network/wifi_0.svg);
  }

  #icon.wifi-1 {
    -webkit-mask: url(chrome://resources/ash/common/network/wifi_1.svg);
  }

  #icon.wifi-2 {
    -webkit-mask: url(chrome://resources/ash/common/network/wifi_2.svg);
  }

  #icon.wifi-3 {
    -webkit-mask: url(chrome://resources/ash/common/network/wifi_3.svg);
  }

  #icon.wifi-4 {
    -webkit-mask: url(chrome://resources/ash/common/network/wifi_4.svg);
  }

  #icon.wifi-off {
    -webkit-mask: url(chrome://resources/ash/common/network/wifi_off.svg);
  }

  #icon.wifi-connecting {
    animation: wifi-levels 750ms infinite;
    animation-direction: alternate;
    animation-timing-function: steps(4, end);
  }

  @keyframes wifi-levels {
    0% {
      -webkit-mask: url(chrome://resources/ash/common/network/wifi_0.svg);
    }
    25% {
      -webkit-mask: url(chrome://resources/ash/common/network/wifi_1.svg);
    }
    50% {
      -webkit-mask: url(chrome://resources/ash/common/network/wifi_2.svg);
    }
    75% {
      -webkit-mask: url(chrome://resources/ash/common/network/wifi_3.svg);
    }
    100% {
      -webkit-mask: url(chrome://resources/ash/common/network/wifi_4.svg);
    }
  }

  /* Cellular images */
  #icon.cellular-not-connected {
    -webkit-mask: url(chrome://resources/ash/common/network/cellular_0_with_x.svg);
  }

  #icon.cellular-not-activated {
    -webkit-mask: url(chrome://resources/ash/common/network/cellular_unactivated.svg);
  }

  #icon.cellular-no-network,
  #icon.cellular-0 {
    -webkit-mask: url(chrome://resources/ash/common/network/cellular_0.svg);
  }

  #icon.cellular-1 {
    -webkit-mask: url(chrome://resources/ash/common/network/cellular_1.svg);
  }

  #icon.cellular-2 {
    -webkit-mask: url(chrome://resources/ash/common/network/cellular_2.svg);
  }

  #icon.cellular-3 {
    -webkit-mask: url(chrome://resources/ash/common/network/cellular_3.svg);
  }

  #icon.cellular-4 {
    -webkit-mask: url(chrome://resources/ash/common/network/cellular_4.svg);
  }

  #icon.cellular-off {
    -webkit-mask: url(chrome://resources/ash/common/network/cellular_off.svg);
  }

  #icon.cellular-locked {
    -webkit-mask: url(chrome://resources/ash/common/network/cellular_locked.svg);
  }

  #icon.cellular-connecting {
    animation: cellular-levels 750ms infinite;
    animation-direction: alternate;
    animation-timing-function: steps(4, end);
  }

  @keyframes cellular-levels {
    0% {
      -webkit-mask: url(chrome://resources/ash/common/network/cellular_0.svg);
    }
    25% {
      -webkit-mask: url(chrome://resources/ash/common/network/cellular_1.svg);
    }
    50% {
      -webkit-mask: url(chrome://resources/ash/common/network/cellular_2.svg);
    }
    75% {
      -webkit-mask: url(chrome://resources/ash/common/network/cellular_3.svg);
    }
    100% {
      -webkit-mask: url(chrome://resources/ash/common/network/cellular_4.svg);
    }
  }
</style>
<template is="dom-if" if="[[showIcon_(networkState)]]" restamp>
  <div id="icon"
      class$="[[getIconClass_(networkState, deviceState, isListItem)]]">
  </div>
  <iron-icon id="technology"
      hidden="[[!showTechnology_(networkState, showTechnologyBadge)]]"
      icon="[[getTechnology_(networkState)]]">
  </iron-icon>
  <iron-icon id="secure" hidden="[[!showSecure_(networkState)]]"
      icon="network8:badge-secure">
  </iron-icon>
  <div id="roaming" hidden="[[!showRoaming_(networkState)]]"></div>
</template>
<!--_html_template_end_-->`}
// Copyright 2015 The Chromium Authors
Polymer({_template:getTemplate$k(),is:"network-icon",behaviors:[i16nBehavior],properties:{networkState:Object,deviceState:{type:Object,value:null},isListItem:{type:Boolean,value:false},showTechnologyBadge:{type:Boolean,value:true},ariaLabel:{type:String,reflectToAttribute:true,computed:"computeAriaLabel_(locale, networkState)"},isUserLoggedIn_:{type:Boolean,value(){return loadTimeData$1.valueExists("isUserLoggedIn")&&loadTimeData$1.getBoolean("isUserLoggedIn")}}},networkIconCount_:5,getIconClass_(){if(!this.networkState){return""}const type=this.networkState.type;if(type===NetworkType.kEthernet){return"ethernet"}if(type===NetworkType.kVPN){return"vpn"}const prefix=OncMojo.networkTypeIsMobile(type)?"cellular-":"wifi-";if(this.isPSimPendingActivationWhileLoggedOut_()){return prefix+"not-activated"}if(this.networkState.type===NetworkType.kCellular&&this.networkState.typeState.cellular.simLocked){return prefix+"locked"}if(!this.isListItem&&!this.networkState.guid){const device=this.deviceState;if(!device||device.deviceState===DeviceStateType.kEnabled||device.deviceState===DeviceStateType.kEnabling){return prefix+"no-network"}return prefix+"off"}const connectionState=this.networkState.connectionState;if(connectionState===ConnectionStateType.kConnecting){return prefix+"connecting"}if(!this.isListItem&&connectionState===ConnectionStateType.kNotConnected){return prefix+"not-connected"}const strength=OncMojo.getSignalStrength(this.networkState);return prefix+this.strengthToIndex_(strength).toString(10)},computeAriaLabel_(locale,networkState){if(!this.networkState){return""}const type=this.networkState.type;if(type===NetworkType.kEthernet){return this.i16nDynamic(locale,"networkIconLabelEthernet")}if(type===NetworkType.kVPN){return this.i16nDynamic(locale,"networkIconLabelVpn")}let networkTypeString="";if(type===NetworkType.kTether){networkTypeString=this.i16nDynamic(locale,"OncTypeTether")}else if(OncMojo.networkTypeIsMobile(type)){networkTypeString=this.i16nDynamic(locale,"OncTypeCellular")}else{networkTypeString=this.i16nDynamic(locale,"OncTypeWiFi")}if(!this.isListItem&&!this.networkState.guid){const device=this.deviceState;if(!device||device.deviceState===DeviceStateType.kEnabled||device.deviceState===DeviceStateType.kEnabling){return this.i16nDynamic(locale,"networkIconLabelNoNetwork",networkTypeString)}return this.i16nDynamic(locale,"networkIconLabelOff",networkTypeString)}const connectionState=this.networkState.connectionState;if(connectionState===ConnectionStateType.kConnecting){return this.i16nDynamic(locale,"networkIconLabelConnecting",networkTypeString)}if(!this.isListItem&&connectionState===ConnectionStateType.kNotConnected){return this.i16nDynamic(locale,"networkIconLabelNotConnected",networkTypeString)}const strength=OncMojo.getSignalStrength(this.networkState);return this.i16nDynamic(locale,"networkIconLabelSignalStrength",networkTypeString,strength.toString(10))},strengthToIndex_(strength){if(strength<=0){return 0}if(strength>=100){return this.networkIconCount_-1}const zeroBasedIndex=Math.trunc((strength-1)*(this.networkIconCount_-1)/100);return zeroBasedIndex+1},showTechnology_(){if(!this.networkState){return false}return!this.showRoaming_()&&OncMojo.connectionStateIsConnected(this.networkState.connectionState)&&this.getTechnology_()!==""&&this.showTechnologyBadge},getTechnology_(){if(!this.networkState){return""}if(this.networkState.type===NetworkType.kCellular){const technology=this.getTechnologyId_(this.networkState.typeState.cellular.networkTechnology);if(technology!==""){return"network:"+technology}}return""},getTechnologyId_(networkTechnology){switch(networkTechnology){case"redacted":return"badge-1x";case"EDGE":return"badge-edge";case"EVDO":return"badge-evdo";case"GPRS":case"GSM":return"badge-gsm";case"HSPA":return"badge-hspa";case"redacted":return"badge-hspa-plus";case"LTE":return"badge-lte";case"LTEAdvanced":return"badge-lte-advanced";case"UMTS":return"badge-3g";case"5GNR":return"badge-5g"}return""},showSecure_(){if(!this.networkState){return false}if(!this.isListItem&&this.networkState.connectionState===ConnectionStateType.kNotConnected){return false}return this.networkState.type===NetworkType.kWiFi&&this.networkState.typeState.wifi.security!==SecurityType.kNone},showRoaming_(){if(!this.networkState){return false}return this.networkState.type===NetworkType.kCellular&&this.networkState.typeState.cellular.roaming},showIcon_(){return!!this.networkState},isPSimPendingActivationWhileLoggedOut_(){const cellularProperties=this.networkState.typeState.cellular;if(!cellularProperties||cellularProperties.eid||this.isUserLoggedIn_){return false}return cellularProperties.activationState==ActivationStateType.kNotActivated}});function getTemplate$j(){return html`<!--_html_template_start_--><style include="network-shared">
  :host {
    display: block;
  }

  :host([allow-error-message]) #input {
    --cr-input-error-display: block;
    margin-bottom: 0;
  }

  #container {
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  cr-input {
    flex: 1;
  }

  paper-tooltip {
    --paper-tooltip-min-width: 0px;
  }

  cr-policy-network-indicator-mojo {
    --cr-tooltip-icon-margin-start: var(--cr-controlled-by-spacing);
  }
</style>

<div id="container">
  <cr-input id="input" label="[[label]]" value="{{value}}"
      disabled="[[getDisabled_(disabled, property)]]"
      type="[[getInputType_(showPassword)]]"
      on-mousedown="onMousedown_"
      on-touchstart="onMousedown_"
      on-keydown="onKeydown_"
      invalid="[[invalid]]"
      error-message="[[errorMessage]]">
    <template is="dom-if" if="[[!showPolicyIndicator_]]" restamp>
      <div slot="suffix">
        <cr-icon-button id="icon"
            class$="[[getIconClass_(showPassword)]]"
            aria-describedby="passwordVisibilityTooltip"
            on-click="onShowPasswordTap_"
            on-touchend="onShowPasswordTap_">
        </cr-icon-button>
        <paper-tooltip id="passwordVisibilityTooltip"
            for="icon"
            position="[[tooltipPosition_]]"
            fit-to-visible-bounds role="tooltip">
          [[getShowPasswordTitle_(showPassword)]]
        </paper-tooltip>
      </div>
    </template>
  </cr-input>
  <template is="dom-if" if="[[showPolicyIndicator_]]" restamp>
    <cr-policy-network-indicator-mojo
        property="[[property]]" tooltip-position="left">
    </cr-policy-network-indicator>
  </template>
</div>
<!--_html_template_end_-->`}
// Copyright 2017 The Chromium Authors
Polymer({_template:getTemplate$j(),is:"network-password-input",behaviors:[i16nBehavior,CrPolicyNetworkBehaviorMojo,NetworkConfigElementBehavior],properties:{label:{type:String,reflectToAttribute:true},value:{type:String,notify:true},showPassword:{type:Boolean,value:false},invalid:{type:Boolean,value:false},allowErrorMessage:{type:Boolean,value:false},errorMessage:{type:String,value:""},tooltipPosition_:{type:String,value:""},showPolicyIndicator_:{type:Boolean,value:false,computed:"getDisabled_(disabled, property)"}},attached(){this.tooltipPosition_=window.getComputedStyle(this).direction==="rtl"?"right":"left"},focus(){this.$$("cr-input").focus();this.$$("cr-input").select()},getInputType_(){return this.showPassword?"text":"password"},isShowingPlaceholder_(){return this.value===FAKE_CREDENTIAL},getIconClass_(){return this.showPassword?"icon-visibility-off":"icon-visibility"},getShowPasswordTitle_(){return this.showPassword?this.i16n("hidePassword"):this.i16n("showPassword")},onShowPasswordTap_(event){if(event.type==="touchend"){event.preventDefault()}if(this.isShowingPlaceholder_()){this.value="";this.focus()}this.showPassword=!this.showPassword;event.stopPropagation()},onKeydown_(event){if(event.target.id==="input"&&event.key==="Enter"){event.stopPropagation();this.fire("enter");return}if(!this.isShowingPlaceholder_()){return}if(event.key.indexOf("Arrow")<0&&event.key!=="Home"&&event.key!=="End"){return}event.preventDefault()},onMousedown_(event){if(!this.isShowingPlaceholder_()){return}if(document.activeElement!==event.target){this.focus()}event.preventDefault()}});function getTemplate$i(){return html`<!--_html_template_start_--><style>
  #enter-pin-description {
    margin-bottom: 16px;
  }

  .pinEntrySubtext {
    font-size: var(--cr-form-field-label-font-size);
    font-weight: 400;
    margin-top: -10px;
  }

  :host([has-error-text_]) .pinEntrySubtext {
    color: var(--cros-text-color-alert);
  }

  #changePinOld {
    margin-top: 24px;
  }

  #unlockPin {
    margin-top: 24px;
  }

  #puk-warning-container {
    display: flex;
    margin-bottom: 24px;
    margin-top: 20px;
  }

  #puk-warning-icon {
    --iron-icon-fill-color: var(--cros-icon-color-alert);
    --iron-icon-height: 24px;
    --iron-icon-width: 24px;
    margin-inline-end: 4px;
  }

  :host([has-error-text_]) #puk-warning-container {
    color: var(--cros-text-color-alert);
  }
</style>
<!-- Enter PIN dialog -->
<cr-dialog id="enterPinDialog"
    on-cancel="onCancel_"
    close-text="[[i16n('close')]]">
  <div slot="title">[[i16n('networkSimEnterPinTitle')]]</div>
  <div slot="body">
    <div id="enter-pin-description" aria-hidden="true">
      [[getEnterPinDescription_(isSimPinLockRestricted_)]]
    </div>
    <network-password-input id="enterPin"
        value="{{pin_}}"
        on-enter="sendEnterPin_"
        disabled="[[inProgress_]]"
        invalid="[[hasErrorText_]]"
        aria-labeledby="pinEntrySubtext">
    </network-password-input>
    <div class="pinEntrySubtext" aria-live="assertive">
      [[getPinEntrySubtext_(error_, deviceState)]]
    </div>
  </div>
  <div slot="button-container">
    <cr-button class="cancel-button" on-click="onCancel_">
      [[i16n('cancel')]]
    </cr-button>
    <cr-button class="action-button"
        aria-describedby="enter-pin-description"
        on-click="sendEnterPin_"
        disabled="[[!enterPinEnabled_]]">
      [[i16n('networkSimEnter')]]
    </cr-button>
  </div>
</cr-dialog>

<!-- Change PIN dialog -->
<cr-dialog id="changePinDialog"
    on-cancel="onCancel_"
    close-text="[[i16n('close')]]">
  <div slot="title">[[i16n('networkSimChangePinTitle')]]</div>
  <div slot="body">
    <network-password-input id="changePinOld"
        value="{{pin_}}"
        label="[[i16n('networkSimEnterOldPin')]]"
        disabled="[[inProgress_]]"
        invalid="[[isOldPinInvalid_(error_, deviceState)]]"
        error-message="[[getOldPinErrorMessage_(error_, deviceState)]]"
        allow-error-message>
    </network-password-input>
    <network-password-input id="changePinNew1"
        value="{{pin_new1_}}"
        label="[[i16n('networkSimEnterNewPin')]]"
        disabled="[[inProgress_]]"
        allow-error-message>
    </network-password-input>
    <network-password-input id="changePinNew2"
        value="{{pin_new2_}}"
        label="[[i16n('networkSimReEnterNewPin')]]"
        on-enter="sendChangePin_"
        disabled="[[inProgress_]]"
        invalid="[[isSecondNewPinInvalid_(error_, deviceState)]]"
        error-message="[[getSecondNewPinErrorMessage_(error_, deviceState)]]"
        allow-error-message>
    </network-password-input>
  </div>
  <div slot="button-container">
    <cr-button class="cancel-button" on-click="onCancel_">
      [[i16n('cancel')]]
    </cr-button>
    <cr-button class="action-button"
        on-click="sendChangePin_"
        disabled="[[!changePinEnabled_]]">
      [[i16n('networkSimChange')]]
    </cr-button>
  </div>
</cr-dialog>

<!-- Unlock PIN dialog -->
<cr-dialog id="unlockPinDialog"
    on-cancel="onCancel_"
    close-text="[[i16n('close')]]">
  <div slot="title" aria-live="polite">[[i16n('networkSimLockedTitle')]]</div>
  <div slot="body">
    <template is="dom-if" if="[[isSimPinLockRestricted_]]">
      <div id="adminSubtitle">
        [[i16n('networkSimLockPolicyAdminSubtitle')]]
      </div>
    </template>
    <network-password-input id="unlockPin"
        value="{{pin_}}"
        on-enter="sendUnlockPin_"
        disabled="[[inProgress_]]">
    </network-password-input>
    <div class="pinEntrySubtext" aria-live="polite">
      [[getPinEntrySubtext_(error_, deviceState)]]
    </div>
  </div>
  <div slot="button-container">
    <cr-button class="cancel-button" on-click="onCancel_">
      [[i16n('cancel')]]
    </cr-button>
    <cr-button class="action-button"
        on-click="sendUnlockPin_"
        disabled="[[!enterPinEnabled_]]">
      [[i16n('networkSimUnlock')]]
    </cr-button>
  </div>
</cr-dialog>

<!-- Unlock PUK dialog -->
<cr-dialog id="unlockPukDialog"
    on-cancel="onCancel_"
    close-text="[[i16n('close')]]">
  <div slot="title" aria-live="polite">[[i16n('networkSimLockedTitle')]]</div>
  <div slot="body">
    <div id="puk-subtitle">
      [[getNetworkSimPukDialogString_(isSimPinLockRestricted_)]]
    </div>
    <div id="puk-warning-container">
      <template is="dom-if" if="[[hasErrorText_]]">
        <iron-icon id="puk-warning-icon" icon="cellular-setup:warning">
        </iron-icon>
      </template>
      <div aria-live="polite">
        [[getPukWarningMessage_(error_, deviceState,
            isSimPinLockRestricted_)]]
      </div>
    </div>
    <network-password-input id="unlockPuk"
        value="{{puk_}}"
        label="[[i16n('networkSimEnterPuk')]]"
        disabled="[[inProgress_]]"
        invalid="[[isPukInvalid_(error_, deviceState)]]"
        error-message="[[getPukErrorMessage_(error_, deviceState)]]"
        allow-error-message>
    </network-password-input>
    <!-- TODO(b/228093904): Use template dom-if instead of
      hidden for SIM PIN Lock Dialog refactor. -->
    <network-password-input id="unlockPin1"
        value="{{pin_new1_}}"
        label="[[i16n('networkSimEnterNewPin')]]"
        disabled="[[inProgress_]]"
        hidden="[[isSimPinLockRestricted_]]"
        allow-error-message>
    </network-password-input>
    <network-password-input id="unlockPin2"
        value="{{pin_new2_}}"
        label="[[i16n('networkSimReEnterNewPin')]]"
        on-enter="sendUnlockPuk_"
        disabled="[[inProgress_]]"
        invalid="[[isSecondNewPinInvalid_(error_, deviceState)]]"
        error-message="[[getSecondNewPinErrorMessage_(error_,
            deviceState)]]"
        hidden="[[isSimPinLockRestricted_]]"
        allow-error-message>
    </network-password-input>
  </div>
  <div slot="button-container">
    <cr-button class="cancel-button" on-click="onCancel_">
      [[i16n('cancel')]]
    </cr-button>
    <cr-button class="action-button"
        on-click="sendUnlockPuk_"
        disabled="[[!enterPukEnabled_]]"
        aria-describedby="puk-subtitle">
      [[i16n('networkSimUnlock')]]
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}
// Copyright 2021 The Chromium Authors
const ErrorType={NONE:"none",INCORRECT_PIN:"incorrect-pin",INCORRECT_PUK:"incorrect-puk",MISMATCHED_PIN:"mismatched-pin",INVALID_PIN:"invalid-pin",INVALID_PUK:"invalid-puk"};const DIGITS_ONLY_REGEX=/^[0-9]+$/;const PIN_MIN_LENGTH=4;const PUK_MIN_LENGTH=8;Polymer({_template:getTemplate$i(),is:"sim-lock-dialogs",behaviors:[i16nBehavior],properties:{deviceState:{type:Object,value:null,observer:"deviceStateChanged_"},globalPolicy:Object,isDialogOpen:{type:Boolean,value:false,notify:true},showChangePin:{type:Boolean,value:false},inProgress_:{type:Boolean,value:false,observer:"updateSubmitButtonEnabled_"},error_:{type:Object,value:ErrorType.NONE,observer:"updateSubmitButtonEnabled_"},hasErrorText_:{type:Boolean,computed:"computeHasErrorText_(error_, deviceState)",reflectToAttribute:true},pendingError_:{type:Object},enterPinEnabled_:Boolean,changePinEnabled_:Boolean,enterPukEnabled_:Boolean,pin_:{type:String,observer:"pinOrPukChange_"},pin_new1_:{type:String,observer:"pinOrPukChange_"},pin_new2_:{type:String,observer:"pinOrPukChange_"},puk_:{type:String,observer:"pinOrPukChange_"},isSimPinLockRestricted_:{type:Boolean,value:false,computed:"computeIsSimPinLockRestricted_(globalPolicy, globalPolicy.*)"}},networkConfig_:null,created(){this.networkConfig_=MojoInterfaceProviderImpl.getInstance().getMojoServiceRemote()},attached(){if(!this.deviceState){return}this.updateDialogVisibility_()},deviceStateChanged_(newDeviceState,oldDeviceState){if(!oldDeviceState||!newDeviceState){return}if(this.pendingError_){this.error_=this.pendingError_;this.pendingError_=undefined}this.updateDialogVisibility_()},updateDialogVisibility_(){const simLockStatus=this.deviceState.simLockStatus;if(!simLockStatus){this.isDialogOpen=false;return}if(!simLockStatus.lockEnabled){this.showEnterPinDialog_();this.isDialogOpen=true;return}if(simLockStatus.lockType==="sim-puk"){if(this.$.unlockPukDialog.open){return}this.closeDialogs_(true);this.showUnlockPukDialog_()}else if(simLockStatus.lockType==="sim-pin"){this.showUnlockPinDialog_()}else if(this.showChangePin){this.showChangePinDialog_()}else{this.showEnterPinDialog_()}this.isDialogOpen=true},showEnterPinDialog_(){if(this.$.enterPinDialog.open){return}this.$.enterPin.value="";this.$.enterPinDialog.showModal();requestAnimationFrame((()=>{this.focusDialogInput_()}))},showChangePinDialog_(){if(this.$.changePinDialog.open){return}this.$.changePinOld.value="";this.$.changePinNew1.value="";this.$.changePinNew2.value="";this.$.changePinDialog.showModal();requestAnimationFrame((()=>{this.focusDialogInput_()}))},showUnlockPukDialog_(){if(this.$.unlockPukDialog.open){return}this.error_=ErrorType.NONE;this.$.unlockPuk.value="";this.$.unlockPin1.value="";this.$.unlockPin2.value="";this.$.unlockPukDialog.showModal();requestAnimationFrame((()=>{this.$.unlockPuk.focus()}))},showUnlockPinDialog_(){if(this.$.unlockPinDialog.open){return}this.error_=ErrorType.NONE;this.$.unlockPin.value="";this.$.unlockPinDialog.showModal();requestAnimationFrame((()=>{this.$.unlockPin.focus()}))},computeIsSimPinLockRestricted_(){return!!this.globalPolicy&&!this.globalPolicy.allowCellularSimLock},pinOrPukChange_(){this.error_=ErrorType.NONE;this.updateSubmitButtonEnabled_()},sendEnterPin_(event){event.stopPropagation();if(!this.enterPinEnabled_){return}const pin=this.$.enterPin.value;if(!this.validatePin_(pin)){return}const isPinRequired=!!this.deviceState&&!!this.deviceState.simLockStatus&&!this.deviceState.simLockStatus.lockEnabled;const simState={currentPinOrPuk:pin,requirePin:isPinRequired};this.setCellularSimState_(simState)},sendChangePin_(event){event.stopPropagation();const newPin=this.$.changePinNew1.value;if(!this.validatePin_(newPin,this.$.changePinNew2.value)){return}const simState={currentPinOrPuk:this.$.changePinOld.value,newPin:newPin,requirePin:true};this.setCellularSimState_(simState)},sendUnlockPuk_(event){event.stopPropagation();const puk=this.$.unlockPuk.value;if(!this.validatePuk_(puk)){return}if(this.isSimPinLockRestricted_){this.unlockCellularSim_("",puk);return}const pin=this.$.unlockPin1.value;if(!this.validatePin_(pin,this.$.unlockPin2.value)){return}this.unlockCellularSim_(pin,puk)},sendUnlockPin_(event){event.stopPropagation();const pin=this.$.unlockPin.value;if(!this.validatePin_(pin)){return}this.unlockCellularSim_(pin)},setCellularSimState_(cellularSimState){this.setInProgress_();this.networkConfig_.setCellularSimState(cellularSimState).then((response=>{this.inProgress_=false;if(!response.success){this.pendingError_=ErrorType.INCORRECT_PIN;this.focusDialogInput_()}else{this.error_=ErrorType.NONE;this.closeDialogs_()}}));this.fire("user-action-setting-change")},closeDialogs_(skipIsDialogOpenUpdate){if(this.$.enterPinDialog.open){this.$.enterPinDialog.close()}if(this.$.changePinDialog.open){this.$.changePinDialog.close()}if(this.$.unlockPinDialog.open){this.$.unlockPinDialog.close()}if(this.$.unlockPukDialog.open){this.$.unlockPukDialog.close()}this.isDialogOpen=skipIsDialogOpenUpdate?skipIsDialogOpenUpdate:false},closeDialogsForTest(){this.closeDialogs_()},onCancel_(event){event.stopPropagation();this.closeDialogs_()},setInProgress_(){this.error_=ErrorType.NONE;this.pendingError_=ErrorType.NONE;this.inProgress_=true},updateSubmitButtonEnabled_(){const hasError=this.error_!==ErrorType.NONE;this.enterPinEnabled_=!this.inProgress_&&!!this.pin_&&!hasError;this.changePinEnabled_=!this.inProgress_&&!!this.pin_&&!!this.pin_new1_&&!!this.pin_new2_&&!hasError;this.enterPukEnabled_=!this.inProgress_&&!!this.puk_&&!hasError&&(this.isSimPinLockRestricted_||!!this.pin_new1_&&!!this.pin_new2_)},unlockCellularSim_(pin,opt_puk){this.setInProgress_();const cellularSimState={currentPinOrPuk:opt_puk||pin,requirePin:false};if(opt_puk){cellularSimState.newPin=pin}this.networkConfig_.setCellularSimState(cellularSimState).then((response=>{this.inProgress_=false;if(!response.success){this.pendingError_=opt_puk?ErrorType.INCORRECT_PUK:ErrorType.INCORRECT_PIN;this.focusDialogInput_()}else{this.error_=ErrorType.NONE;this.closeDialogs_()}}))},focusDialogInput_(){if(this.$.enterPinDialog.open){this.$.enterPin.focus()}else if(this.$.changePinDialog.open){if(this.isSecondNewPinInvalid_()){this.$.changePinNew2.focus()}else{this.$.changePinOld.focus()}}else if(this.$.unlockPinDialog.open){this.$.unlockPin.focus()}else if(this.$.unlockPukDialog.open){this.$.unlockPuk.focus()}},validatePin_(pin1,opt_pin2){if(!pin1.length){return false}if(pin1.length<PIN_MIN_LENGTH||!DIGITS_ONLY_REGEX.test(pin1)){this.error_=ErrorType.INVALID_PIN;this.focusDialogInput_();return false}if(opt_pin2!==undefined&&pin1!==opt_pin2){this.error_=ErrorType.MISMATCHED_PIN;this.focusDialogInput_();return false}return true},validatePuk_(puk){if(puk.length<PUK_MIN_LENGTH||!DIGITS_ONLY_REGEX.test(puk)){this.error_=ErrorType.INVALID_PUK;return false}return true},getEnterPinDescription_(){return this.isSimPinLockRestricted_?this.i16n("networkSimLockPolicyAdminSubtitle"):this.i16n("networkSimEnterPinDescription")},getErrorMsg_(){if(this.error_===ErrorType.NONE){return""}else if(this.error_===ErrorType.MISMATCHED_PIN){return this.i16n("networkSimErrorPinMismatch")}let errorStringId="";switch(this.error_){case ErrorType.INCORRECT_PIN:errorStringId="networkSimErrorIncorrectPin";break;case ErrorType.INCORRECT_PUK:errorStringId="networkSimErrorIncorrectPuk";break;case ErrorType.INVALID_PIN:errorStringId="networkSimErrorInvalidPin";break;case ErrorType.INVALID_PUK:errorStringId="networkSimErrorInvalidPuk";break;default:assertNotReached()}const retriesLeft=this.getNumRetriesLeft_();if(retriesLeft!==1&&(this.error_===ErrorType.INCORRECT_PIN||this.error_===ErrorType.INVALID_PIN)){errorStringId+="Plural"}return this.i16n(errorStringId,retriesLeft)},getNumRetriesLeft_(){if(!this.deviceState||!this.deviceState.simLockStatus){return 0}return this.deviceState.simLockStatus.retriesLeft},computeHasErrorText_(){return!!this.getErrorMsg_()},getPinEntrySubtext_(){const errorMessage=this.getErrorMsg_();if(errorMessage){return errorMessage}return this.i16n("networkSimEnterPinSubtext")},isOldPinInvalid_(){return this.error_===ErrorType.INCORRECT_PIN||this.error_===ErrorType.INVALID_PIN},getOldPinErrorMessage_(){if(this.isOldPinInvalid_()){return this.getErrorMsg_()}return""},isSecondNewPinInvalid_(){return this.error_===ErrorType.MISMATCHED_PIN},getSecondNewPinErrorMessage_(){if(this.isSecondNewPinInvalid_()){return this.getErrorMsg_()}return""},isPukInvalid_(){return this.error_===ErrorType.INCORRECT_PUK||this.error_===ErrorType.INVALID_PUK},getPukErrorMessage_(){if(this.isPukInvalid_()){return this.getErrorMsg_()}return""},getPukWarningMessage_(){return this.isSimPinLockRestricted_?this.getPukWarningSimPinRestrictedMessage_():this.getPukWarningSimPinUnrestrictedMessage_()},getNetworkSimPukDialogString_(){return this.isSimPinLockRestricted_?this.i16n("networkSimPukDialogManagedSubtitle"):this.i16n("networkSimPukDialogSubtitle")},getPukWarningSimPinUnrestrictedMessage_(){if(this.isPukInvalid_()){const retriesLeft=this.getNumRetriesLeft_();if(retriesLeft===1){return this.i16n("networkSimPukDialogWarningWithFailure",retriesLeft)}return this.i16n("networkSimPukDialogWarningWithFailures",retriesLeft)}return this.i16n("networkSimPukDialogWarningNoFailures")},getPukWarningSimPinRestrictedMessage_(){if(this.isPukInvalid_()){const retriesLeft=this.getNumRetriesLeft_();if(retriesLeft===1){return this.i16n("networkSimPukDialogManagedWarningWithFailure",retriesLeft)}return this.i16n("networkSimPukDialogManagedWarningWithFailures",retriesLeft)}return this.i16n("networkSimPukDialogManagedWarningNoFailures")}});function getTemplate$h(){return html`<!--_html_template_start_--><style

  include="cros-color-overrides"

>
  :host {
    --justify-margin: 8px;
    align-items: center;
    display: flex;
  }

  :host([enforced_]) {
    /* Disable pointer events for this whole element, as outer on-click gets
     * triggered when clicking anywhere in :host. */
    pointer-events: none;
  }

  cr-policy-pref-indicator {
    /* Enable pointer events for the indicator so :hover works. Disable
     * clicks via onIndicatorClick_ so outer on-click doesn't trigger. */
    pointer-events: all;
  }

  :host(:not([end-justified])) cr-policy-pref-indicator {
    margin-inline-start: var(--cr-controlled-by-spacing);
  }

  :host([end-justified]) cr-policy-pref-indicator {
    margin-inline-end: var(--cr-controlled-by-spacing);
    margin-inline-start: calc(
        var(--cr-controlled-by-spacing) - var(--justify-margin));
    order: -1;
  }
</style>

<cr-button class$="[[actionClass_]]"
    disabled="[[!buttonEnabled_(enforced_, disabled)]]">
  [[label]]
</cr-button>

<template is="dom-if" if="[[hasPrefPolicyIndicator(pref.*)]]" restamp>
  <cr-policy-pref-indicator pref="[[pref]]" on-click="onIndicatorClick_"
      icon-aria-label="[[label]]">
  </cr-policy-pref-indicator>
</template>
<!--_html_template_end_-->`}
// Copyright 2016 The Chromium Authors
const ControlledButtonElementBase=CrPolicyPrefMixin(PrefControlMixin(PolymerElement));class ControlledButtonElement extends ControlledButtonElementBase{static get is(){return"controlled-button"}static get template(){return getTemplate$h()}static get properties(){return{endJustified:{type:Boolean,value:false,reflectToAttribute:true},label:String,disabled:{type:Boolean,value:false,reflectToAttribute:true},actionClass_:{type:String,value:""},enforced_:{type:Boolean,computed:"isPrefEnforced(pref.*)",reflectToAttribute:true}}}connectedCallback(){super.connectedCallback();if(this.classList.contains("action-button")){this.actionClass_="action-button"}}focus(){this.shadowRoot.querySelector("cr-button").focus()}onIndicatorClick_(e){e.preventDefault();e.stopPropagation()}buttonEnabled_(enforced,disabled){return!enforced&&!disabled}}customElements.define(ControlledButtonElement.is,ControlledButtonElement);
// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class OpenWindowProxyImpl{openUrl(url){window.open(url)}static getInstance(){return instance$m||(instance$m=new OpenWindowProxyImpl)}static setInstance(obj){instance$m=obj}}let instance$m=null;
// Copyright 2016 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class ExtensionControlBrowserProxyImpl{disableExtension(extensionId){chrome.send("disableExtension",[extensionId])}manageExtension(extensionId){window.open("chrome://extensions?id="+extensionId)}static getInstance(){return instance$l||(instance$l=new ExtensionControlBrowserProxyImpl)}static setInstance(obj){instance$l=obj}}let instance$l=null;function getTemplate$g(){return html`<!--_html_template_start_--><style include="cros-color-overrides">:host{align-items:center;display:flex;margin-inline-start:36px;min-height:var(--cr-section-min-height)}img{margin-inline-end:16px}iron-icon[icon='cr:open-in-new']{fill:var(--text-color);height:var(--cr-icon-size);margin-inline-end:-10px;margin-inline-start:6px;width:var(--cr-icon-size)}#disable{margin-inline-start:8px}:host>span{flex:1;margin-inline-end:8px}</style>
<img role="presentation" src="chrome://extension-icon/[[extensionId]]/20/1">
<span>[[getLabel_(extensionName)]]</span>
<cr-button id="manage" on-click="onManageClick_">
  Manage
  <iron-icon icon="cr:open-in-new"></iron-icon>
</cr-button>
<template is="dom-if" if="[[extensionCanBeDisabled]]" restamp>
  <cr-button id="disable" on-click="onDisableClick_">Disable</cr-button>
</template>
<!--_html_template_end_-->`}
// Copyright 2016 The Chromium Authors
class ExtensionControlledIndicatorElement extends PolymerElement{static get is(){return"extension-controlled-indicator"}static get template(){return getTemplate$g()}static get properties(){return{extensionCanBeDisabled:Boolean,extensionId:String,extensionName:String}}getLabel_(){return loadTimeData.getStringF("controlledByExtension",this.extensionName)}onManageClick_(){const manageUrl="chrome://extensions/?id="+this.extensionId;OpenWindowProxyImpl.getInstance().openUrl(manageUrl)}onDisableClick_(){assert$1(this.extensionCanBeDisabled);ExtensionControlBrowserProxyImpl.getInstance().disableExtension(this.extensionId);this.dispatchEvent(new CustomEvent("extension-disable",{bubbles:true,composed:true}))}}customElements.define(ExtensionControlledIndicatorElement.is,ExtensionControlledIndicatorElement);const template$1=html`<!--
List icons here rather than importing large sets of (e.g. Polymer) icons.

NOTE: Icons should be exported at 20x20 px and should not need viewBox.
Many legacy icons were exported at 24px and use viewBox to scale down to 20px.
These icons may appear blurry.
-->

<iron-iconset-svg name="os-settings" size="20">
  <svg>
    <defs>
      <!-- Apps icon for Settings drawer -->
      <g id="apps"><rect width="20" height="20" fill="none"></rect><path d="M15 redacted"></path><path d="M5 redacted"></path><path d="M15 redacted"></path><path d="M12 redacted"></path><path d="M7 redacted"></path><path d="M10 redacted"></path><path d="M17 redacted"></path><path d="M5 redacted"></path><path d="M12 redacted"></path></g>

      <!-- About page section -->
      <g id="counter-1">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 redacted"></path>
      </g>
      <g id="counter-2">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 redacted"></path>
      </g>
      <g id="counter-3">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 redacted"></path>
      </g>
      <g id="counter-4">
        <path d="M10 redacted"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path>
      </g>
      <g id="counter-5">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 redacted"></path>
      </g>
      <g id="counter-6">
        <path d="M9 redacted"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path>
      </g>
      <g id="counter-7">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 redacted"></path>
      </g>
      <g id="counter-8">
        <path d="M11 redacted"></path>
        <path d="M10 redacted"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 redacted"></path>
      </g>
      <g id="counter-9">
        <path d="M10 redacted"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path>
      </g>

      <!-- Crostini Mascot icon for Settings drawer -->
      <g id="crostini-mascot" fill-rule="evenodd" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none"></rect>
        <path d="M6 redacted"></path>
      </g>

      <!-- Developer Tags icon for Settings drawer -->
      <g id="developer-tags" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none"></rect>
        <path d="M0 0h24v24H0V0z" fill="none"></path><path d="M16 redacted"></path>
      </g>

      <!-- Files section -->
      <g id="folder-outline"><path d="M16 redacted"></path></g>

      <!-- Offline -->
      <g id="offline"><path d="M11 redacted"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18 redacted"></path></g>

      <!-- MultiDevice Settings UI -->
      <g id="multidevice-better-together-suite" viewBox="0 0 24 24"><path d="M17 redacted"></path></g>
      <g id="multidevice-wifi-sync" viewBox="0 0 24 24" transform="translate(1.000000, 3.000000)" fill-rule="nonzero">
        <path d="M17 redacted"></path>
        <path d="M17 redacted" ></path>
      </g>
      <g id="multidevice-smart-lock" viewBox="0 0 24 24"><path d="M18 redacted"></path></g>
      <g id="multidevice-messages" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 redacted"></path></g>
      <g id="nearby-share" viewBox="0 0 24 24">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 redacted"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 redacted"></path>
      </g>
      <g id="failure-alert" width="26" height="26" viewBox="0 0 26 26">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 redacted"></path>
      </g>
      <g id="multidevice-recent-photos" width="20" height="20" viewBox="0 0 20 20">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 redacted"></path>
      </g>
      <g id="multidevice-notifications" width="20" height="20" viewBox="0 0 20 20">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18 redacted"></path>
      </g>
      <g id="multidevice-app-streaming" width="20" height="20" viewBox="0 0 20 20">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 redacted"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path>
      </g>
      <g id="multidevice-error" width="20" height="20" viewBox="0 0 20 20">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 redacted"></path>
      </g>
      <g id="multidevice-caption-error" width="16" height="16" viewBox="0 0 16 16">
        <path d="M6 redacted"></path>
        <path d="M6 redacted"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 redacted"></path>
      </g>

      <!-- Material icon from http://icons/ -->
      <g id="play-prism" viewBox="0 0 24 24"><path d="M20 redacted"></path></g>

      <!-- Plugin VM icon for Settings drawer -->
      <g id="plugin-vm" viewBox="0 0 24 24"><path transform="scale(1.2)" d="M7 redacted"></path></g>

      <!-- Personalization icon -->
      <g id="paint-brush"><path d="M4.5 redacted"></path></g>

      <!-- Printing section -->
      <g id="printer-status-green">
        <path d="M19,8 redacted"></path>
        <circle fill="#1e8e3e" cx="17" cy="15.5" r="3.5"></circle>
      </g>
      <g id="printer-status-grey">
        <path d="M19,8 redacted"></path>
        <circle fill="#dadce0" cx="17" cy="15.5" r="3.5"></circle>
      </g>
      <g id="printer-status-red">
        <path d="M19,8 redacted"></path>
        <circle fill="#d93025" cx="17" cy="15.5" r="3.5"></circle>
      </g>
      <g id="printer-status-green-dark">
        <path d="M19,8 redacted"></path>
        <circle fill="#81c995" cx="17" cy="15.5" r="3.5"></circle>
      </g>
      <g id="printer-status-grey-dark">
        <path d="M19,8 redacted"></path>
        <circle fill="#80868b" cx="17" cy="15.5" r="3.5"></circle>
      </g>
      <g id="printer-status-red-dark">
        <path d="M19,8 redacted"></path>
        <circle fill="#f28b82" cx="17" cy="15.5" r="3.5"></circle>
      </g>

      <!-- General OS Settings icons -->
      <g id="accessibility"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 redacted"></path></g>
      <g id="android"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 redacted"></path><path d="M5 redacted"></path><rect x="7" y="14.5038" width="2" height="4" rx="1"></rect><rect x="11" y="14.5038" width="2" height="4" rx="1"></rect><rect x="3" y="7.50378" width="1.5" height="6.5" rx="0.75"></rect><rect x="15.5" y="7.50378" width="1.5" height="6.5" rx="0.75"></rect></g>
      <g id="assistant"><path d="M6 redacted"></path><path d="M18 redacted"></path><path d="M15 redacted"></path></g>
      <g id="audio"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 redacted"></path></g>
      <g id="auth-key"><path d="M6 redacted"></path></g>
      <g id="autoclick" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 redacted"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path></g>
      <g id="camera"><path d="M10 redacted" fill="#1B1B1F"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 redacted" fill="#1B1B1F"></path></g>
      <g id="cellular"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 redacted"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 redacted"></path></g>
      <g id="chrome"><path d="M17 redacted"></path><path d="M6 redacted"></path><path d="M12 redacted"></path></g>
      <g id="chromevox" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 redacted"></path></g>
      <g id="contrast" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 redacted"></path></g>
      <g id="dictation" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="m12 redacted"></path></g>
      <g id="display"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 redacted"></path></g>
      <g id="docked-magnifier" viewBox="0 0 20 20"><path d="M14 redacted"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 redacted"></path></g>
      <g id="end-of-life-offer" viewBox="0 0 20 20"><path d="M7 redacted"></path></g>
      <g id="fullscreen-magnifier" viewBox="0 0 20 20"><path d="M14 redacted"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 redacted"></path></g>
      <g id="geolocation"><path d="M12 redacted" fill="#1B1B1F"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 redacted" fill="#1B1B1F"></path></g>
      <g id="google-drive"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 redacted"></path></g>
      <g id="google-play"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 redacted"></path></g>
      <g id="hard-drive"><path d="M14 redacted"></path></g>
      <g id="hotspot"><path d="M2 redacted"></path><path d="M15.5 redacted"></path><path d="M10.5 redacted"></path></g>
      <g id="ic-checked-filled"><circle cx="10" cy="10" r="8" fill="#1967D2"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M8 redacted" fill="white"></path></g>
      <g id="ic-checked-filled-dark"><circle cx="10" cy="10" r="8" fill="#AECBFA"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M8 redacted" fill="#2A2A2D"></path></g>
      <g id="launcher" viewbox="0 0 20 20">
        <path d="M10 redacted"></path>
        <path fill-rule="evenodd" d="M10 redacted"></path>
      </g>
      <g id="lock"><path d="M11 redacted"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14 redacted"></path></g>
      <g id="keyboard"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 redacted"></path></g>
      <g id="magic-tethering"><path d="M19 redacted"></path><path d="M6. redacted"></path></g>
      <g id="microphone"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted" fill="#1B1B1F"></path></g>
      <g id="mouse"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path></g>
      <g id="network-wifi"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path></g>
      <g id="on-screen-keyboard" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 redacted"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M2 redacted"></path></g>
      <g id="print"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 redacted"></path></g>
      <g id="printer-add"><path fill-opacity=".3" d="M17 redacted"></path><polygon points="redacted"></polygon></g>
      <g id="refresh"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path></g>
      <g id="restore"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 redacted"></path></g>
      <g id="select-to-speak" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 redacted"></path></g>
      <g id="social-group"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 redacted"></path></g>
      <g id="stylus"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 redacted"></path></g>
      <g id="switch-access" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 redacted"></path></g>
      <g id="sync"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 redacted"></path></g>
      <g id="wallpaper"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 redacted"></path></g>

      <!-- Switch Access Action Assignment Dialog icons -->
      <g id="add-assignment" fill-rule="evenodd"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 redacted"></path></g>
      <g id="assigned"><path d="M13 redacted"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10 redacted"></path></g>
      <g id="error"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 redacted"></path></g>
      <g id="remove-assignment" fill-rule="evenodd"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 redacted"></path></g>

      <!-- Keep alphabetized. -->

      <!--
      These icons are copied from Polymer's iron-icons and kept in sorted order.
      See http://goo.gl/Y1OdAq for instructions on adding additional icons.
      -->
      <g id="access-time" viewBox="0 0 24 24"><path d="M11 redacted"></path></g>
      <g id="alert-device-out-of-range" viewBox="0 0 24 24"><path d="M8 redacted"></path></g>
      <g id="bluetooth" viewBox="0 0 24 24"><path d="M17. redacted"></path></g>
      <g id="bluetooth-connected" viewBox="0 0 24 24"><path d="M7 redacted"></path></g>
      <g id="bluetooth-disabled" viewBox="0 0 24 24"><path d="M13 redacted"></path></g>
      <g id="chevron-left" viewBox="0 0 24 24"><path d="M15 redacted"></path></g>
      <g id="end-of-life" viewBox="0 0 24 24"><path d="M4 redacted" fill-rule="evenodd"></path></g>
      <g id="feedback" viewBox="0 0 24 24"><path d="M20 redacted"></path></g>
      <g id="fingerprint" viewBox="0 0 24 24"><path d="M17 redacted"></path></g>
      <g id="gamepad" viewBox="0 0 24 24"><path d="M15 redacted"></path></g>
      <g id="headset" viewBox="0 0 24 24"><path d="M12 redacted"></path></g>
      <g id="hotspot-disabled"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 redacted"></path></g>
      <g id="hotspot-enabled"><path d="M2 redacted"></path><path d="M10.5 redacted"></path></g>
      <g id="info-outline" viewBox="0 0 24 24"><path d="M11 redacted"></path></g>
      <g id="language" viewBox="0 0 24 24"><path d="M11 redacted"></path></g>
      <g id="laptop-chromebook" viewBox="0 0 24 24"><path d="M22 redacted"></path></g>
      <g id="power" viewBox="0 0 24 24"><path d="M16 redacted"></path></g>
      <g id="settings-ethernet" viewBox="0 0 24 24"><path d="M7 redacted"></path></g>
      <g id="settings-general" viewBox="0 0 24 24"><path d="M19. redacted"></path></g>
      <g id="signal-cellular-0-bar" viewBox="0 0 24 24"><path fill-opacity=".3" d="M2 redacted"></path></g>
      <g id="signal-cellular-1-bar" viewBox="0 0 24 24"><path fill-opacity=".3" d="M2 redacted"></path><path d="M12 redacted"></path></g>
      <g id="signal-cellular-2-bar" viewBox="0 0 24 24"><path fill-opacity=".3" d="M2 redacted"></path><path d="M14 redacted"></path></g>
      <g id="signal-cellular-3-bar" viewBox="0 0 24 24"><path fill-opacity=".3" d="M2 redacted"></path><path d="M17 redacted"></path></g>
      <g id="signal-cellular-4-bar" viewBox="0 0 24 24"><path d="M2 redacted"></path></g>
      <g id="smartphone" viewBox="0 0 24 24"><path d="M17 redacted"></path></g>
      <g id="startup" viewBox="0 0 24 24"><path d="M13 3h-redacted"></path></g>
      <g id="tablet" viewBox="0 0 24 24"><path d="M21 redacted"></path></g>
      <!-- Keep alphabetized. -->
    </defs>
  </svg>
</iron-iconset-svg>
`;document.head.appendChild(template$1.content);
// Copyright 2019 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$k=null;class OsSyncBrowserProxyImpl{static getInstance(){return instance$k||(instance$k=new OsSyncBrowserProxyImpl)}static setInstanceForTesting(obj){instance$k=obj}didNavigateToOsSyncPage(){chrome.send("DidNavigateToOsSyncPage")}didNavigateAwayFromOsSyncPage(){chrome.send("DidNavigateAwayFromOsSyncPage")}sendOsSyncPrefsChanged(){chrome.send("OsSyncPrefsDispatch")}setOsSyncDatatypes(osSyncPrefs){return chrome.send("SetOsSyncDatatypes",[osSyncPrefs])}}
// Copyright 2017 The Chromium Authors
let instance$j=null;class InternetPageBrowserProxyImpl{static getInstance(){return instance$j||(instance$j=new InternetPageBrowserProxyImpl)}static setInstance(obj){instance$j=obj}showCarrierAccountDetail(guid){chrome.send("showCarrierAccountDetail",[guid])}showCellularSetupUi(guid){chrome.send("showCellularSetupUi",[guid])}showPortalSignin(guid){chrome.send("showPortalSignin",[guid])}configureThirdPartyVpn(guid){chrome.send("configureThirdPartyVpn",[guid])}addThirdPartyVpn(appId){chrome.send("addThirdPartyVpn",[appId])}requestGmsCoreNotificationsDisabledDeviceNames(){chrome.send("requestGmsCoreNotificationsDisabledDeviceNames")}setGmsCoreNotificationsDisabledDeviceNamesCallback(callback){addWebUiListener("sendGmsCoreNotificationsDisabledDeviceNames",callback)}}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const CellularSetupPageName={ESIM_FLOW_UI:"esim-flow-ui",PSIM_FLOW_UI:"psim-flow-ui"};const ButtonState={ENABLED:1,DISABLED:2,HIDDEN:3};const Button={BACKWARD:1,CANCEL:2,FORWARD:3};
// Copyright 2017 The Chromium Authors
let hideInk=false;document.addEventListener("pointerdown",(function(){hideInk=true}),true);document.addEventListener("keydown",(function(){hideInk=false}),true);const focusWithoutInk=function(toFocus){if(!("noink"in toFocus)||!hideInk){toFocus.focus();return}assert(document===toFocus.ownerDocument);const{noink:noink}=toFocus;toFocus.noink=true;toFocus.focus();toFocus.noink=noink};
// Copyright 2011 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class EventTracker{constructor(){this.listeners_=[]}add(target,eventType,listener,capture=false){const h={target:target,eventType:eventType,listener:listener,capture:capture};this.listeners_.push(h);target.addEventListener(eventType,listener,capture)}remove(target,eventType){this.listeners_=this.listeners_.filter((listener=>{if(listener.target===target&&(!eventType||listener.eventType===eventType)){EventTracker.removeEventListener(listener);return false}return true}))}removeAll(){this.listeners_.forEach((listener=>EventTracker.removeEventListener(listener)));this.listeners_=[]}static removeEventListener(entry){entry.target.removeEventListener(entry.eventType,entry.listener,entry.capture)}}
// Copyright 2012 The Chromium Authors
function isRTL(){return document.documentElement.dir==="rtl"}function hasKeyModifiers(e){return!!(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)}
// Copyright 2014 The Chromium Authors
class FocusRow{constructor(root,boundary,delegate){this.root=root;this.boundary_=boundary||document.documentElement;this.delegate=delegate;this.eventTracker=new EventTracker}static isFocusable(element){if(!element||element.disabled){return false}let current=element;while(true){assertInstanceof(current,Element);const style=window.getComputedStyle(current);if(style.visibility==="hidden"||style.display==="none"){return false}const parent=current.parentNode;if(!parent){return false}if(parent===current.ownerDocument||parent instanceof DocumentFragment){return true}current=parent}}static getFocusableElement(element){if(element.getFocusableElement){return element.getFocusableElement()}return element}addItem(type,selectorOrElement){assert(type);let element;if(typeof selectorOrElement==="string"){element=this.root.querySelector(selectorOrElement)}else{element=selectorOrElement}if(!element){return false}element.setAttribute("focus-type",type);element.tabIndex=this.isActive()?0:-1;this.eventTracker.add(element,"blur",this.onBlur_.bind(this));this.eventTracker.add(element,"focus",this.onFocus_.bind(this));this.eventTracker.add(element,"keydown",this.onKeydown_.bind(this));this.eventTracker.add(element,"mousedown",this.onMousedown_.bind(this));return true}destroy(){this.eventTracker.removeAll()}getCustomEquivalent(sampleElement){return assert(this.getFirstFocusable())}getElements(){return Array.from(this.root.querySelectorAll("[focus-type]")).map(FocusRow.getFocusableElement)}getEquivalentElement(sampleElement){if(this.getFocusableElements().indexOf(sampleElement)>=0){return sampleElement}const sampleFocusType=this.getTypeForElement(sampleElement);if(sampleFocusType){const sameType=this.getFirstFocusable(sampleFocusType);if(sameType){return sameType}}return this.getCustomEquivalent(sampleElement)}getFirstFocusable(opt_type){const element=this.getFocusableElements().find((el=>!opt_type||el.getAttribute("focus-type")===opt_type));return element||null}getFocusableElements(){return this.getElements().filter(FocusRow.isFocusable)}getTypeForElement(element){return element.getAttribute("focus-type")||""}isActive(){return this.root.classList.contains(FocusRow.ACTIVE_CLASS)}makeActive(active){if(active===this.isActive()){return}this.getElements().forEach((function(element){element.tabIndex=active?0:-1}));this.root.classList.toggle(FocusRow.ACTIVE_CLASS,active)}onBlur_(e){if(!this.boundary_.contains(e.relatedTarget)){return}const currentTarget=e.currentTarget;if(this.getFocusableElements().indexOf(currentTarget)>=0){this.makeActive(false)}}onFocus_(e){if(this.delegate){this.delegate.onFocus(this,e)}}onMousedown_(e){if(e.button){return}if(!e.currentTarget.disabled){e.currentTarget.tabIndex=0}}onKeydown_(e){const elements=this.getFocusableElements();const currentElement=FocusRow.getFocusableElement(e.currentTarget);const elementIndex=elements.indexOf(currentElement);assert(elementIndex>=0);if(this.delegate&&this.delegate.onKeydown(this,e)){return}const isShiftTab=!e.altKey&&!e.ctrlKey&&!e.metaKey&&e.shiftKey&&e.key==="Tab";if(hasKeyModifiers(e)&&!isShiftTab){return}let index=-1;let shouldStopPropagation=true;if(isShiftTab){index=elementIndex-1;if(index<0){return}}else if(e.key==="ArrowLeft"){index=elementIndex+(isRTL()?1:-1)}else if(e.key==="ArrowRight"){index=elementIndex+(isRTL()?-1:1)}else if(e.key==="Home"){index=0}else if(e.key==="End"){index=elements.length-1}else{shouldStopPropagation=false}const elementToFocus=elements[index];if(elementToFocus){this.getEquivalentElement(elementToFocus).focus();e.preventDefault()}if(shouldStopPropagation){e.stopPropagation()}}}FocusRow.ACTIVE_CLASS="focus-row-active";
// Copyright 2017 The Chromium Authors
class FocusRowBehaviorDelegate{constructor(listItem){this.listItem_=listItem}onFocus(row,e){const element=e.composedPath()[0];const focusableElement=FocusRow.getFocusableElement(element);if(element!==focusableElement){focusableElement.focus()}this.listItem_.lastFocused=focusableElement}onKeydown(row,e){if(e.key==="Enter"){e.stopPropagation()}return false}getCustomEquivalent(sampleElement){return this.listItem_.overrideCustomEquivalent?this.listItem_.getCustomEquivalent(sampleElement):null}}class VirtualFocusRow extends FocusRow{constructor(root,delegate){super(root,null,delegate)}getCustomEquivalent(sampleElement){return this.delegate.getCustomEquivalent(sampleElement)||super.getCustomEquivalent(sampleElement)}}const FocusRowBehavior={properties:{row_:Object,mouseFocused_:Boolean,id:{type:String,reflectToAttribute:true},isFocused:{type:Boolean,notify:true},focusRowIndex:{type:Number,observer:"focusRowIndexChanged"},lastFocused:{type:Object,notify:true},ironListTabIndex:{type:Number,observer:"ironListTabIndexChanged_"},listBlurred:{type:Boolean,notify:true}},computeId_(index){return index!==undefined?`frb${index}`:undefined},focusRowIndexChanged(newIndex,oldIndex){this.setAttribute("aria-rowindex",newIndex+1);if(this.id===this.computeId_(oldIndex)){this.id=this.computeId_(newIndex)}},firstControl_:null,controlObservers_:[],attached(){this.classList.add("no-outline");afterNextRender(this,(function(){const rowContainer=this.root.querySelector("[focus-row-container]");assert(rowContainer);this.row_=new VirtualFocusRow(rowContainer,new FocusRowBehaviorDelegate(this));this.addItems_();this.listen(this,"focus","onFocus_");this.listen(this,"dom-change","addItems_");this.listen(this,"mousedown","onMouseDown_");this.listen(this,"blur","onBlur_")}))},detached(){this.unlisten(this,"focus","onFocus_");this.unlisten(this,"dom-change","addItems_");this.unlisten(this,"mousedown","onMouseDown_");this.unlisten(this,"blur","onBlur_");this.removeObservers_();if(this.firstControl_){this.unlisten(this.firstControl_,"keydown","onFirstControlKeydown_")}if(this.row_){this.row_.destroy()}},getFocusRow(){return assert(this.row_)},updateFirstControl_(){const newFirstControl=this.row_.getFirstFocusable();if(newFirstControl===this.firstControl_){return}if(this.firstControl_){this.unlisten(this.firstControl_,"keydown","onFirstControlKeydown_")}this.firstControl_=newFirstControl;if(this.firstControl_){this.listen(this.firstControl_,"keydown","onFirstControlKeydown_")}},removeObservers_(){if(this.controlObservers_.length>0){this.controlObservers_.forEach((observer=>{observer.disconnect()}))}this.controlObservers_=[]},addItems_(){this.ironListTabIndexChanged_();if(this.row_){this.removeObservers_();this.row_.destroy();const controls=this.root.querySelectorAll("[focus-row-control]");controls.forEach((control=>{this.row_.addItem(control.getAttribute("focus-type"),FocusRow.getFocusableElement(control));this.addMutationObservers_(assert(control))}));this.updateFirstControl_()}},createObserver_(){return new MutationObserver((mutations=>{const mutation=mutations[0];if(mutation.attributeName==="style"&&mutation.oldValue){const newStyle=window.getComputedStyle(mutation.target);const oldDisplayValue=mutation.oldValue.match(/^display:(.*)(?=;)/);const oldVisibilityValue=mutation.oldValue.match(/^visibility:(.*)(?=;)/);if(oldDisplayValue&&newStyle.display===oldDisplayValue[1].trim()&&oldVisibilityValue&&newStyle.visibility===oldVisibilityValue[1].trim()){return}}this.updateFirstControl_()}))},addMutationObservers_(control){let current=control;while(current&&current!==this.root){const currentObserver=this.createObserver_();currentObserver.observe(current,{attributes:true,attributeFilter:["hidden","disabled","style"],attributeOldValue:true});this.controlObservers_.push(currentObserver);current=current.parentNode}},onFocus_(e){if(this.mouseFocused_){this.mouseFocused_=false;return}const restoreFocusToFirst=this.listBlurred&&e.composedPath()[0]===this;if(this.lastFocused&&!restoreFocusToFirst){focusWithoutInk(this.row_.getEquivalentElement(this.lastFocused))}else{const firstFocusable=assert(this.firstControl_);focusWithoutInk(firstFocusable)}this.listBlurred=false;this.isFocused=true},onFirstControlKeydown_(e){if(e.shiftKey&&e.key==="Tab"){this.focus()}},ironListTabIndexChanged_(){if(this.row_){this.row_.makeActive(this.ironListTabIndex===0)}if(this.ironListTabIndex===0){this.listBlurred=false}},onMouseDown_(){this.mouseFocused_=true},onBlur_(e){this.mouseFocused_=false;this.isFocused=false;const node=e.relatedTarget?e.relatedTarget:null;if(!this.parentNode.contains(node)){this.listBlurred=true}}};
// Copyright 2016 The Chromium Authors
const CrScrollableBehavior={intervalId_:null,ready(){beforeNextRender(this,(()=>{this.requestUpdateScroll();const scrollableElements=this.shadowRoot.querySelectorAll("[scrollable]");for(let i=0;i<scrollableElements.length;i++){scrollableElements[i].addEventListener("scroll",this.updateScrollEvent_.bind(this))}}))},detached(){if(this.intervalId_!==null){clearInterval(this.intervalId_)}},updateScrollableContents(){if(this.intervalId_!==null){return}this.requestUpdateScroll();const nodeList=this.shadowRoot.querySelectorAll("[scrollable] iron-list");if(!nodeList.length){return}let nodesToResize=Array.from(nodeList).map((node=>({node:node,lastScrollHeight:0})));this.intervalId_=window.setInterval((()=>{const checkAgain=[];nodesToResize.forEach((({node:node,lastScrollHeight:lastScrollHeight})=>{const scrollHeight=node.parentNode.scrollHeight;if(scrollHeight!==lastScrollHeight){const ironList=node;ironList.notifyResize()}if(scrollHeight<=1&&window.getComputedStyle(node.parentNode).display!=="none"){checkAgain.push({node:node,lastScrollHeight:scrollHeight})}}));if(checkAgain.length===0){window.clearInterval(this.intervalId_);this.intervalId_=null}else{nodesToResize=checkAgain}}),10)},requestUpdateScroll(){requestAnimationFrame(function(){const scrollableElements=this.shadowRoot.querySelectorAll("[scrollable]");for(let i=0;i<scrollableElements.length;i++){this.updateScroll_(scrollableElements[i])}}.bind(this))},saveScroll(list){list.savedScrollTops=list.savedScrollTops||[];list.savedScrollTops.push(list.scrollTarget.scrollTop)},restoreScroll(list){this.async((function(){const scrollTop=list.savedScrollTops.shift();if(scrollTop!==0){list.scroll(0,scrollTop)}}))},updateScrollEvent_(event){const scrollable=event.target;this.updateScroll_(scrollable)},updateScroll_(scrollable){scrollable.classList.toggle("can-scroll",scrollable.clientHeight<scrollable.scrollHeight);scrollable.classList.toggle("is-scrolled",scrollable.scrollTop>0);scrollable.classList.toggle("scrolled-to-bottom",scrollable.scrollTop+scrollable.clientHeight>=scrollable.scrollHeight)}};const styleMod=document.createElement("dom-module");styleMod.appendChild(html`
  <template>
    <style>

cr-icon-button.icon-add-circle {
  --cr-icon-button-fill-color: var(--cros-button-icon-color-secondary);
  --cr-icon-image: url(chrome://os-settings/images/icon_add_circle.svg);
}
cr-icon-button.icon-add-wifi {
  --cr-icon-button-fill-color: var(--cros-button-icon-color-secondary);
  --cr-icon-image: url(chrome://os-settings/images/icon_add_wifi.svg);
}
cr-icon-button.icon-pair-bluetooth {
  --cr-icon-button-fill-color: var(--cros-button-icon-color-secondary);
  --cr-icon-image: url(chrome://os-settings/images/icon_pair_bluetooth.svg);
}
cr-icon-button.icon-add-cellular {
  --cr-icon-button-fill-color: var(--cros-button-icon-color-secondary);
  --cr-icon-image: url(chrome://os-settings/images/icon_add_cellular.svg);
}
    </style>
  </template>
`.content);styleMod.register("os-settings-icons");
// Copyright 2020 The Chromium Authors
const ESimManagerListenerBehavior={observer_:null,attached(){observeESimManager(this)},onAvailableEuiccListChanged(){},onProfileListChanged(euicc){},onEuiccChanged(euicc){},onProfileChanged(profile){}};
// Copyright 2018 The Chromium Authors
let instance$i=null;class MultiDeviceBrowserProxyImpl{static getInstance(){return instance$i||(instance$i=new MultiDeviceBrowserProxyImpl)}static setInstanceForTesting(obj){instance$i=obj}showMultiDeviceSetupDialog(){chrome.send("showMultiDeviceSetupDialog")}getPageContentData(){return sendWithPromise("getPageContentData")}setFeatureEnabledState(feature,enabled,authToken){return sendWithPromise("setFeatureEnabledState",feature,enabled,authToken)}removeHostDevice(){chrome.send("removeHostDevice")}retryPendingHostSetup(){chrome.send("retryPendingHostSetup")}setUpAndroidSms(){chrome.send("setUpAndroidSms")}getSmartLockSignInAllowed(){return sendWithPromise("getSmartLockSignInAllowed")}getAndroidSmsInfo(){return sendWithPromise("getAndroidSmsInfo")}attemptNotificationSetup(){chrome.send("attemptNotificationSetup")}cancelNotificationSetup(){chrome.send("cancelNotificationSetup")}attemptAppsSetup(){chrome.send("attemptAppsSetup")}cancelAppsSetup(){chrome.send("cancelAppsSetup")}attemptCombinedFeatureSetup(showCameraRoll,showNotifications){chrome.send("attemptCombinedFeatureSetup",[showCameraRoll,showNotifications])}cancelCombinedFeatureSetup(){chrome.send("cancelCombinedFeatureSetup")}attemptFeatureSetupConnection(){chrome.send("attemptFeatureSetupConnection")}cancelFeatureSetupConnection(){chrome.send("cancelFeatureSetupConnection")}showBrowserSyncSettings(){chrome.send("showBrowserSyncSettings")}logPhoneHubPermissionSetUpScreenAction(screen,action){chrome.send("logPhoneHubPermissionSetUpScreenAction",[screen,action])}logPhoneHubPermissionSetUpButtonClicked(setupMode){chrome.send("logPhoneHubPermissionSetUpButtonClicked",[setupMode])}logPhoneHubPermissionOnboardingSetupMode(setupMode){chrome.send("logPhoneHubPermissionOnboardingSetupMode",[setupMode])}logPhoneHubPermissionOnboardingSetupResult(completedMode){chrome.send("logPhoneHubPermissionOnboardingSetupResult",[completedMode])}}
// Copyright 2018 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var MultiDeviceSettingsMode;(function(MultiDeviceSettingsMode){MultiDeviceSettingsMode[MultiDeviceSettingsMode["NO_ELIGIBLE_HOSTS"]=0]="NO_ELIGIBLE_HOSTS";MultiDeviceSettingsMode[MultiDeviceSettingsMode["NO_HOST_SET"]=1]="NO_HOST_SET";MultiDeviceSettingsMode[MultiDeviceSettingsMode["HOST_SET_WAITING_FOR_SERVER"]=2]="HOST_SET_WAITING_FOR_SERVER";MultiDeviceSettingsMode[MultiDeviceSettingsMode["HOST_SET_WAITING_FOR_VERIFICATION"]=3]="HOST_SET_WAITING_FOR_VERIFICATION";MultiDeviceSettingsMode[MultiDeviceSettingsMode["HOST_SET_VERIFIED"]=4]="HOST_SET_VERIFIED"})(MultiDeviceSettingsMode||(MultiDeviceSettingsMode={}));var MultiDeviceFeature;(function(MultiDeviceFeature){MultiDeviceFeature[MultiDeviceFeature["BETTER_TOGETHER_SUITE"]=0]="BETTER_TOGETHER_SUITE";MultiDeviceFeature[MultiDeviceFeature["INSTANT_TETHERING"]=1]="INSTANT_TETHERING";MultiDeviceFeature[MultiDeviceFeature["MESSAGES"]=2]="MESSAGES";MultiDeviceFeature[MultiDeviceFeature["SMART_LOCK"]=3]="SMART_LOCK";MultiDeviceFeature[MultiDeviceFeature["PHONE_HUB"]=4]="PHONE_HUB";MultiDeviceFeature[MultiDeviceFeature["PHONE_HUB_NOTIFICATIONS"]=5]="PHONE_HUB_NOTIFICATIONS";MultiDeviceFeature[MultiDeviceFeature["PHONE_HUB_TASK_CONTINUATION"]=6]="PHONE_HUB_TASK_CONTINUATION";MultiDeviceFeature[MultiDeviceFeature["WIFI_SYNC"]=7]="WIFI_SYNC";MultiDeviceFeature[MultiDeviceFeature["ECHE"]=8]="ECHE";MultiDeviceFeature[MultiDeviceFeature["PHONE_HUB_CAMERA_ROLL"]=9]="PHONE_HUB_CAMERA_ROLL"})(MultiDeviceFeature||(MultiDeviceFeature={}));var MultiDeviceFeatureState;(function(MultiDeviceFeatureState){MultiDeviceFeatureState[MultiDeviceFeatureState["PROHIBITED_BY_POLICY"]=0]="PROHIBITED_BY_POLICY";MultiDeviceFeatureState[MultiDeviceFeatureState["DISABLED_BY_USER"]=1]="DISABLED_BY_USER";MultiDeviceFeatureState[MultiDeviceFeatureState["ENABLED_BY_USER"]=2]="ENABLED_BY_USER";MultiDeviceFeatureState[MultiDeviceFeatureState["NOT_SUPPORTED_BY_CHROMEBOOK"]=3]="NOT_SUPPORTED_BY_CHROMEBOOK";MultiDeviceFeatureState[MultiDeviceFeatureState["NOT_SUPPORTED_BY_PHONE"]=4]="NOT_SUPPORTED_BY_PHONE";MultiDeviceFeatureState[MultiDeviceFeatureState["UNAVAILABLE_NO_VERIFIED_HOST"]=5]="UNAVAILABLE_NO_VERIFIED_HOST";MultiDeviceFeatureState[MultiDeviceFeatureState["UNAVAILABLE_INSUFFICIENT_SECURITY"]=6]="UNAVAILABLE_INSUFFICIENT_SECURITY";MultiDeviceFeatureState[MultiDeviceFeatureState["UNAVAILABLE_SUITE_DISABLED"]=7]="UNAVAILABLE_SUITE_DISABLED";MultiDeviceFeatureState[MultiDeviceFeatureState["FURTHER_SETUP_REQUIRED"]=8]="FURTHER_SETUP_REQUIRED";MultiDeviceFeatureState[MultiDeviceFeatureState["UNAVAILABLE_TOP_LEVEL_FEATURE_DISABLED"]=9]="UNAVAILABLE_TOP_LEVEL_FEATURE_DISABLED";MultiDeviceFeatureState[MultiDeviceFeatureState["UNAVAILABLE_NO_VERIFIED_HOST_CLIENT_NOT_READY"]=10]="UNAVAILABLE_NO_VERIFIED_HOST_CLIENT_NOT_READY";MultiDeviceFeatureState[MultiDeviceFeatureState["UNAVAILABLE_NO_VERIFIED_HOST_NO_ELIGIBLE_HOST"]=11]="UNAVAILABLE_NO_VERIFIED_HOST_NO_ELIGIBLE_HOST"})(MultiDeviceFeatureState||(MultiDeviceFeatureState={}));var PhoneHubFeatureAccessStatus;(function(PhoneHubFeatureAccessStatus){PhoneHubFeatureAccessStatus[PhoneHubFeatureAccessStatus["PROHIBITED"]=0]="PROHIBITED";PhoneHubFeatureAccessStatus[PhoneHubFeatureAccessStatus["AVAILABLE_BUT_NOT_GRANTED"]=1]="AVAILABLE_BUT_NOT_GRANTED";PhoneHubFeatureAccessStatus[PhoneHubFeatureAccessStatus["ACCESS_GRANTED"]=2]="ACCESS_GRANTED"})(PhoneHubFeatureAccessStatus||(PhoneHubFeatureAccessStatus={}));var PhoneHubFeatureAccessProhibitedReason;(function(PhoneHubFeatureAccessProhibitedReason){PhoneHubFeatureAccessProhibitedReason[PhoneHubFeatureAccessProhibitedReason["UNKNOWN"]=0]="UNKNOWN";PhoneHubFeatureAccessProhibitedReason[PhoneHubFeatureAccessProhibitedReason["WORK_PROFILE"]=1]="WORK_PROFILE";PhoneHubFeatureAccessProhibitedReason[PhoneHubFeatureAccessProhibitedReason["DISABLED_BY_PHONE_POLICY"]=2]="DISABLED_BY_PHONE_POLICY"})(PhoneHubFeatureAccessProhibitedReason||(PhoneHubFeatureAccessProhibitedReason={}));var PhoneHubPermissionsSetupMode;(function(PhoneHubPermissionsSetupMode){PhoneHubPermissionsSetupMode[PhoneHubPermissionsSetupMode["INIT_MODE"]=0]="INIT_MODE";PhoneHubPermissionsSetupMode[PhoneHubPermissionsSetupMode["NOTIFICATION_SETUP_MODE"]=1]="NOTIFICATION_SETUP_MODE";PhoneHubPermissionsSetupMode[PhoneHubPermissionsSetupMode["APPS_SETUP_MODE"]=2]="APPS_SETUP_MODE";PhoneHubPermissionsSetupMode[PhoneHubPermissionsSetupMode["CAMERA_ROLL_SETUP_MODE"]=3]="CAMERA_ROLL_SETUP_MODE";PhoneHubPermissionsSetupMode[PhoneHubPermissionsSetupMode["ALL_PERMISSIONS_SETUP_MODE"]=4]="ALL_PERMISSIONS_SETUP_MODE"})(PhoneHubPermissionsSetupMode||(PhoneHubPermissionsSetupMode={}));var PhoneHubPermissionsSetupFlowScreens;(function(PhoneHubPermissionsSetupFlowScreens){PhoneHubPermissionsSetupFlowScreens[PhoneHubPermissionsSetupFlowScreens["NOT_APPLICABLE"]=0]="NOT_APPLICABLE";PhoneHubPermissionsSetupFlowScreens[PhoneHubPermissionsSetupFlowScreens["INTRO"]=1]="INTRO";PhoneHubPermissionsSetupFlowScreens[PhoneHubPermissionsSetupFlowScreens["FINISH_SET_UP_ON_PHONE"]=2]="FINISH_SET_UP_ON_PHONE";PhoneHubPermissionsSetupFlowScreens[PhoneHubPermissionsSetupFlowScreens["CONNECTING"]=3]="CONNECTING";PhoneHubPermissionsSetupFlowScreens[PhoneHubPermissionsSetupFlowScreens["CONNECTION_ERROR"]=4]="CONNECTION_ERROR";PhoneHubPermissionsSetupFlowScreens[PhoneHubPermissionsSetupFlowScreens["CONNECTION_TIME_OUT"]=5]="CONNECTION_TIME_OUT";PhoneHubPermissionsSetupFlowScreens[PhoneHubPermissionsSetupFlowScreens["CONNECTED"]=6]="CONNECTED";PhoneHubPermissionsSetupFlowScreens[PhoneHubPermissionsSetupFlowScreens["SET_A_PIN_OR_PASSWORD"]=7]="SET_A_PIN_OR_PASSWORD"})(PhoneHubPermissionsSetupFlowScreens||(PhoneHubPermissionsSetupFlowScreens={}));var PhoneHubPermissionsSetupAction;(function(PhoneHubPermissionsSetupAction){PhoneHubPermissionsSetupAction[PhoneHubPermissionsSetupAction["UNKNOWN"]=0]="UNKNOWN";PhoneHubPermissionsSetupAction[PhoneHubPermissionsSetupAction["SHOWN"]=1]="SHOWN";PhoneHubPermissionsSetupAction[PhoneHubPermissionsSetupAction["LEARN_MORE"]=2]="LEARN_MORE";PhoneHubPermissionsSetupAction[PhoneHubPermissionsSetupAction["CANCEL"]=3]="CANCEL";PhoneHubPermissionsSetupAction[PhoneHubPermissionsSetupAction["DONE"]=4]="DONE";PhoneHubPermissionsSetupAction[PhoneHubPermissionsSetupAction["NEXT_OR_TRY_AGAIN"]=5]="NEXT_OR_TRY_AGAIN"})(PhoneHubPermissionsSetupAction||(PhoneHubPermissionsSetupAction={}));var PhoneHubPermissionsSetupFeatureCombination;(function(PhoneHubPermissionsSetupFeatureCombination){PhoneHubPermissionsSetupFeatureCombination[PhoneHubPermissionsSetupFeatureCombination["NONE"]=0]="NONE";PhoneHubPermissionsSetupFeatureCombination[PhoneHubPermissionsSetupFeatureCombination["NOTIFICATION"]=1]="NOTIFICATION";PhoneHubPermissionsSetupFeatureCombination[PhoneHubPermissionsSetupFeatureCombination["MESSAGING_APP"]=2]="MESSAGING_APP";PhoneHubPermissionsSetupFeatureCombination[PhoneHubPermissionsSetupFeatureCombination["CAMERA_ROLL"]=3]="CAMERA_ROLL";PhoneHubPermissionsSetupFeatureCombination[PhoneHubPermissionsSetupFeatureCombination["NOTIFICATION_AND_MESSAGING_APP"]=4]="NOTIFICATION_AND_MESSAGING_APP";PhoneHubPermissionsSetupFeatureCombination[PhoneHubPermissionsSetupFeatureCombination["NOTIFICATION_AND_CAMERA_ROLL"]=5]="NOTIFICATION_AND_CAMERA_ROLL";PhoneHubPermissionsSetupFeatureCombination[PhoneHubPermissionsSetupFeatureCombination["MESSAGING_APP_AND_CAMERA_ROLL"]=6]="MESSAGING_APP_AND_CAMERA_ROLL";PhoneHubPermissionsSetupFeatureCombination[PhoneHubPermissionsSetupFeatureCombination["ALL_PERMISSONS"]=7]="ALL_PERMISSONS"})(PhoneHubPermissionsSetupFeatureCombination||(PhoneHubPermissionsSetupFeatureCombination={}));function getTemplate$f(){return html`<!--_html_template_start_--><style

  include="cros-color-overrides"

>
  :host {
    display: inline-flex;
  }

  cr-policy-pref-indicator {
    align-self: center;
    margin-inline-start: var(--cr-controlled-by-spacing);
  }

  #labels[disabled] {
    color: var(--paper-grey-400);
  }

  @media (prefers-color-scheme: dark) {
    #labels[disabled] {
      color: var(--google-grey-500);
    }
  }

  
  :host-context(body.jelly-enabled) #labels[disabled] {
    color: var(--cros-sys-disabled);
  }
  

  div.outer {
    align-items: stretch;
    display: flex;
    flex-direction: column;
    margin: 8px 0;
    min-width: 200px;
  }

  #labels {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: -4px 16px 0 16px;
  }

  #labels > div {
    font-size: 12px;
  }

  #label-begin {
    margin-inline-end: 4px;
  }

  #label-end {
    margin-inline-start: 4px;
  }
</style>
<template is="dom-if" if="[[pref.controlledBy]]" restamp>
  <cr-policy-pref-indicator pref="[[pref]]"></cr-policy-pref-indicator>
</template>
<div class="outer">
  <cr-slider id="slider" disabled$="[[disableSlider_]]" ticks="[[ticks]]"
      on-cr-slider-value-changed="onSliderChanged_" max="[[max]]"
      min="[[min]]" on-dragging-changed="onSliderChanged_"
      on-updating-from-key="onSliderChanged_"
      aria-roledescription$="[[getRoleDescription_()]]"
      aria-label$="[[labelAria]]">
  </cr-slider>
  <!-- aria-hidden because role description on #slider contains min/max. -->
  <div id="labels" disabled$="[[disableSlider_]]" aria-hidden="true">
    <div id="label-begin">[[labelMin]]</div>
    <div id="label-end">[[labelMax]]</div>
  </div>
</div>
<!--_html_template_end_-->`}
// Copyright 2016 The Chromium Authors
const SettingsSliderElementBase=CrPolicyPrefMixin(PolymerElement);class SettingsSliderElement extends SettingsSliderElementBase{static get is(){return"settings-slider"}static get template(){return getTemplate$f()}static get properties(){return{pref:Object,ticks:{type:Array,value:()=>[]},scale:{type:Number,value:1},min:Number,max:Number,labelAria:String,labelMin:String,labelMax:String,disabled:Boolean,showMarkers:Boolean,disableSlider_:{computed:"computeDisableSlider_(pref.*, disabled, ticks.*)",type:Boolean},updateValueInstantly:{type:Boolean,value:true,observer:"onSliderChanged_"},loaded_:Boolean}}static get observers(){return["valueChanged_(pref.*, ticks.*, loaded_)"]}connectedCallback(){super.connectedCallback();this.loaded_=true}focus(){this.$.slider.focus()}getTickValue_(tick){return typeof tick==="object"?tick.value:tick}getTickValueAtIndex_(index){return this.getTickValue_(this.ticks[index])}onSliderChanged_(){if(!this.loaded_){return}if(this.$.slider.dragging&&!this.updateValueInstantly){return}const sliderValue=this.$.slider.value;let newValue;if(this.ticks&&this.ticks.length>0){newValue=this.getTickValueAtIndex_(sliderValue)}else{newValue=sliderValue/this.scale}this.set("pref.value",newValue)}computeDisableSlider_(){return this.disabled||this.isPrefEnforced()}valueChanged_(){if(this.pref===undefined||!this.loaded_||this.$.slider.dragging||this.$.slider.updatingFromKey){return}const numTicks=this.ticks.length;if(numTicks===1){this.$.slider.disabled=true;return}const prefValue=this.pref.value;if(numTicks===0){this.$.slider.value=prefValue*this.scale;return}assert$1(this.scale===1);const MAX_TICKS=10;this.$.slider.markerCount=this.showMarkers||numTicks<=MAX_TICKS?numTicks:0;const index=this.ticks.map((tick=>Math.abs(this.getTickValue_(tick)-prefValue))).reduce(((acc,diff,index)=>diff<acc.diff?{index:index,diff:diff}:acc),{index:-1,diff:Number.MAX_VALUE}).index;assert$1(index!==-1);if(this.$.slider.value!==index){this.$.slider.value=index}const tickValue=this.getTickValueAtIndex_(index);if(this.pref.value!==tickValue){this.set("pref.value",tickValue)}}getRoleDescription_(){return loadTimeData.getStringF("settingsSliderRoleDescription",this.labelMin,this.labelMax)}}customElements.define(SettingsSliderElement.is,SettingsSliderElement);
// Copyright 2016 The Chromium Authors
var StorageSpaceState;(function(StorageSpaceState){StorageSpaceState[StorageSpaceState["NORMAL"]=0]="NORMAL";StorageSpaceState[StorageSpaceState["LOW"]=1]="LOW";StorageSpaceState[StorageSpaceState["CRITICALLY_LOW"]=2]="CRITICALLY_LOW"})(StorageSpaceState||(StorageSpaceState={}));let systemDisplayApi=null;function setDisplayApiForTesting(testDisplayApi){systemDisplayApi=testDisplayApi}function getDisplayApi(){if(!systemDisplayApi){systemDisplayApi=chrome.system.display}return systemDisplayApi}var IdleBehavior;(function(IdleBehavior){IdleBehavior[IdleBehavior["DISPLAY_OFF_SLEEP"]=0]="DISPLAY_OFF_SLEEP";IdleBehavior[IdleBehavior["DISPLAY_OFF"]=1]="DISPLAY_OFF";IdleBehavior[IdleBehavior["DISPLAY_ON"]=2]="DISPLAY_ON";IdleBehavior[IdleBehavior["SHUT_DOWN"]=3]="SHUT_DOWN";IdleBehavior[IdleBehavior["STOP_SESSION"]=4]="STOP_SESSION"})(IdleBehavior||(IdleBehavior={}));var LidClosedBehavior;(function(LidClosedBehavior){LidClosedBehavior[LidClosedBehavior["SUSPEND"]=0]="SUSPEND";LidClosedBehavior[LidClosedBehavior["STOP_SESSION"]=1]="STOP_SESSION";LidClosedBehavior[LidClosedBehavior["SHUT_DOWN"]=2]="SHUT_DOWN";LidClosedBehavior[LidClosedBehavior["DO_NOTHING"]=3]="DO_NOTHING"})(LidClosedBehavior||(LidClosedBehavior={}));var NoteAppLockScreenSupport;(function(NoteAppLockScreenSupport){NoteAppLockScreenSupport[NoteAppLockScreenSupport["NOT_SUPPORTED"]=0]="NOT_SUPPORTED";NoteAppLockScreenSupport[NoteAppLockScreenSupport["NOT_ALLOWED_BY_POLICY"]=1]="NOT_ALLOWED_BY_POLICY";NoteAppLockScreenSupport[NoteAppLockScreenSupport["SUPPORTED"]=2]="SUPPORTED";NoteAppLockScreenSupport[NoteAppLockScreenSupport["ENABLED"]=3]="ENABLED"})(NoteAppLockScreenSupport||(NoteAppLockScreenSupport={}));let instance$h=null;class DevicePageBrowserProxyImpl{static getInstance(){return instance$h||(instance$h=new DevicePageBrowserProxyImpl)}static setInstanceForTesting(obj){instance$h=obj}initializePointers(){chrome.send("initializePointerSettings")}initializeStylus(){chrome.send("initializeStylusSettings")}initializeKeyboard(){chrome.send("initializeKeyboardSettings")}showKeyboardShortcutViewer(){chrome.send("showKeyboardShortcutViewer")}initializeKeyboardWatcher(){chrome.send("initializeKeyboardWatcher")}updateAndroidEnabled(){chrome.send("updateAndroidEnabled")}updatePowerStatus(){chrome.send("updatePowerStatus")}setPowerSource(powerSourceId){chrome.send("setPowerSource",[powerSourceId])}requestPowerManagementSettings(){chrome.send("requestPowerManagementSettings")}setIdleBehavior(behavior,whenOnAc){chrome.send("setIdleBehavior",[behavior,whenOnAc])}setAdaptiveCharging(enabled){chrome.send("setAdaptiveCharging",[enabled])}setLidClosedBehavior(behavior){chrome.send("setLidClosedBehavior",[behavior])}setNoteTakingAppsUpdatedCallback(callback){addWebUiListener("onNoteTakingAppsUpdated",callback)}showPlayStore(url){chrome.send("showPlayStoreApps",[url])}requestNoteTakingApps(){chrome.send("requestNoteTakingApps")}setPreferredNoteTakingApp(appId){chrome.send("setPreferredNoteTakingApp",[appId])}setPreferredNoteTakingAppEnabledOnLockScreen(enabled){chrome.send("setPreferredNoteTakingAppEnabledOnLockScreen",[enabled])}updateExternalStorages(){chrome.send("updateExternalStorages")}setExternalStoragesUpdatedCallback(callback){addWebUiListener("onExternalStoragesUpdated",callback)}highlightDisplay(id){chrome.send("highlightDisplay",[id])}dragDisplayDelta(displayId,deltaX,deltaY){chrome.send("dragDisplayDelta",[displayId,deltaX,deltaY])}updateStorageInfo(){chrome.send("updateStorageInfo")}openMyFiles(){chrome.send("openMyFiles")}openBrowsingDataSettings(){chrome.send("openBrowsingDataSettings")}}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$g=null;class ManageA11ySubpageBrowserProxyImpl{static getInstance(){return instance$g||(instance$g=new ManageA11ySubpageBrowserProxyImpl)}static setInstanceForTesting(obj){instance$g=obj}showChromeVoxSettings(){chrome.send("showChromeVoxSettings")}showSelectToSpeakSettings(){chrome.send("showSelectToSpeakSettings")}setStartupSoundEnabled(enabled){chrome.send("setStartupSoundEnabled",[enabled])}recordSelectedShowShelfNavigationButtonValue(enabled){chrome.send("recordSelectedShowShelfNavigationButtonValue",[enabled])}manageA11yPageReady(){chrome.send("manageA11yPageReady")}showChromeVoxTutorial(){chrome.send("showChromeVoxTutorial")}}
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$f=null;class TextToSpeechPageBrowserProxyImpl{static getInstance(){return instance$f||(instance$f=new TextToSpeechPageBrowserProxyImpl)}static setInstanceForTesting(obj){instance$f=obj}pdfOcrSectionReady(){chrome.send("pdfOcrSectionReady")}showChromeVoxSettings(){chrome.send("showChromeVoxSettings")}showSelectToSpeakSettings(){chrome.send("showSelectToSpeakSettings")}showChromeVoxTutorial(){chrome.send("showChromeVoxTutorial")}}
// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$e=null;class ChromeVoxSubpageBrowserProxyImpl{static getInstance(){return instance$e||(instance$e=new ChromeVoxSubpageBrowserProxyImpl)}static setInstanceForTesting(obj){instance$e=obj}getAllTtsVoiceData(){chrome.send("getAllTtsVoiceData")}refreshTtsVoices(){chrome.send("refreshTtsVoices")}addDeviceAddedListener(listener){chrome.bluetooth.onDeviceAdded.addListener(listener)}removeDeviceAddedListener(listener){chrome.bluetooth.onDeviceAdded.removeListener(listener)}addDeviceChangedListener(listener){chrome.bluetooth.onDeviceChanged.addListener(listener)}removeDeviceChangedListener(listener){chrome.bluetooth.onDeviceChanged.removeListener(listener)}addDeviceRemovedListener(listener){chrome.bluetooth.onDeviceRemoved.addListener(listener)}removeDeviceRemovedListener(listener){chrome.bluetooth.onDeviceRemoved.removeListener(listener)}addPairingListener(listener){chrome.bluetoothPrivate.onPairing.addListener(listener)}removePairingListener(listener){chrome.bluetoothPrivate.onPairing.removeListener(listener)}startDiscovery(){chrome.bluetooth.startDiscovery()}stopDiscovery(){chrome.bluetooth.startDiscovery()}updateBluetoothBrailleDisplayAddress(displayAddress){chrome.send("updateBluetoothBrailleDisplayAddress",[displayAddress])}}
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$d=null;class SelectToSpeakSubpageBrowserProxyImpl{static getInstance(){return instance$d||(instance$d=new SelectToSpeakSubpageBrowserProxyImpl)}static setInstanceForTesting(obj){instance$d=obj}getAllTtsVoiceData(){chrome.send("getAllTtsVoiceDataForSts")}getAppLocale(){chrome.send("getAppLocale")}previewTtsVoice(previewText,previewVoice){chrome.send("previewTtsVoiceForSts",[previewText,previewVoice])}refreshTtsVoices(){chrome.send("refreshTtsVoices")}}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$c=null;class SwitchAccessSubpageBrowserProxyImpl{static getInstance(){return instance$c||(instance$c=new SwitchAccessSubpageBrowserProxyImpl)}static setInstanceForTesting(obj){instance$c=obj}refreshAssignmentsFromPrefs(){chrome.send("refreshAssignmentsFromPrefs")}notifySwitchAccessActionAssignmentPaneActive(){chrome.send("notifySwitchAccessActionAssignmentPaneActive")}notifySwitchAccessActionAssignmentPaneInactive(){chrome.send("notifySwitchAccessActionAssignmentPaneInactive")}notifySwitchAccessSetupGuideAttached(){}}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$b=null;class TtsSubpageBrowserProxyImpl{static getInstance(){return instance$b||(instance$b=new TtsSubpageBrowserProxyImpl)}static setInstanceForTesting(obj){instance$b=obj}getAllTtsVoiceData(){chrome.send("getAllTtsVoiceData")}getTtsExtensions(){chrome.send("getTtsExtensions")}previewTtsVoice(previewText,previewVoice){chrome.send("previewTtsVoice",[previewText,previewVoice])}wakeTtsEngine(){chrome.send("wakeTtsEngine")}refreshTtsVoices(){chrome.send("refreshTtsVoices")}}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronMultiSelectableBehaviorImpl={properties:{multi:{type:Boolean,value:false,observer:"multiChanged"},selectedValues:{type:Array,notify:true,value:function(){return[]}},selectedItems:{type:Array,readOnly:true,notify:true,value:function(){return[]}}},observers:["_updateSelected(selectedValues.splices)"],select:function(value){if(this.multi){this._toggleSelected(value)}else{this.selected=value}},multiChanged:function(multi){this._selection.multi=multi;this._updateSelected()},get _shouldUpdateSelection(){return this.selected!=null||this.selectedValues!=null&&this.selectedValues.length},_updateAttrForSelected:function(){if(!this.multi){IronSelectableBehavior._updateAttrForSelected.apply(this)}else if(this.selectedItems&&this.selectedItems.length>0){this.selectedValues=this.selectedItems.map((function(selectedItem){return this._indexToValue(this.indexOf(selectedItem))}),this).filter((function(unfilteredValue){return unfilteredValue!=null}),this)}},_updateSelected:function(){if(this.multi){this._selectMulti(this.selectedValues)}else{this._selectSelected(this.selected)}},_selectMulti:function(values){values=values||[];var selectedItems=(this._valuesToItems(values)||[]).filter((function(item){return item!==null&&item!==undefined}));this._selection.clear(selectedItems);for(var i=0;i<selectedItems.length;i++){this._selection.setItemSelected(selectedItems[i],true)}if(this.fallbackSelection&&!this._selection.get().length){var fallback=this._valueToItem(this.fallbackSelection);if(fallback){this.select(this.fallbackSelection)}}},_selectionChange:function(){var s=this._selection.get();if(this.multi){this._setSelectedItems(s);this._setSelectedItem(s.length?s[0]:null)}else{if(s!==null&&s!==undefined){this._setSelectedItems([s]);this._setSelectedItem(s)}else{this._setSelectedItems([]);this._setSelectedItem(null)}}},_toggleSelected:function(value){var i=this.selectedValues.indexOf(value);var unselected=i<0;if(unselected){this.push("selectedValues",value)}else{this.splice("selectedValues",i,1)}},_valuesToItems:function(values){return values==null?null:values.map((function(value){return this._valueToItem(value)}),this)}};const IronMultiSelectableBehavior=[IronSelectableBehavior,IronMultiSelectableBehaviorImpl];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({is:"iron-selector",behaviors:[IronMultiSelectableBehavior]});
// Copyright 2016 The Chromium Authors
var BrowserChannel;(function(BrowserChannel){BrowserChannel["BETA"]="beta-channel";BrowserChannel["CANARY"]="canary-channel";BrowserChannel["DEV"]="dev-channel";BrowserChannel["STABLE"]="stable-channel";BrowserChannel["LTC"]="ltc-channel";BrowserChannel["LTS"]="lts-channel"})(BrowserChannel||(BrowserChannel={}));var UpdateStatus;(function(UpdateStatus){UpdateStatus["CHECKING"]="checking";UpdateStatus["UPDATING"]="updating";UpdateStatus["NEARLY_UPDATED"]="nearly_updated";UpdateStatus["UPDATED"]="updated";UpdateStatus["FAILED"]="failed";UpdateStatus["FAILED_HTTP"]="failed_http";UpdateStatus["FAILED_DOWNLOAD"]="failed_download";UpdateStatus["DISABLED"]="disabled";UpdateStatus["DISABLED_BY_ADMIN"]="disabled_by_admin";UpdateStatus["NEED_PERMISSION_TO_UPDATE"]="need_permission_to_update";UpdateStatus["DEFERRED"]="deferred"})(UpdateStatus||(UpdateStatus={}));function browserChannelToi16nId(channel,isLts){if(isLts){return"aboutChannelLongTermSupport"}switch(channel){case BrowserChannel.BETA:return"aboutChannelBeta";case BrowserChannel.CANARY:return"aboutChannelCanary";case BrowserChannel.DEV:return"aboutChannelDev";case BrowserChannel.STABLE:return"aboutChannelStable";case BrowserChannel.LTC:return"aboutChannelLongTermSupportCandidate";case BrowserChannel.LTS:return"aboutChannelLongTermSupport"}}function isTargetChannelMoreStable(currentChannel,targetChannel){const channelList=[BrowserChannel.CANARY,BrowserChannel.DEV,BrowserChannel.BETA,BrowserChannel.STABLE,BrowserChannel.LTC,BrowserChannel.LTS];const currentIndex=channelList.indexOf(currentChannel);const targetIndex=channelList.indexOf(targetChannel);return currentIndex<targetIndex}let instance$a=null;class AboutPageBrowserProxyImpl{static getInstance(){return instance$a||(instance$a=new AboutPageBrowserProxyImpl)}static setInstanceForTesting(obj){instance$a=obj}applyDeferredUpdate(){chrome.send("applyDeferredUpdate")}pageReady(){chrome.send("aboutPageReady")}refreshUpdateStatus(){chrome.send("refreshUpdateStatus")}launchReleaseNotes(){chrome.send("launchReleaseNotes")}openFeedbackDialog(){chrome.send("openFeedbackDialog")}openDiagnostics(){chrome.send("openDiagnostics")}openProductLicenseOther(){chrome.send("openProductLicenseOther")}openOsHelpPage(){chrome.send("openOsHelpPage")}openFirmwareUpdatesPage(){chrome.send("openFirmwareUpdatesPage")}getFirmwareUpdateCount(){return sendWithPromise("getFirmwareUpdateCount")}requestUpdate(){chrome.send("requestUpdate")}requestUpdateOverCellular(targetVersion,targetSize){chrome.send("requestUpdateOverCellular",[targetVersion,targetSize])}setChannel(channel,isPowerwashAllowed){chrome.send("setChannel",[channel,isPowerwashAllowed])}getChannelInfo(){return sendWithPromise("getChannelInfo")}canChangeChannel(){return sendWithPromise("canChangeChannel")}getVersionInfo(){return sendWithPromise("getVersionInfo")}getRegulatoryInfo(){return sendWithPromise("getRegulatoryInfo")}getEndOfLifeInfo(){return sendWithPromise("getEndOfLifeInfo")}endOfLifeIncentiveButtonClicked(){chrome.send("openEndOfLifeIncentive")}checkInternetConnection(){return sendWithPromise("checkInternetConnection")}refreshTpmFirmwareUpdateStatus(){chrome.send("refreshTPMFirmwareUpdateStatus")}isManagedAutoUpdateEnabled(){return sendWithPromise("isManagedAutoUpdateEnabled")}isConsumerAutoUpdateEnabled(){return sendWithPromise("isConsumerAutoUpdateEnabled")}setConsumerAutoUpdate(enable){chrome.send("setConsumerAutoUpdate",[enable])}}
// Copyright 2020 The Chromium Authors
let instance$9=null;class DeviceNameBrowserProxyImpl{static getInstance(){return instance$9||(instance$9=new DeviceNameBrowserProxyImpl)}static setInstanceForTesting(obj){instance$9=obj}notifyReadyForDeviceName(){return sendWithPromise("notifyReadyForDeviceName")}attemptSetDeviceName(name){return sendWithPromise("attemptSetDeviceName",name)}}
// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var DeviceNameState;(function(DeviceNameState){DeviceNameState[DeviceNameState["CAN_BE_MODIFIED"]=0]="CAN_BE_MODIFIED";DeviceNameState[DeviceNameState["CANNOT_BE_MODIFIED_BECAUSE_OF_POLICIES"]=1]="CANNOT_BE_MODIFIED_BECAUSE_OF_POLICIES";DeviceNameState[DeviceNameState["CANNOT_BE_MODIFIED_BECAUSE_NOT_DEVICE_OWNER"]=2]="CANNOT_BE_MODIFIED_BECAUSE_NOT_DEVICE_OWNER"})(DeviceNameState||(DeviceNameState={}));var SetDeviceNameResult;(function(SetDeviceNameResult){SetDeviceNameResult[SetDeviceNameResult["UPDATE_SUCCESSFUL"]=0]="UPDATE_SUCCESSFUL";SetDeviceNameResult[SetDeviceNameResult["ERROR_DUE_TO_POLICY"]=1]="ERROR_DUE_TO_POLICY";SetDeviceNameResult[SetDeviceNameResult["ERROR_DUE_TO_NOT_DEVICE_OWNER"]=2]="ERROR_DUE_TO_NOT_DEVICE_OWNER";SetDeviceNameResult[SetDeviceNameResult["ERROR_DUE_TO_INVALID_INPUT"]=3]="ERROR_DUE_TO_INVALID_INPUT"})(SetDeviceNameResult||(SetDeviceNameResult={}));function getTemplate$e(){return html`<!--_html_template_start_--><style include="settings-shared shared-style md-select">
  :host {
      --cr-dialog-width: 320px;
      --md-select-width: 280px;
  }

  #dialogBody {
    display: flex;
    flex-direction: column;
    height: 95px;
    overflow: auto;
  }

  .md-select {
      margin-top: 20px;
  }
</style>
<cr-dialog id="dialog" show-on-attach>
  <div id="title" slot="title">Preferred search engine</div>
  <div id="dialogBody" slot="body">
    <div id="description">Set your default search engine for Chrome browser and Chromebook Launcher</div>
    <select class="md-select"
        aria-labelledby="title"
        aria-describedby="description"
        autofocus>
      <template is="dom-repeat" items="[[searchEngines_]]">
        <option selected="[[item.default]]">[[item.name]]</option>
      </template>
    </select>
  </div>
  <div slot="button-container">
    <cr-button class="cancel-button" on-click="onCancelButtonClick_">
      Cancel
    </cr-button>
    <cr-button class="action-button" on-click="onActionButtonClick_"
        disabled="[[disableActionButton_]]">
      Done
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}
// Copyright 2016 The Chromium Authors
let instance$8=null;class SearchEnginesBrowserProxyImpl{static getInstance(){return instance$8||(instance$8=new SearchEnginesBrowserProxyImpl)}static setInstanceForTesting(obj){instance$8=obj}setDefaultSearchEngine(modelIndex){chrome.send("setDefaultSearchEngine",[modelIndex])}getSearchEnginesList(){return sendWithPromise("getSearchEnginesList")}openBrowserSearchSettings(){chrome.send("openBrowserSearchSettings")}}
// Copyright 2020 The Chromium Authors
const OsSettingsSearchSelectionDialogElementBase=WebUiListenerMixin(PolymerElement);class OsSettingsSearchSelectionDialogElement extends OsSettingsSearchSelectionDialogElementBase{static get is(){return"os-settings-search-selection-dialog"}static get template(){return getTemplate$e()}static get properties(){return{searchEngines_:{type:Array,value(){return[]}}}}constructor(){super();this.browserProxy_=SearchEnginesBrowserProxyImpl.getInstance()}ready(){super.ready();this.browserProxy_.getSearchEnginesList().then(this.updateSearchEngines_.bind(this));this.addWebUiListener("search-engines-changed",this.updateSearchEngines_.bind(this))}updateSearchEngines_(searchEngines){this.set("searchEngines_",searchEngines.defaults)}onActionButtonClick_(){const select=castExists(this.shadowRoot.querySelector("select"));const searchEngine=this.searchEngines_[select.selectedIndex];this.browserProxy_.setDefaultSearchEngine(searchEngine.modelIndex);this.$.dialog.close()}onCancelButtonClick_(){this.$.dialog.close()}onKeydown_(e){if(e.key==="Escape"){this.onCancelButtonClick_()}}}customElements.define(OsSettingsSearchSelectionDialogElement.is,OsSettingsSearchSelectionDialogElement);function getTemplate$d(){return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared md-select">
  #search-wrapper {
    align-items: center;
    display: flex;
  }

  cr-policy-pref-indicator {
    padding-inline-end: 8px;
  }
</style>

<cr-link-row id="browserSearchSettingsLink"
    label="Preferred search engine"
    sub-label="[[currentSearchEngine_.name]]"
    on-click="onSearchEngineLinkClick_"
    external>
</cr-link-row>
<!--_html_template_end_-->`}
// Copyright 2021 The Chromium Authors
const SettingsSearchEngineElementBase=i16nMixin(WebUiListenerMixin(PolymerElement));class SettingsSearchEngineElement extends SettingsSearchEngineElementBase{static get is(){return"settings-search-engine"}static get template(){return getTemplate$d()}static get properties(){return{prefs:Object,currentSearchEngine_:Object}}constructor(){super();this.browserProxy_=SearchEnginesBrowserProxyImpl.getInstance()}ready(){super.ready();this.browserProxy_.getSearchEnginesList().then(this.updateCurrentSearchEngine_.bind(this));this.addWebUiListener("search-engines-changed",this.updateCurrentSearchEngine_.bind(this))}updateCurrentSearchEngine_(searchEngines){const defaultSearchEngine=castExists(searchEngines.defaults.find((searchEngine=>searchEngine.default)));this.currentSearchEngine_=defaultSearchEngine}focus(){this.getBrowserSearchSettingsLink_().focus()}onDisableExtension_(){const event=new CustomEvent("refresh-pref",{bubbles:true,composed:true,detail:"default_search_provider.enabled"});this.dispatchEvent(event)}onSearchEngineLinkClick_(){this.browserProxy_.openBrowserSearchSettings()}getBrowserSearchSettingsLink_(){return castExists(this.shadowRoot.getElementById("browserSearchSettingsLink"))}getSearchSelectionDialogButton_(){return castExists(this.shadowRoot.getElementById("searchSelectionDialogButton"))}}customElements.define(SettingsSearchEngineElement.is,SettingsSearchEngineElement);
// Copyright 2016 The Chromium Authors
function getSupportedScaleFactors(){const supportedScaleFactors=[];if(!isIOS){supportedScaleFactors.push(1)}if(!isIOS&&!isAndroid){supportedScaleFactors.push(2)}else{supportedScaleFactors.push(window.devicePixelRatio)}return supportedScaleFactors}function getUrlForCss(s){const s2=s.replace(/(\(|\)|\,|\s|\'|\"|\\)/g,"\\$1");return`url("${s2}")`}function getImageSet(path){const supportedScaleFactors=getSupportedScaleFactors();const replaceStartIndex=path.indexOf("SCALEFACTOR");if(replaceStartIndex<0){return getUrlForCss(path)}let s="";for(let i=0;i<supportedScaleFactors.length;++i){const scaleFactor=supportedScaleFactors[i];const pathWithScaleFactor=path.substr(0,replaceStartIndex)+scaleFactor+path.substr(replaceStartIndex+"scalefactor".length);s+=getUrlForCss(pathWithScaleFactor)+" "+scaleFactor+"x";if(i!==supportedScaleFactors.length-1){s+=", "}}return"image-set("+s+")"}function getImage(path){const chromeThemePath="chrome://theme";const isChromeThemeUrl=path.slice(0,chromeThemePath.length)===chromeThemePath;return isChromeThemeUrl?getImageSet(path+"@SCALEFACTORx"):getUrlForCss(path)}
// Copyright 2019 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$7=null;class ParentalControlsBrowserProxyImpl{static getInstance(){return instance$7||(instance$7=new ParentalControlsBrowserProxyImpl)}static setInstanceForTesting(obj){instance$7=obj}showAddSupervisionDialog(){chrome.send("showAddSupervisionDialog")}launchFamilyLinkSettings(){chrome.send("launchFamilyLinkSettings")}}
// Copyright 2018 The Chromium Authors
let instance$6=null;class AccountManagerBrowserProxyImpl{static getInstance(){return instance$6||(instance$6=new AccountManagerBrowserProxyImpl)}static setInstanceForTesting(obj){instance$6=obj}getAccounts(){return sendWithPromise("getAccounts")}addAccount(){chrome.send("addAccount")}reauthenticateAccount(accountEmail){chrome.send("reauthenticateAccount",[accountEmail])}migrateAccount(accountEmail){chrome.send("migrateAccount",[accountEmail])}removeAccount(account){chrome.send("removeAccount",[account])}changeArcAvailability(account,isAvailableInArc){chrome.send("changeArcAvailability",[account,isAvailableInArc])}}function getTemplate$c(){return html`<!--_html_template_start_-->    <style>canvas{height:100%;width:100%}</style>
    <canvas id="canvas" hidden="[[hidden]]"></canvas>
<!--_html_template_end_-->`}
// Copyright 2019 The Chromium Authors
let workerLoaderPolicy=null;function getLottieWorkerURL(){if(workerLoaderPolicy===null){workerLoaderPolicy=window.trustedTypes.createPolicy("lottie-worker-script-loader",{createScriptURL:_ignore=>{const script=`import 'chrome://resources/lottie/lottie_worker.min.js';`;const blob=new Blob([script],{type:"text/javascript"});return URL.createObjectURL(blob)},createHTML:()=>assertNotReached$1(),createScript:()=>assertNotReached$1()})}return workerLoaderPolicy.createScriptURL("")}class CrLottieElement extends PolymerElement{constructor(){super(...arguments);this.canvasElement_=null;this.isAnimationLoaded_=false;this.offscreenCanvas_=null;this.hasTransferredCanvas_=false;this.resizeObserver_=null;this.playState_=false;this.workerNeedsSizeUpdate_=false;this.workerNeedsPlayControlUpdate_=false;this.worker_=null;this.xhr_=null}static get is(){return"cr-lottie"}static get template(){return getTemplate$c()}static get properties(){return{animationUrl:{type:String,value:"",observer:"animationUrlChanged_"},autoplay:{type:Boolean,value:false},hidden:{type:Boolean,value:false},singleLoop:{type:Boolean,value:false}}}connectedCallback(){super.connectedCallback();this.worker_=new Worker(getLottieWorkerURL(),{type:"module"});this.worker_.onmessage=this.onMessage_.bind(this);this.initialize_()}disconnectedCallback(){super.disconnectedCallback();if(this.resizeObserver_){this.resizeObserver_.disconnect()}if(this.worker_){this.worker_.terminate();this.worker_=null}if(this.xhr_){this.xhr_.abort();this.xhr_=null}}setPlay(shouldPlay){this.playState_=shouldPlay;if(this.isAnimationLoaded_){this.sendPlayControlInformationToWorker_()}else{this.workerNeedsPlayControlUpdate_=true}}sendPlayControlInformationToWorker_(){assert$1(this.worker_);this.worker_.postMessage({control:{play:this.playState_}})}initialize_(){this.canvasElement_=this.$.canvas;this.offscreenCanvas_=this.canvasElement_.transferControlToOffscreen();this.resizeObserver_=new ResizeObserver(this.onCanvasElementResized_.bind(this));this.resizeObserver_.observe(this.canvasElement_);if(this.isAnimationLoaded_){return}this.sendXmlHttpRequest_(this.animationUrl,"json",this.initAnimation_.bind(this))}animationUrlChanged_(){if(!this.worker_){return}if(this.xhr_){this.xhr_.abort();this.xhr_=null}if(this.isAnimationLoaded_){this.worker_.postMessage({control:{stop:true}});this.isAnimationLoaded_=false}this.sendXmlHttpRequest_(this.animationUrl,"json",this.initAnimation_.bind(this))}getCanvasDrawBufferSize_(){const canvasElement=this.$.canvas;const devicePixelRatio=window.devicePixelRatio;const clientRect=canvasElement.getBoundingClientRect();const drawSize={width:clientRect.width*devicePixelRatio,height:clientRect.height*devicePixelRatio};return drawSize}isValidUrl_(maybeValidUrl){const url=new URL(maybeValidUrl,document.location.href);return url.protocol==="chrome:"||url.protocol==="data:"&&url.pathname.startsWith("application/json;")}sendXmlHttpRequest_(url,responseType,successCallback){assert$1(this.isValidUrl_(url),"Invalid scheme or data url used.");assert$1(!this.xhr_);this.xhr_=new XMLHttpRequest;this.xhr_.open("GET",url,true);this.xhr_.responseType=responseType;this.xhr_.send();this.xhr_.onreadystatechange=()=>{assert$1(this.xhr_);if(this.xhr_.readyState===4&&this.xhr_.status===200){const response=this.xhr_.response;this.xhr_=null;successCallback(response)}}}onCanvasElementResized_(){if(this.isAnimationLoaded_){this.sendCanvasSizeToWorker_()}else{this.workerNeedsSizeUpdate_=true}}sendCanvasSizeToWorker_(){assert$1(this.worker_);this.worker_.postMessage({drawSize:this.getCanvasDrawBufferSize_()})}initAnimation_(animationData){const message={animationData:animationData,drawSize:this.getCanvasDrawBufferSize_(),params:{loop:!this.singleLoop,autoplay:this.autoplay}};assert$1(this.worker_);if(!this.hasTransferredCanvas_){message.canvas=this.offscreenCanvas_;this.hasTransferredCanvas_=true;this.worker_.postMessage(message,[this.offscreenCanvas_])}else{this.worker_.postMessage(message)}}fire_(eventName,eventData){this.dispatchEvent(new CustomEvent(eventName,{bubbles:true,composed:true,detail:eventData}))}onMessage_(event){if(event.data.name==="initialized"&&event.data.success){this.isAnimationLoaded_=true;this.sendPendingInfo_();this.fire_("cr-lottie-initialized")}else if(event.data.name==="playing"){this.fire_("cr-lottie-playing")}else if(event.data.name==="paused"){this.fire_("cr-lottie-paused")}else if(event.data.name==="stopped"){this.fire_("cr-lottie-stopped")}else if(event.data.name==="resized"){this.fire_("cr-lottie-resized",event.data.size)}}sendPendingInfo_(){if(this.workerNeedsSizeUpdate_){this.workerNeedsSizeUpdate_=false;this.sendCanvasSizeToWorker_()}if(this.workerNeedsPlayControlUpdate_){this.workerNeedsPlayControlUpdate_=false;this.sendPlayControlInformationToWorker_()}}}customElements.define(CrLottieElement.is,CrLottieElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({is:"iron-media-query",properties:{queryMatches:{type:Boolean,value:false,readOnly:true,notify:true},query:{type:String,observer:"queryChanged"},full:{type:Boolean,value:false},_boundMQHandler:{value:function(){return this.queryHandler.bind(this)}},_mq:{value:null}},attached:function(){this.style.display="none";this.queryChanged()},detached:function(){this._remove()},_add:function(){if(this._mq){this._mq.addListener(this._boundMQHandler)}},_remove:function(){if(this._mq){this._mq.removeListener(this._boundMQHandler)}this._mq=null},queryChanged:function(){this._remove();var query=this.query;if(!query){return}if(!this.full&&query[0]!=="("){query="("+query+")"}this._mq=window.matchMedia(query);this._add();this.queryHandler(this._mq)},queryHandler:function(mq){this._setQueryMatches(mq.matches)}});const template=html`<iron-iconset-svg name="pin-keyboard" size="24">
  <svg>
    <defs>
      <!--
      Inlined from Polymer's iron-icons to avoid importing everything.
      See http://goo.gl/Y1OdAq for instructions on adding additional icons.
      -->
      <g id="arrow-forward">
        <path d="M12 redacted">
        </path>
      </g>
      <g id="backspace">
        <path d="M7 redacted">
        </path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg>
`;document.head.appendChild(template.content);function getTemplate$b(){return html`<!--_html_template_start_--><style include="cr-shared-style">
  /**
    * It's important that buttons are square (have same height and width) so
    * paper-ripple looks nice
    */
  :host {
    --pin-button-horizontal-margin: 12px;
    --pin-button-size: 48px;
    outline: none;
  }

  #root {
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: 0;
    user-select: none;
  }

  #rowsContainer {
    direction: ltr;
    display: flex;
    flex-direction: column;
  }

  .row {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    min-height: 0;
  }

  :host([enable-password]) #pinInputDiv {
    display: none;
  }

  .bottom-row {
    margin-bottom: 0;
  }

  #backspaceButton {
    --cr-icon-button-fill-color: var(--pin-keyboard-backspace-color,
                                      var(--cros-icon-color-primary));
    --cr-icon-button-size: 48px;
    --cr-icon-button-transition: none;
    height: var(--pin-button-size);
    margin: 0 var(--pin-button-horizontal-margin);
    opacity: var(--pin-keyboard-backspace-opacity, --dark-primary-opacity);
    width: var(--pin-button-size);
  }

  #backspaceButton[disabled] {
    opacity: 0.34;
  }

  .digit-button {
    align-items: center;
    border: 0;
    box-shadow: none;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-weight: 400;
    height: var(--pin-button-size);
    margin: 0 var(--pin-button-horizontal-margin);
    min-height: 0;
    min-width: 0;
    opacity: 0.87;
    padding: 0;
    width: var(--pin-button-size);

    --ink-color: var(--cros-ripple-color);
    --paper-ripple-opacity: 1;
  }

  :host-context(.focus-outline-visible) .digit-button:focus {
    font-weight: 500;
  }

  .digit-button inner-text {
    font-family: 'Roboto';
  }

  /* TODO(https://crbug.com/1307255): Figure out how to use variables of the
                                      cr-button component to add hovering
                                      effect */
  cr-button {
    background-color: var(--cros-icon-button-background-color);
    border-radius: 50%;
  }

  cr-button:hover {
    background-color: var(--cros-highlight-color-focus);
  }

  cr-icon-button {
    background-color: var(--cros-icon-button-background-color);
    border-radius: 50%;
  }

  cr-icon-button:hover {
    background-color: var(--cros-highlight-color-focus);
  }

  inner-text.letter {
    color: var(--pin-keyboard-letter-color,
                var(--cros-text-color-secondary));
    font-size: 12px;
  }

  /**
    * This is needed to align button "1" without text similar to the
    * buttons with text
    */
  inner-text.letter.empty {
    visibility: hidden;
  }

  .number {
    color: var(--pin-keyboard-number-color, var(--cros-text-color-primary));
    font-size: 20px;
  }

  #pinInput::part(input) {
    font-size: 18px;
  }

  #pinInput {
    --cr-input-error-display: none;
    --cr-input-letter-spacing: var(--pin-keyboard-input-letter-spacing,
                                    18px);
    --cr-input-padding-end: 0;
    --cr-input-padding-start: 0;
    --cr-search-field-placeholder-color:
        var(--cros-textfield-input-color-disabled);
    background-color: var(--cros-textfield-background-color);
    border: 0;
    box-sizing: border-box;
    color: var(--cros-textfield-input-color);
    font-face: Roboto-Regular;
    font-size: 13px;
    left: 0;
    opacity: var(--dark-secondary-opacity);
    outline: 0;
    position: relative;
    text-align: center;
    width: var(--pin-keyboard-pin-input-width, 200px);
  }

  #pinInput[make-contrast] {
    opacity: var(--dark-primary-opacity);
  }

  #pinInput[is-input-rtl] {
    direction: rtl;
  }

  /* Ensure that all children of cr-button do not consume events. This
    * simplifies the event handler code. */
  cr-button * {
    pointer-events: none;
  }
</style>

<div id="root" on-click="onRootTap_">
  <div id="pinInputDiv">
    <cr-input id="pinInput" type="password" value="{{value}}"
        is-input-rtl$="[[isInputRtl_(value)]]" aria-label="[[ariaLabel]]"
        make-contrast$="[[hasInputOrFocus_(value, focused_)]]"
        invalid="[[hasError]]"
        placeholder="[[getInputPlaceholder_(enablePassword,
            enablePlaceholder)]]" inputmode="none"
        on-keydown="onInputKeyDown_" force-underline="true"
        disabled="[[disabled]]">
    </cr-input>
    <slot select="[problem]"></slot>
  </div>
  <div id="rowsContainer">
    <div class="row">
      <cr-button class="digit-button" on-click="onNumberTap_" value="1"
          id="digitButton1" disabled="[[disabled]]" circle-ripple
          custom-tab-index="-1">
        <inner-text class="number">[[i16n('pinKeyboard1')]]</inner-text>
      </cr-button>
      <cr-button class="digit-button" on-click="onNumberTap_" value="2"
          id="digitButton2" disabled="[[disabled]]" circle-ripple
          custom-tab-index="-1">
        <inner-text class="number">[[i16n('pinKeyboard2')]]</inner-text>
      </cr-button>
      <cr-button class="digit-button" on-click="onNumberTap_" value="3"
          id="digitButton3" disabled="[[disabled]]" circle-ripple
          custom-tab-index="-1">
        <inner-text class="number">[[i16n('pinKeyboard3')]]</inner-text>
      </cr-button>
    </div>
    <div class="row">
      <cr-button class="digit-button" on-click="onNumberTap_" value="4"
          id="digitButton4" disabled="[[disabled]]" circle-ripple
          custom-tab-index="-1">
        <inner-text class="number">[[i16n('pinKeyboard4')]]</inner-text>
      </cr-button>
      <cr-button class="digit-button" on-click="onNumberTap_" value="5"
          id="digitButton5" disabled="[[disabled]]" circle-ripple
          custom-tab-index="-1">
        <inner-text class="number">[[i16n('pinKeyboard5')]]</inner-text>
      </cr-button>
      <cr-button class="digit-button" on-click="onNumberTap_" value="6"
          id="digitButton6" disabled="[[disabled]]" circle-ripple
          custom-tab-index="-1">
        <inner-text class="number">[[i16n('pinKeyboard6')]]</inner-text>
      </cr-button>
    </div>
    <div class="row">
      <cr-button class="digit-button" on-click="onNumberTap_" value="7"
          id="digitButton7" disabled="[[disabled]]" circle-ripple
          custom-tab-index="-1">
        <inner-text class="number">[[i16n('pinKeyboard7')]]</inner-text>
      </cr-button>
      <cr-button class="digit-button" on-click="onNumberTap_" value="8"
          id="digitButton8" disabled="[[disabled]]" circle-ripple
          custom-tab-index="-1">
        <inner-text class="number">[[i16n('pinKeyboard8')]]</inner-text>
      </cr-button>
      <cr-button class="digit-button" on-click="onNumberTap_" value="9"
          id="digitButton9" disabled="[[disabled]]" circle-ripple
          custom-tab-index="-1">
        <inner-text class="number">[[i16n('pinKeyboard9')]]</inner-text>
      </cr-button>
    </div>
    <div class="row bottom-row">
      <cr-icon-button id="backspaceButton"
          disabled$="[[!hasInput_(value)]]"
          iron-icon="pin-keyboard:backspace"
          on-click="onBackspaceTap_"
          on-pointerdown="onBackspacePointerDown_"
          on-pointerout="clearAndReset_"
          on-pointerup="onBackspacePointerUp_"
          on-contextmenu="onBackspaceContextMenu_"
          title="[[i16n('pinKeyboardDeleteAccessibleName')]]"
          custom-tab-index="-1">
      </cr-icon-button>
      <cr-button class="digit-button" on-click="onNumberTap_" value="0"
          id="digitButton0" disabled="[[disabled]]" circle-ripple
          custom-tab-index="-1">
        <inner-text class="number">[[i16n('pinKeyboard0')]]</inner-text>
      </cr-button>
      <div class="digit-button"></div>
    </div>
  </div>
</div>

<!-- TODO(crbug.com/603217): Use i16n instead of string literals. Figure out
                             what i16n to use for keypad, ie, does 1 ABC make
                             sense in every scenario? -->
<!--_html_template_end_-->`}
// Copyright 2016 The Chromium Authors
const REPEAT_BACKSPACE_DELAY_MS=150;const INITIAL_BACKSPACE_DELAY_MS=500;const PIN_INPUT_ALLOWED_NON_NUMBER_KEY_CODES=new Set([redacted]);function receivedEventFromKeyboard(event){if(!event.detail||!event.detail.sourceEvent){return false}return event.detail.sourceEvent.detail===0}Polymer({_template:getTemplate$b(),is:"pin-keyboard",behaviors:[i16nBehavior],properties:{enablePassword:{type:Boolean,value:false},allowNonDigit:{type:Boolean,value:false},hasError:Boolean,disabled:{type:Boolean,value:false},passwordElement:Object,repeatBackspaceIntervalId_:{type:Number,value:0},startAutoBackspaceId_:{type:Number,value:0},value:{type:String,notify:true,value:"",observer:"onPinValueChange_"},focused_:{type:Boolean,value:false},enablePlaceholder:{type:Boolean,value:false},ariaLabel:{type:String}},listeners:{blur:"onBlur_",focus:"onFocus_"},get selectionStart_(){return this.passwordElement_().selectionStart},get selectionEnd_(){return this.passwordElement_().selectionEnd},set selectionStart_(start){this.passwordElement_().selectionStart=start},set selectionEnd_(end){this.passwordElement_().selectionEnd=end},blur(){this.passwordElement_().blur()},focusInput(opt_selectionStart,opt_selectionEnd){setTimeout((()=>this.focusInputSynchronously(opt_selectionStart,opt_selectionEnd)),0)},focusInputSynchronously(opt_selectionStart,opt_selectionEnd){this.passwordElement_().focus();this.selectionStart_=opt_selectionStart||0;this.selectionEnd_=opt_selectionEnd||0},onRootTap_(){this.focusInput(this.selectionStart_,this.selectionEnd_)},onFocus_(){this.focused_=true},onBlur_(){this.focused_=false},onNumberTap_(event){const numberValue=event.target.getAttribute("value");const selectionStart=this.selectionStart_;this.value=this.value.substring(0,this.selectionStart_)+numberValue+this.value.substring(this.selectionEnd_);if(!receivedEventFromKeyboard(event)){this.focusInputSynchronously(selectionStart+1,selectionStart+1)}event.stopImmediatePropagation()},firePinSubmitEvent_(){this.fire("submit",{pin:this.value})},onPinValueChange_(value,previous){if(this.passwordElement){this.passwordElement.value=value}this.fire("pin-change",{pin:value})},onPinClear_(){let selectionStart=this.selectionStart_;const selectionEnd=this.selectionEnd_;if(selectionStart===selectionEnd&&selectionStart){selectionStart--}this.value=this.value.substring(0,selectionStart)+this.value.substring(selectionEnd);this.selectionStart_=selectionStart;this.selectionEnd_=selectionStart},onBackspaceTap_(event){if(!receivedEventFromKeyboard(event)){return}this.onPinClear_();this.clearAndReset_();event.stopImmediatePropagation()},onBackspacePointerDown_(event){this.startAutoBackspaceId_=setTimeout(function(){this.repeatBackspaceIntervalId_=setInterval(this.onPinClear_.bind(this),REPEAT_BACKSPACE_DELAY_MS)}.bind(this),INITIAL_BACKSPACE_DELAY_MS);if(!receivedEventFromKeyboard(event)){this.focusInput(this.selectionStart_,this.selectionEnd_)}event.stopImmediatePropagation()},clearAndReset_(){clearInterval(this.repeatBackspaceIntervalId_);this.repeatBackspaceIntervalId_=0;clearTimeout(this.startAutoBackspaceId_);this.startAutoBackspaceId_=0},onBackspacePointerUp_(event){if(!this.repeatBackspaceIntervalId_){this.onPinClear_()}this.clearAndReset_();this.blur();if(!receivedEventFromKeyboard(event)){this.focusInput(this.selectionStart_,this.selectionEnd_)}event.stopImmediatePropagation()},isValidEventForInput_(event){if(this.allowNonDigit){return true}if(event.keyCode>=48&&event.keyCode<=57&&!event.shiftKey){return true}if(PIN_INPUT_ALLOWED_NON_NUMBER_KEY_CODES.has(event.keyCode)){return true}if(event.keyCode===65&&event.ctrlKey){return true}if(event.ctrlKey&&[48,187,189].includes(event.keyCode)){return true}if(event.keyCode===168&&event.ctrlKey&&event.shiftKey){return true}if(event.ctrlKey&&event.altKey&&event.key==="z"){return true}return false},onInputKeyDown_(event){if(event.keyCode===38||event.keyCode===40){event.preventDefault();return}if(event.keyCode===13){this.firePinSubmitEvent_();event.preventDefault();return}if(!this.isValidEventForInput_(event)){event.preventDefault();return}},hasInput_(value){return value.length>0},hasInputOrFocus_(value,focused){return this.hasInput_(value)||focused},getInputPlaceholder_(enablePassword,enablePlaceholder){if(!enablePlaceholder){return""}return enablePassword?this.i16n("pinKeyboardPlaceholderPinPassword"):this.i16n("pinKeyboardPlaceholderPin")},isInputRtl_(password){return document.dir==="rtl"&&!Number.isInteger(+password)},onBackspaceContextMenu_(e){if(e.which){return}e.preventDefault();e.stopPropagation()},passwordElement_(){return this.passwordElement||this.$.pinInput.inputElement}});
// Copyright 2016 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const PinUnlockUmaHistogramName="Settings.PinUnlockSetup";const LockScreenProgress={START_SCREEN_LOCK:0,ENTER_PASSWORD_CORRECTLY:1,CHOOSE_PIN_OR_PASSWORD:2,ENTER_PIN:3,CONFIRM_PIN:4,MAX_BUCKET:5};const recordLockScreenProgress=function(currentProgress){if(currentProgress>=LockScreenProgress.MAX_BUCKET){console.error("Expected a enumeration value of "+LockScreenProgress.MAX_BUCKET+" or lower: Received "+currentProgress+".");return}chrome.send("metricsHandler:recordInHistogram",[PinUnlockUmaHistogramName,currentProgress,LockScreenProgress.MAX_BUCKET])};function getTemplate$a(){return html`<!--_html_template_start_--><!--

This module is a "pin setup" keyboard + pin display element.
It can be integrated into some UI container to set pin unlock.

Usage:
          <setup-pin-keyboard
              enable-submit="{{enableSubmit_}}"
              is-confirm-step="{{isConfirmStep_}}"
              on-pin-submit="onPinSubmit_"
              on-set-pin-done="onSetPinDone_"
              set-modes="{{setModes}}">
          </setup-pin-keyboard>

Where:
  * enable-submit - Notification property for the container to enable/disable
        submit button in the container (if it exists). True when pin can be
        submitted.
  * is-confirm-step - Notification property for the container to update UI
        when pin confirmation is requested. False when initial PIN entry step
        is active, true when pin confirmation is active.
  * on-pin-submit - Event handler for the user requested pin submit by pressing
        "Enter" key on the keyboard. setup-pin-keyboard will
        not submit pin automatically, delegating this step to outer container.
        Container must call setup-pin-keyboard.doSubmit() when
        pin should be submitted.
  * on-set-pin-done - Event handler for the "set pin done" event, which should
        normally close the pin setup UI. This object state is reset before
        sending this event.
  * set-modes - Reflects property set in password_prompt_dialog.js.

-->

<style include="settings-shared">
  .error {
    color: var(--cros-text-color-alert);
    display: inline-block;
  }

  .warning {
    color: var(--cr-secondary-text-color);
  }

  #problemDiv {
    align-items: center;
    display: flex;
    flex-direction: row;
    font-size: 10px;
    height: 32px;
    min-height: 0;
    padding-bottom: 8px;
  }

  /* Hide this using visibility: hidden instead of hidden so that the
      dialog does not resize when there are no problems to display. */
  #problemDiv[invisible] {
    visibility: hidden;
  }
</style>
<pin-keyboard id="pinKeyboard" on-pin-change="onPinChange_"
    on-submit="onPinSubmit_" value="{{pinKeyboardValue_}}"
    has-error="[[hasError_(problemMessageId_, problemClass_)]]"
    disabled="[[isSetModesCallPending_]]"
    enable-placeholder="[[enablePlaceholder]]">
  <!-- Warning/error; only shown if title is hidden. -->
  <div id="problemDiv" class$="[[problemClass_]]"
      invisible$="[[!problemMessageId_]]" problem>
    <span aria-live="assertive">
      [[formatProblemMessage_(locale, problemMessageId_,
            problemMessageParameters_)]]
    </span>
  </div>
</pin-keyboard>
<!--_html_template_end_-->`}
// Copyright 2018 The Chromium Authors
const MessageType={TOO_SHORT:"configurePinTooShort",TOO_LONG:"configurePinTooLong",TOO_WEAK:"configurePinWeakPin",MISMATCH:"configurePinMismatched",INTERNAL_ERROR:"internalError"};const ProblemType={WARNING:"warning",ERROR:"error"};Polymer({_template:getTemplate$a(),is:"setup-pin-keyboard",behaviors:[i16nBehavior],properties:{setModes:{type:Object,notify:true},pinKeyboardValue_:String,initialPin_:String,problemMessageId_:{type:String,value:""},problemMessageParameters_:{type:String,value:""},problemClass_:String,enableSubmit:{notify:true,type:Boolean,value:false},writeUma:{type:Object,value(){return function(){}}},isConfirmStep:{notify:true,type:Boolean,value:false},quickUnlockPrivate:Object,pinHasPassedMinimumLength_:{type:Boolean,value:false},enablePlaceholder:{type:Boolean,value:false},isSetModesCallPending_:{notify:true,type:Boolean,value:false}},focus(){this.$.pinKeyboard.focusInput()},attached(){this.resetState();this.problemClass_=ProblemType.WARNING;this.quickUnlockPrivate.getCredentialRequirements(chrome.quickUnlockPrivate.QuickUnlockMode.PIN,this.processPinRequirements_.bind(this,MessageType.TOO_SHORT))},resetState(){this.initialPin_="";this.pinKeyboardValue_="";this.enableSubmit=false;this.isConfirmStep=false;this.pinHasPassedMinimumLength_=false;this.hideProblem_();this.onPinChange_(new CustomEvent("pin-change",{detail:{pin:this.pinKeyboardValue_}}))},canSubmit_(){return this.initialPin_===this.pinKeyboardValue_},processPinRequirements_(messageId,requirements){let additionalInformation="";switch(messageId){case MessageType.TOO_SHORT:additionalInformation=requirements.minLength.toString();break;case MessageType.TOO_LONG:additionalInformation=(requirements.maxLength+1).toString();break;case MessageType.TOO_WEAK:case MessageType.MISMATCH:case MessageType.INTERNAL_ERROR:break;default:assertNotReached();break}this.problemMessageId_=messageId;this.problemMessageParameters_=additionalInformation},showProblem_(messageId,problemClass){this.quickUnlockPrivate.getCredentialRequirements(chrome.quickUnlockPrivate.QuickUnlockMode.PIN,this.processPinRequirements_.bind(this,messageId));this.problemClass_=problemClass;this.enableSubmit=problemClass!==ProblemType.ERROR&&messageId!==MessageType.TOO_SHORT},hideProblem_(){this.problemMessageId_="";this.problemClass_=""},processPinProblems_(message){if(!message.errors.length&&!message.warnings.length){this.hideProblem_();this.enableSubmit=true;this.pinHasPassedMinimumLength_=true;return}if(!message.errors.length||message.errors[0]!==chrome.quickUnlockPrivate.CredentialProblem.TOO_SHORT){this.pinHasPassedMinimumLength_=true}if(message.warnings.length){assert(message.warnings[0]===chrome.quickUnlockPrivate.CredentialProblem.TOO_WEAK);this.showProblem_(MessageType.TOO_WEAK,ProblemType.WARNING)}if(message.errors.length){switch(message.errors[0]){case chrome.quickUnlockPrivate.CredentialProblem.TOO_SHORT:this.showProblem_(MessageType.TOO_SHORT,this.pinHasPassedMinimumLength_?ProblemType.ERROR:ProblemType.WARNING);break;case chrome.quickUnlockPrivate.CredentialProblem.TOO_LONG:this.showProblem_(MessageType.TOO_LONG,ProblemType.ERROR);break;case chrome.quickUnlockPrivate.CredentialProblem.TOO_WEAK:this.showProblem_(MessageType.TOO_WEAK,ProblemType.ERROR);break;default:assertNotReached();break}}},onPinChange_(e){const newPin=e.detail.pin;if(!this.isConfirmStep){if(newPin){this.quickUnlockPrivate.checkCredential(chrome.quickUnlockPrivate.QuickUnlockMode.PIN,newPin,this.processPinProblems_.bind(this))}else{this.enableSubmit=false}return}this.hideProblem_();this.enableSubmit=newPin.length>0},onPinSubmit_(){this.fire("pin-submit")},onSetModesCompleted_(didSet){this.isSetModesCallPending_=false;if(!didSet){console.error("Failed to update pin");this.showProblem_(MessageType.INTERNAL_ERROR,ProblemType.ERROR);this.enableSubmit=true;return}this.resetState();this.fire("set-pin-done")},doSubmit(){if(!this.isConfirmStep){if(!this.enableSubmit){return}this.initialPin_=this.pinKeyboardValue_;this.pinKeyboardValue_="";this.isConfirmStep=true;this.onPinChange_(new CustomEvent("pin-change",{detail:{pin:this.pinKeyboardValue_}}));this.$.pinKeyboard.focusInput();this.writeUma(LockScreenProgress.ENTER_PIN);return}if(!this.canSubmit_()){this.showProblem_(MessageType.MISMATCH,ProblemType.ERROR);this.enableSubmit=false;this.$.pinKeyboard.focusInput(0,this.pinKeyboardValue_.length+1);return}assert(this.setModes);this.isSetModesCallPending_=true;this.enableSubmit=false;this.setModes.call(null,[chrome.quickUnlockPrivate.QuickUnlockMode.PIN],[this.pinKeyboardValue_],this.onSetModesCompleted_.bind(this));this.writeUma(LockScreenProgress.CONFIRM_PIN)},hasError_(problemMessageId,problemClass){return!!problemMessageId&&problemClass===ProblemType.ERROR},formatProblemMessage_(locale,messageId,messageParameters){return messageId?this.i16nDynamic(locale,messageId,messageParameters):""}});function getTemplate$9(){return html`<!--_html_template_start_--><style include="settings-shared">
  #pinKeyboardDiv {
    justify-content: center;
  };

  #pinKeyboard {
    --cr-input-placeholder-letter-spacing: normal;
  }
</style>
<cr-dialog id="dialog" on-close="close"
    close-text="Close">
  <div slot="title">[[getTitleMessage_(isConfirmStep_)]]</div>
  <div slot="body">
    <!-- PIN keyboard -->
    <div id="pinKeyboardDiv" class="settings-box continuation">
      <setup-pin-keyboard id="pinKeyboard"
          enable-submit="{{enableSubmit_}}"
          is-confirm-step="{{isConfirmStep_}}"
          on-pin-submit="onPinSubmit_"
          on-set-pin-done="onSetPinDone_"
          set-modes="{{setModes}}"
          quick-unlock-private="[[quickUnlockPrivate]]"
          write-uma="[[writeUma_]]"
          enable-placeholder>
      </setup-pin-keyboard>
    </div>
  </div>
  <div slot="button-container">
    <cr-button class="cancel-button" on-click="onCancelClick_">
      Cancel
    </cr-button>
    <cr-button class="action-button" on-click="onPinSubmit_"
        disabled$="[[!enableSubmit_]]">
      <span>[[getContinueMessage_(isConfirmStep_)]]</span>
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}
// Copyright 2016 The Chromium Authors
const SettingsSetupPinDialogElementBase=i16nMixin(PolymerElement);class SettingsSetupPinDialogElement extends SettingsSetupPinDialogElementBase{static get is(){return"settings-setup-pin-dialog"}static get template(){return getTemplate$9()}static get properties(){return{setModes:{type:Object,notify:true},enableSubmit_:Boolean,isConfirmStep_:{type:Boolean,value:false},quickUnlockPrivate:{type:Object,value:chrome.quickUnlockPrivate},writeUma_:{type:Object,value(){return()=>{}}}}}connectedCallback(){super.connectedCallback();this.$.dialog.showModal();this.$.pinKeyboard.focus()}close(){if(this.$.dialog.open){this.$.dialog.close()}this.$.pinKeyboard.resetState()}onCancelClick_(){this.$.pinKeyboard.resetState();this.$.dialog.close()}onPinSubmit_(){this.$.pinKeyboard.doSubmit()}onSetPinDone_(){if(this.$.dialog.open){this.$.dialog.close()}}getTitleMessage_(isConfirmStep){return this.i16n(isConfirmStep?"configurePinConfirmPinTitle":"configurePinChoosePinTitle")}getContinueMessage_(isConfirmStep){return this.i16n(isConfirmStep?"confirm":"continue")}}customElements.define(SettingsSetupPinDialogElement.is,SettingsSetupPinDialogElement);
// Copyright 2023 The Chromium Authors
var LockScreenUnlockType;(function(LockScreenUnlockType){LockScreenUnlockType["VALUE_PENDING"]="value_pending";LockScreenUnlockType["PASSWORD"]="password";LockScreenUnlockType["PIN_PASSWORD"]="pin+password"})(LockScreenUnlockType||(LockScreenUnlockType={}));let cachedHasPinLogin=undefined;const LockStateMixin=dedupingMixin((superClass=>{const superClassBase=WebUiListenerMixin(i16nMixin(superClass));class LockStateMixinInternal extends superClassBase{constructor(){super(...arguments);this.boundOnActiveModesChanged_=null}static get properties(){return{selectedUnlockType:{type:String,notify:true,value:LockScreenUnlockType.VALUE_PENDING},hasPin:{type:Boolean,notify:true},hasPinLogin:{type:Boolean,notify:true},quickUnlockPrivate:{type:Object,value:chrome.quickUnlockPrivate},authFactorConfig:{type:Object,value:AuthFactorConfig.getRemote()},recoveryFactorEditor:{type:Object,value:RecoveryFactorEditor.getRemote()},pinFactorEditor:{type:Object,value:PinFactorEditor.getRemote()}}}connectedCallback(){super.connectedCallback();this.boundOnActiveModesChanged_=this.updateUnlockType.bind(this,true);assert$1(this.boundOnActiveModesChanged_);this.quickUnlockPrivate.onActiveModesChanged.addListener(this.boundOnActiveModesChanged_);if(cachedHasPinLogin===undefined){this.addWebUiListener("pin-login-available-changed",this.handlePinLoginAvailableChanged_.bind(this));chrome.send("RequestPinLoginState")}else{this.hasPinLogin=cachedHasPinLogin}this.updateUnlockType(false)}disconnectedCallback(){super.disconnectedCallback();assert$1(this.boundOnActiveModesChanged_);this.quickUnlockPrivate.onActiveModesChanged.removeListener(this.boundOnActiveModesChanged_)}updateUnlockType(activeModesChanged){this.quickUnlockPrivate.getActiveModes((modes=>{if(modes.includes(chrome.quickUnlockPrivate.QuickUnlockMode.PIN)){this.hasPin=true;this.selectedUnlockType=LockScreenUnlockType.PIN_PASSWORD}else{if(activeModesChanged&&!this.hasPin&&this.selectedUnlockType===LockScreenUnlockType.PIN_PASSWORD){return}this.hasPin=false;this.selectedUnlockType=LockScreenUnlockType.PASSWORD}}))}setLockScreenEnabled(authToken,enabled,onComplete){this.quickUnlockPrivate.setLockScreenEnabled(authToken,enabled,(()=>{let success=true;if(chrome.runtime.lastError){console.warn("setLockScreenEnabled failed: "+chrome.runtime.lastError.message);success=false}if(onComplete){onComplete(success)}}))}handlePinLoginAvailableChanged_(isAvailable){this.hasPinLogin=isAvailable;cachedHasPinLogin=this.hasPinLogin}}return LockStateMixinInternal}));
// Copyright 2018 The Chromium Authors
const MultiDeviceFeatureMixin=dedupingMixin((superClass=>{const superClassBase=i16nMixin(superClass);class MultiDeviceFeatureMixinInternal extends superClassBase{static get properties(){return{pageContentData:Object,MultiDeviceFeature:{type:Object,value:MultiDeviceFeature}}}isSuiteOn(){return!!this.pageContentData&&this.pageContentData.betterTogetherState===MultiDeviceFeatureState.ENABLED_BY_USER}isSuiteAllowedByPolicy(){return!!this.pageContentData&&this.pageContentData.betterTogetherState!==MultiDeviceFeatureState.PROHIBITED_BY_POLICY}isFeatureAllowedByPolicy(feature){return this.getFeatureState(feature)!==MultiDeviceFeatureState.PROHIBITED_BY_POLICY}isFeatureSupported(feature){return![MultiDeviceFeatureState.NOT_SUPPORTED_BY_CHROMEBOOK,MultiDeviceFeatureState.NOT_SUPPORTED_BY_PHONE].includes(this.getFeatureState(feature))}isPhoneHubOn(){return this.getFeatureState(MultiDeviceFeature.PHONE_HUB)===MultiDeviceFeatureState.ENABLED_BY_USER}isPhoneHubSubFeature(feature){return[MultiDeviceFeature.PHONE_HUB_CAMERA_ROLL,MultiDeviceFeature.PHONE_HUB_NOTIFICATIONS,MultiDeviceFeature.PHONE_HUB_TASK_CONTINUATION,MultiDeviceFeature.ECHE].includes(feature)}isPhoneHubNotificationAccessProhibited(){return this.pageContentData&&this.pageContentData.notificationAccessStatus===PhoneHubFeatureAccessStatus.PROHIBITED}isPhoneHubAppsAccessProhibited(){return this.pageContentData&&this.pageContentData.appsAccessStatus===PhoneHubFeatureAccessStatus.PROHIBITED}isPhoneHubCameraRollSetupRequired(){return this.isFeatureSupported(MultiDeviceFeature.PHONE_HUB_CAMERA_ROLL)&&this.pageContentData.cameraRollAccessStatus===PhoneHubFeatureAccessStatus.AVAILABLE_BUT_NOT_GRANTED&&this.isFeatureAllowedByPolicy(MultiDeviceFeature.PHONE_HUB_CAMERA_ROLL)}isPhoneHubAppsSetupRequired(){return this.isFeatureSupported(MultiDeviceFeature.ECHE)&&this.pageContentData.isPhoneHubPermissionsDialogSupported&&this.pageContentData.appsAccessStatus===PhoneHubFeatureAccessStatus.AVAILABLE_BUT_NOT_GRANTED&&this.isFeatureAllowedByPolicy(MultiDeviceFeature.ECHE)}isPhoneHubNotificationsSetupRequired(){return this.pageContentData.notificationAccessStatus===PhoneHubFeatureAccessStatus.AVAILABLE_BUT_NOT_GRANTED&&this.isFeatureAllowedByPolicy(MultiDeviceFeature.PHONE_HUB_NOTIFICATIONS)}isFeatureStateEditable(feature){if(feature!==MultiDeviceFeature.BETTER_TOGETHER_SUITE&&!this.isSuiteOn()){return false}if(this.isPhoneHubSubFeature(feature)&&!this.isPhoneHubOn()){return false}if(feature===MultiDeviceFeature.PHONE_HUB_NOTIFICATIONS&&this.isPhoneHubNotificationAccessProhibited()){return false}if(feature===MultiDeviceFeature.ECHE&&this.isPhoneHubAppsAccessProhibited()){return false}return[MultiDeviceFeatureState.DISABLED_BY_USER,MultiDeviceFeatureState.ENABLED_BY_USER].includes(this.getFeatureState(feature))}getFeatureName(feature){switch(feature){case MultiDeviceFeature.BETTER_TOGETHER_SUITE:return this.i16n("multideviceSetupItemHeading");case MultiDeviceFeature.INSTANT_TETHERING:return this.i16n("multideviceInstantTetheringItemTitle");case MultiDeviceFeature.MESSAGES:return this.i16n("multideviceAndroidMessagesItemTitle");case MultiDeviceFeature.SMART_LOCK:return this.i16n("multideviceSmartLockItemTitle");case MultiDeviceFeature.PHONE_HUB:return this.i16n("multidevicePhoneHubItemTitle");case MultiDeviceFeature.PHONE_HUB_CAMERA_ROLL:return this.i16n("multidevicePhoneHubCameraRollItemTitle");case MultiDeviceFeature.PHONE_HUB_NOTIFICATIONS:return this.i16n("multidevicePhoneHubNotificationsItemTitle");case MultiDeviceFeature.PHONE_HUB_TASK_CONTINUATION:return this.i16n("multidevicePhoneHubTaskContinuationItemTitle");case MultiDeviceFeature.WIFI_SYNC:return this.i16n("multideviceWifiSyncItemTitle");case MultiDeviceFeature.ECHE:return this.i16n("multidevicePhoneHubAppsItemTitle");default:return""}}getIconName(feature){switch(feature){case MultiDeviceFeature.BETTER_TOGETHER_SUITE:return"os-settings:multidevice-better-together-suite";case MultiDeviceFeature.MESSAGES:return"os-settings:multidevice-messages";case MultiDeviceFeature.SMART_LOCK:return"os-settings:multidevice-smart-lock";case MultiDeviceFeature.PHONE_HUB:case MultiDeviceFeature.PHONE_HUB_CAMERA_ROLL:case MultiDeviceFeature.PHONE_HUB_NOTIFICATIONS:case MultiDeviceFeature.PHONE_HUB_TASK_CONTINUATION:case MultiDeviceFeature.ECHE:return"os-settings:multidevice-better-together-suite";case MultiDeviceFeature.WIFI_SYNC:return"os-settings:multidevice-wifi-sync";default:return""}}getFeatureSummaryHtml(feature){switch(feature){case MultiDeviceFeature.SMART_LOCK:return this.i16nAdvanced("multideviceSmartLockItemSummary");case MultiDeviceFeature.INSTANT_TETHERING:return this.i16nAdvanced("multideviceInstantTetheringItemSummary");case MultiDeviceFeature.MESSAGES:return this.i16nAdvanced("multideviceAndroidMessagesItemSummary");case MultiDeviceFeature.PHONE_HUB:return this.i16nAdvanced("multidevicePhoneHubItemSummary");case MultiDeviceFeature.PHONE_HUB_CAMERA_ROLL:return this.i16nAdvanced("multidevicePhoneHubCameraRollItemSummary");case MultiDeviceFeature.PHONE_HUB_NOTIFICATIONS:return this.i16nAdvanced("multidevicePhoneHubNotificationsItemSummary");case MultiDeviceFeature.PHONE_HUB_TASK_CONTINUATION:return this.i16nAdvanced("multidevicePhoneHubTaskContinuationItemSummary");case MultiDeviceFeature.WIFI_SYNC:return this.i16nAdvanced("multideviceWifiSyncItemSummary");case MultiDeviceFeature.ECHE:return this.i16nAdvanced("multidevicePhoneHubAppsItemSummary");default:return""}}getFeatureState(feature){if(!this.pageContentData){return null}switch(feature){case MultiDeviceFeature.BETTER_TOGETHER_SUITE:return this.pageContentData.betterTogetherState;case MultiDeviceFeature.INSTANT_TETHERING:return this.pageContentData.instantTetheringState;case MultiDeviceFeature.MESSAGES:return this.pageContentData.messagesState;case MultiDeviceFeature.SMART_LOCK:return this.pageContentData.smartLockState;case MultiDeviceFeature.PHONE_HUB:return this.pageContentData.phoneHubState;case MultiDeviceFeature.PHONE_HUB_CAMERA_ROLL:return this.pageContentData.phoneHubCameraRollState;case MultiDeviceFeature.PHONE_HUB_NOTIFICATIONS:return this.pageContentData.phoneHubNotificationsState;case MultiDeviceFeature.PHONE_HUB_TASK_CONTINUATION:return this.pageContentData.phoneHubTaskContinuationState;case MultiDeviceFeature.WIFI_SYNC:return this.pageContentData.wifiSyncState;case MultiDeviceFeature.ECHE:return this.pageContentData.phoneHubAppsState;default:return null}}isHostSet(){return[MultiDeviceSettingsMode.HOST_SET_WAITING_FOR_SERVER,MultiDeviceSettingsMode.HOST_SET_WAITING_FOR_VERIFICATION,MultiDeviceSettingsMode.HOST_SET_VERIFIED].includes(this.pageContentData.mode)}}return MultiDeviceFeatureMixinInternal}));function getTemplate$8(){return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared"></style>
<cr-toggle id="toggle"
    aria-label$="[[getToggleA11yLabel_(feature)]]"
    checked="{{checked_}}"
    disabled="[[!isFeatureStateEditable(feature, pageContentData)]]"
    on-change="toggleFeature">
</cr-toggle>
<!--_html_template_end_-->`}
// Copyright 2018 The Chromium Authors
const SettingsMultideviceFeatureToggleElementBase=MultiDeviceFeatureMixin(PolymerElement);class SettingsMultideviceFeatureToggleElement extends SettingsMultideviceFeatureToggleElementBase{static get is(){return"settings-multidevice-feature-toggle"}static get template(){return getTemplate$8()}static get properties(){return{feature:Number,toggleAriaLabel:String,checked_:Boolean}}static get observers(){return["resetChecked_(feature, pageContentData)"]}ready(){super.ready();this.addEventListener("click",this.onDisabledInnerToggleClick_)}focus(){this.$.toggle.focus()}toggleFeature(){this.resetChecked_();const featureToggleClickedEvent=new CustomEvent("feature-toggle-clicked",{bubbles:true,composed:true,detail:{feature:this.feature,enabled:!this.checked_}});this.dispatchEvent(featureToggleClickedEvent)}resetChecked_(){if(this.feature===MultiDeviceFeature.PHONE_HUB_NOTIFICATIONS&&this.isPhoneHubNotificationAccessProhibited()){this.checked_=false;return}if(this.feature===MultiDeviceFeature.ECHE&&this.isPhoneHubAppsAccessProhibited()){this.checked_=false;return}this.checked_=this.getFeatureState(this.feature)===MultiDeviceFeatureState.ENABLED_BY_USER}onDisabledInnerToggleClick_(event){event.stopPropagation()}getToggleA11yLabel_(){return this.toggleAriaLabel||this.getFeatureName(this.feature)}}customElements.define(SettingsMultideviceFeatureToggleElement.is,SettingsMultideviceFeatureToggleElement);function getTemplate$7(){return html`<!--_html_template_start_--><style include="settings-shared">
  :host([is-sub-feature]) #feature-icon {
    display: none;
  }

  :host([is-sub-feature]) .settings-box .middle {
    padding-inline-start: 64px;
  }

  #card {
    border-top: var(--cr-separator-line);
    border-top-style: var(--feature-item-border-top-style, solid);
    padding: var(--cr-section-vertical-padding) 0;
  }

  #feature-icon {
    padding: 2px;
  }

  cr-policy-indicator {
    padding: 0 var(--cr-controlled-by-spacing);
  }

  #help-icon:active {
    /* Still reveal tooltip on click. */
    pointer-events: none;
  }
</style>
<div id="card" class="settings-box no-padding">
  <div id="linkWrapper" class="link-wrapper"
        actionable$="[[isRowClickable_(
            feature, pageContentData, subpageRoute)]]"
        on-click="handleItemClick_">
    <template is="dom-if" if="[[!isFeatureIconHidden]]">
      <slot name="icon">
        <iron-icon id="feature-icon" icon="[[getIconName(feature)]]"
            aria-hidden="true">
        </iron-icon>
      </slot>
    </template>
    <div id="item-text-container"
      class$="[[getItemTextContainerClassName_(isFeatureIconHidden)]]"
      aria-hidden="true">
      <slot name="feature-name">
        <div id="featureName">[[getFeatureName(feature)]]</div>
      </slot>
      <slot name="feature-summary">
        <localized-link
            class="secondary"
            id="featureSecondary"
            localized-string="[[getFeatureSummaryHtml(feature)]]">
        </localized-link>
      </slot>
    </div>
    <template is="dom-if"
        if="[[hasSubpageClickHandler_(feature, pageContentData,
                  subpageRoute)]]"
              restamp>
      <cr-icon-button id="subpageButton" class="subpage-arrow"
          aria-labelledby="featureName" aria-describedby="featureSecondary"
          aria-roledescription="Subpage button">
      </cr-icon-button>
    </template>
    <template is="dom-if" if="[[iconTooltip]]" restamp>
      <iron-icon id="help-icon" tabindex="0" icon="[[icon]]"
          aria-labelledby="tooltip" aria-disabled="true">
      </iron-icon>
      <paper-tooltip id="tooltip" for="help-icon" position="top"
          aria-hidden="true" fit-to-visible-bounds>
        [[iconTooltip]]
      </paper-tooltip>
    </template>
  </div>
  <template is="dom-if"
      if="[[shouldShowSeparator_(
                feature, pageContentData, subpageRoute)]]"
            restamp>
    <div class="separator"></div>
  </template>

  <template is="dom-if"
      if="[[!isFeatureAllowedByPolicy(feature, pageContentData)]]"
      restamp>
    <cr-policy-indicator indicator-type="userPolicy"></cr-policy-indicator>
  </template>
  <div class="margin-matches-padding" aria-labelledby="featureName"
      aria-describedby="featureSecondary">
    <!-- The aria-labelledby and aria-describedby are used by custom slotted
    content, without which ChromeVox will not announce the #featureName
    or #featureSummary. Note that the default slotted content still needs
    their own aria-labelledby and aria-describedby attributes. -->
    <slot name="feature-controller">
      <!-- This settings-multidevice-feature-toggle is the default
      controller. If an element with slot="feature-controller" is attached,
      it will replace this one. -->
      <settings-multidevice-feature-toggle
          aria-labelledby="featureName"
          aria-describedby="featureSecondary"
          feature="[[feature]]"
          page-content-data="[[pageContentData]]">
      </settings-multidevice-feature-toggle>
    </slot>
  </div>
</div>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
var SmartLockToggleLocation;(function(SmartLockToggleLocation){SmartLockToggleLocation[SmartLockToggleLocation["MULTIDEVICE_PAGE"]=0]="MULTIDEVICE_PAGE";SmartLockToggleLocation[SmartLockToggleLocation["LOCK_SCREEN_SETTINGS"]=1]="LOCK_SCREEN_SETTINGS"})(SmartLockToggleLocation||(SmartLockToggleLocation={}));var SmartLockToggle;(function(SmartLockToggle){SmartLockToggle[SmartLockToggle["ENABLED_ON_MULTIDEVICE_PAGE"]=0]="ENABLED_ON_MULTIDEVICE_PAGE";SmartLockToggle[SmartLockToggle["DISABLED_ON_MULTIDEVICE_PAGE"]=1]="DISABLED_ON_MULTIDEVICE_PAGE";SmartLockToggle[SmartLockToggle["ENABLED_ON_LOCK_SCREEN_SETTINGS"]=2]="ENABLED_ON_LOCK_SCREEN_SETTINGS";SmartLockToggle[SmartLockToggle["DISABLED_ON_LOCK_SCREEN_SETTINGS"]=3]="DISABLED_ON_LOCK_SCREEN_SETTINGS";SmartLockToggle[SmartLockToggle["MAX"]=4]="MAX"})(SmartLockToggle||(SmartLockToggle={}));const SMART_LOCK_TOGGLE_HISTOGRAM_NAME="SmartLock.Toggle";function recordSmartLockToggleMetric(smartLockToggleLocation,enabled){chrome.send("metricsHandler:recordInHistogram",[SMART_LOCK_TOGGLE_HISTOGRAM_NAME,getSmartLockToggleValue(smartLockToggleLocation,enabled),SmartLockToggle.MAX])}function getSmartLockToggleValue(smartLockToggleLocation,enabled){switch(smartLockToggleLocation){case SmartLockToggleLocation.MULTIDEVICE_PAGE:return enabled?SmartLockToggle.ENABLED_ON_MULTIDEVICE_PAGE:SmartLockToggle.DISABLED_ON_MULTIDEVICE_PAGE;case SmartLockToggleLocation.LOCK_SCREEN_SETTINGS:return enabled?SmartLockToggle.ENABLED_ON_LOCK_SCREEN_SETTINGS:SmartLockToggle.DISABLED_ON_LOCK_SCREEN_SETTINGS;default:assertNotReached$1("Invalid smartLockToggleLocation")}}
// Copyright 2018 The Chromium Authors
const SettingsMultideviceFeatureItemElementBase=MultiDeviceFeatureMixin(RouteOriginMixin(PolymerElement));class SettingsMultideviceFeatureItemElement extends SettingsMultideviceFeatureItemElementBase{static get is(){return"settings-multidevice-feature-item"}static get template(){return getTemplate$7()}static get properties(){return{feature:Number,subpageRoute:Object,iconTooltip:String,icon:{type:String,value:"cr:info-outline"},subpageRouteUrlSearchParams:Object,isSubFeature:{type:Boolean,value:false,reflectToAttribute:true},isFeatureIconHidden:{type:Boolean,value:false}}}constructor(){super();this.route_=routes.MULTIDEVICE_FEATURES}ready(){super.ready();this.addEventListener("feature-toggle-clicked",this.onFeatureToggleClicked_);this.addFocusConfig(this.subpageRoute,"#subpageButton")}focus(){const slot=castExists(this.shadowRoot.querySelector('slot[name="feature-controller"]'));const elems=slot.assignedElements({flatten:true});assert$1(elems.length>0);elems[0].focus()}isRowClickable_(){return this.hasSubpageClickHandler_()||this.isFeatureStateEditable(this.feature)}hasSubpageClickHandler_(){return!!this.subpageRoute&&this.isFeatureAllowedByPolicy(this.feature)}shouldShowSeparator_(){return this.hasSubpageClickHandler_()||!!this.iconTooltip}handleItemClick_(event){if(event.composedPath()[0].tagName==="A"){event.stopPropagation();return}if(!this.hasSubpageClickHandler_()){if(this.isFeatureStateEditable(this.feature)){const toggleButton=castExists(this.shadowRoot.querySelector("settings-multidevice-feature-toggle"));toggleButton.toggleFeature()}return}assert$1(this.subpageRoute);Router.getInstance().navigateTo(this.subpageRoute,this.subpageRouteUrlSearchParams,true)}getItemTextContainerClassName_(isFeatureIconHidden){return isFeatureIconHidden?"start":"middle"}onFeatureToggleClicked_(event){const feature=event.detail.feature;const enabled=event.detail.enabled;if(feature===MultiDeviceFeature.SMART_LOCK){const toggleLocation=Router.getInstance().currentRoute.contains(routes.LOCK_SCREEN)?SmartLockToggleLocation.LOCK_SCREEN_SETTINGS:SmartLockToggleLocation.MULTIDEVICE_PAGE;recordSmartLockToggleMetric(toggleLocation,enabled)}}}customElements.define(SettingsMultideviceFeatureItemElement.is,SettingsMultideviceFeatureItemElement);
// Copyright 2020 The Chromium Authors
class PluralStringProxyImpl{getPluralString(messageName,itemCount){return sendWithPromise("getPluralString",messageName,itemCount)}getPluralStringTupleWithComma(messageName1,itemCount1,messageName2,itemCount2){return sendWithPromise("getPluralStringTupleWithComma",messageName1,itemCount1,messageName2,itemCount2)}getPluralStringTupleWithPeriods(messageName1,itemCount1,messageName2,itemCount2){return sendWithPromise("getPluralStringTupleWithPeriods",messageName1,itemCount1,messageName2,itemCount2)}static getInstance(){return instance$5||(instance$5=new PluralStringProxyImpl)}static setInstance(obj){instance$5=obj}}let instance$5=null;
// Copyright 2016 The Chromium Authors
var StatusAction;(function(StatusAction){StatusAction["NO_ACTION"]="noAction";StatusAction["REAUTHENTICATE"]="reauthenticate";StatusAction["UPGRADE_CLIENT"]="upgradeClient";StatusAction["ENTER_PASSPHRASE"]="enterPassphrase";StatusAction["RETRIEVE_TRUSTED_VAULT_KEYS"]="retrieveTrustedVaultKeys";StatusAction["CONFIRM_SYNC_SETTINGS"]="confirmSyncSettings"})(StatusAction||(StatusAction={}));var PageStatus;(function(PageStatus){PageStatus["SPINNER"]="spinner";PageStatus["CONFIGURE"]="configure";PageStatus["DONE"]="done";PageStatus["PASSPHRASE_FAILED"]="passphraseFailed"})(PageStatus||(PageStatus={}));var TrustedVaultBannerState;(function(TrustedVaultBannerState){TrustedVaultBannerState[TrustedVaultBannerState["NOT_SHOWN"]=0]="NOT_SHOWN";TrustedVaultBannerState[TrustedVaultBannerState["OFFER_OPT_IN"]=1]="OFFER_OPT_IN";TrustedVaultBannerState[TrustedVaultBannerState["OPTED_IN"]=2]="OPTED_IN"})(TrustedVaultBannerState||(TrustedVaultBannerState={}));const PROMO_IMPRESSION_COUNT_KEY="signin-promo-count";class SyncBrowserProxyImpl{getPromoImpressionCount(){return parseInt(window.localStorage.getItem(PROMO_IMPRESSION_COUNT_KEY),10)||0}incrementPromoImpressionCount(){window.localStorage.setItem(PROMO_IMPRESSION_COUNT_KEY,(this.getPromoImpressionCount()+1).toString())}attemptUserExit(){return chrome.send("AttemptUserExit")}turnOnSync(){return chrome.send("TurnOnSync")}turnOffSync(){return chrome.send("TurnOffSync")}startKeyRetrieval(){chrome.send("SyncStartKeyRetrieval")}getSyncStatus(){return sendWithPromise("SyncSetupGetSyncStatus")}getStoredAccounts(){return sendWithPromise("SyncSetupGetStoredAccounts")}didNavigateToSyncPage(){chrome.send("SyncSetupShowSetupUI")}didNavigateAwayFromSyncPage(didAbort){chrome.send("SyncSetupDidClosePage",[didAbort])}setSyncDatatypes(syncPrefs){return sendWithPromise("SyncSetupSetDatatypes",JSON.stringify(syncPrefs))}setEncryptionPassphrase(passphrase){return sendWithPromise("SyncSetupSetEncryptionPassphrase",passphrase)}setDecryptionPassphrase(passphrase){return sendWithPromise("SyncSetupSetDecryptionPassphrase",passphrase)}startSyncingWithEmail(email,isDefaultPromoAccount){chrome.send("SyncSetupStartSyncingWithEmail",[email,isDefaultPromoAccount])}openActivityControlsUrl(){chrome.metricsPrivate.recordUserAction("Signin_AccountSettings_GoogleActivityControlsClicked")}sendSyncPrefsChanged(){chrome.send("SyncPrefsDispatch")}sendTrustedVaultBannerStateChanged(){chrome.send("SyncTrustedVaultBannerStateDispatch")}static getInstance(){return instance$4||(instance$4=new SyncBrowserProxyImpl)}static setInstance(obj){instance$4=obj}}let instance$4=null;
// Copyright 2021 The Chromium Authors
let instance$3=null;class MetricsConsentBrowserProxyImpl{static getInstance(){return instance$3||(instance$3=new MetricsConsentBrowserProxyImpl)}static setInstanceForTesting(obj){instance$3=obj}getMetricsConsentState(){return sendWithPromise("getMetricsConsentState")}updateMetricsConsent(consent){return sendWithPromise("updateMetricsConsent",{consent:consent})}}function getTemplate$6(){return html`<!--_html_template_start_--><style include="cr-actionable-row-style settings-shared">
    #settingsToggle {
      width: 100%;
    }
</style>

<settings-toggle-button
    id="settingsToggle"
    pref="[[metricsConsentPref_]]"
    label="Help improve Chrome OS features and performance"
    sub-label="Automatically sends crash reports as well as diagnostic and usage data to Google"
    disabled$="[[!isMetricsConsentConfigurable_]]"
    on-settings-boolean-control-change="onMetricsConsentChange_"
    no-set-pref>
</settings-toggle-button>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
const SettingsMetricsConsentToggleButtonElementBase=PrefsMixin(PolymerElement);class SettingsMetricsConsentToggleButtonElement extends SettingsMetricsConsentToggleButtonElementBase{static get is(){return"settings-metrics-consent-toggle-button"}static get template(){return getTemplate$6()}static get properties(){return{metricsConsentPref_:{type:Object,value:{type:chrome.settingsPrivate.PrefType.BOOLEAN,value:false}},isMetricsConsentConfigurable_:{type:Boolean,value:false}}}constructor(){super();this.metricsConsentBrowserProxy_=MetricsConsentBrowserProxyImpl.getInstance();this.metricsConsentBrowserProxy_.getMetricsConsentState().then((state=>{const pref=this.get(state.prefName,this.prefs);if(pref){this.metricsConsentPref_=pref;this.isMetricsConsentConfigurable_=state.isConfigurable}}))}focus(){this.getMetricsToggle_().focus()}onMetricsConsentChange_(){this.metricsConsentBrowserProxy_.updateMetricsConsent(this.getMetricsToggle_().checked).then((consent=>{if(consent===this.getMetricsToggle_().checked){this.getMetricsToggle_().sendPrefChange()}else{this.getMetricsToggle_().resetToPrefValue()}}))}getMetricsToggle_(){return castExists(this.shadowRoot.querySelector("#settingsToggle"))}}customElements.define(SettingsMetricsConsentToggleButtonElement.is,SettingsMetricsConsentToggleButtonElement);
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let mediaDevicesInstance=null;class MediaDevicesProxy{static getMediaDevices(){return mediaDevicesInstance||navigator.mediaDevices}static setMediaDevicesForTesting(obj){mediaDevicesInstance=obj}}
// Copyright 2022 The Chromium Authors
let instance$2=null;class PrivacyHubBrowserProxyImpl{getInitialMicrophoneHardwareToggleState(){return sendWithPromise("getInitialMicrophoneHardwareToggleState")}sendLeftOsPrivacyPage(){chrome.send("leftOsPrivacyPage")}sendOpenedOsPrivacyPage(){chrome.send("osPrivacyPageWasOpened")}static getInstance(){return instance$2||(instance$2=new PrivacyHubBrowserProxyImpl)}static setInstanceForTesting(obj){instance$2=obj}}function getTemplate$5(){return html`<!--_html_template_start_--><style include="settings-shared">
    .list-item:not(:last-of-type) {
      border-bottom: var(--cr-separator-line);
    }

    .list-frame {
      padding-bottom: 8px;
      padding-top: 8px;
    }
</style>

<div id="camera">
  <settings-toggle-button
      class="settings-box first"
      pref="{{prefs.ash.user.camera_allowed}}"
      id="cameraToggle"
      label="Camera access"
      sub-label="Allow access for apps and websites with the camera permission"
      deep-link-focus-id$="[[Setting.kCameraOnOff]]"
      disabled="[[isCameraListEmpty_]]"
      on-change="onCameraToggleChanged_">
  </settings-toggle-button>

  <div class="list-frame">
    <template is="dom-if" if="[[isCameraListEmpty_]]" restamp>
      <div id="noCamera" class="list-item">
        No camera
      </div>
    </template>

    <template is="dom-if" if="[[!isCameraListEmpty_]]" restamp>
      <template id="cameraList" is="dom-repeat" items="[[camerasConnected_]]">
        <div class="list-item">
          [[item]]
        </div>
      </template>
    </template>
  </div>
</div>

<div id="microphone">
  <settings-toggle-button
      class="settings-box"
      pref="{{prefs.ash.user.microphone_allowed}}"
      id="microphoneToggle"
      label="Microphone access"
      deep-link-focus-id$="[[Setting.kMicrophoneOnOff]]"
      sub-label="Allow access for apps and websites with the microphone permission"
      disabled="[[shouldDisableMicrophoneToggle_]]"
      on-change="onMicrophoneToggleChanged_">
    <cr-tooltip-icon
      hidden$="[[!microphoneHardwareToggleActive_]]"
      tooltip-text="To turn on microphone access, turn on the physical microphone switch on your device"
      icon-class="cr:info-outline"
      slot="more-actions">
    </cr-tooltip-icon>
  </settings-toggle-button>

  <div class="list-frame">
    <template is="dom-if" if="[[isMicListEmpty_]]" restamp>
      <div id="noMic" class="list-item">
        No microphone
      </div>
    </template>

    <template is="dom-if" if="[[!isMicListEmpty_]]" restamp>
      <template id="micList" is="dom-repeat" items="[[microphonesConnected_]]">
        <div class="list-item">
          [[item]]
        </div>
      </template>
    </template>
  </div>
</div>

<!-- Location toggle is not to be shown in dogfooded version of Privacy Hub -->
<template is="dom-if" if="[[showPrivacyHubMVPPage_]]" restamp>
  <settings-toggle-button
      class="settings-box"
      pref="{{prefs.ash.user.geolocation_allowed}}"
      id="geolocationToggle"
      label="Location access"
      sub-label="Allow apps and websites and the system time zone to use the location determined by Google Location Services. If location access is turned off, your location may still be visible through your IP address."
      deep-link-focus-id$="[[Setting.kGeolocationOnOff]]">
  </settings-toggle-button>
</template>


  <settings-metrics-consent-toggle-button
      class="settings-box no-padding"
      id="metricsConsentToggle"
      deep-link-focus-id$="[[Setting.kUsageStatsAndCrashReports]]"
      prefs="{{prefs}}">
  </settings-metrics-consent-toggle-button>


<settings-toggle-button
    class="settings-box"
    id="suggested-content"
    pref="{{prefs.settings.suggested_content_enabled}}"
    label="Suggest new content to explore"
    sub-label="Includes apps, web pages and more. Sends statistics to improve suggestions only if you’ve chosen to share usage data."
    learn-more-url="https://support.google.com/chromebook/?p=explorecontent">
</settings-toggle-button>
<!--_html_template_end_-->`}
// Copyright 2022 The Chromium Authors
const PrivacyHubNavigationOrigin={SYSTEM_SETTINGS:0,NOTIFICATION:1};const SettingsPrivacyHubSubpageBase=PrefsMixin(DeepLinkingMixin(RouteObserverMixin(WebUiListenerMixin(i16nMixin(PolymerElement)))));class SettingsPrivacyHubSubpage extends SettingsPrivacyHubSubpageBase{static get is(){return"settings-privacy-hub-subpage"}static get template(){return getTemplate$5()}static get properties(){return{showPrivacyHubMVPPage_:{type:Boolean,readOnly:true,value:function(){return loadTimeData.getBoolean("showPrivacyHubMVPPage")}},camerasConnected_:{type:Array,value:[]},isCameraListEmpty_:{type:Boolean,computed:"computeIsCameraListEmpty_(camerasConnected_)"},microphonesConnected_:{type:Array,value:[]},isMicListEmpty_:{type:Boolean,computed:"computeIsMicListEmpty_(microphonesConnected_)"},microphoneHardwareToggleActive_:{type:Boolean,value:false},shouldDisableMicrophoneToggle_:{type:Boolean,computed:"computeShouldDisableMicrophoneToggle_(isMicListEmpty_, "+"microphoneHardwareToggleActive_)"},supportedSettingIds:{type:Object,value:()=>new Set([Setting.kCameraOnOff,Setting.kMicrophoneOnOff,Setting.kGeolocationOnOff,Setting.kUsageStatsAndCrashReports])}}}constructor(){super();this.browserProxy_=PrivacyHubBrowserProxyImpl.getInstance()}ready(){super.ready();assert$1(loadTimeData.getBoolean("showPrivacyHubPage"));this.addWebUiListener("microphone-hardware-toggle-changed",(enabled=>{this.setMicrophoneHardwareToggleState_(enabled)}));this.browserProxy_.getInitialMicrophoneHardwareToggleState().then((enabled=>{this.setMicrophoneHardwareToggleState_(enabled)}));this.updateMediaDeviceLists_();MediaDevicesProxy.getMediaDevices().addEventListener("devicechange",(()=>this.updateMediaDeviceLists_()))}currentRouteChanged(route){if(route!==routes.PRIVACY_HUB){return}this.attemptDeepLink()}computeIsCameraListEmpty_(){return this.camerasConnected_.length===0}computeIsMicListEmpty_(){return this.microphonesConnected_.length===0}setMicrophoneHardwareToggleState_(enabled){if(enabled){this.microphoneHardwareToggleActive_=true}else{this.microphoneHardwareToggleActive_=false}}computeShouldDisableMicrophoneToggle_(){return this.microphoneHardwareToggleActive_||this.isMicListEmpty_}updateMediaDeviceLists_(){MediaDevicesProxy.getMediaDevices().enumerateDevices().then((devices=>{const connectedCameras=[];const connectedMicrophones=[];devices.forEach((device=>{if(device.kind==="videoinput"){connectedCameras.push(device.label)}else if(device.kind==="audioinput"&&device.deviceId!=="default"){connectedMicrophones.push(device.label)}}));this.camerasConnected_=connectedCameras;this.microphonesConnected_=connectedMicrophones}))}onCameraToggleChanged_(event){chrome.metricsPrivate.recordBoolean("ChromeOS.PrivacyHub.Camera.Settings.Enabled",event.target.checked)}onMicrophoneToggleChanged_(event){chrome.metricsPrivate.recordBoolean("ChromeOS.PrivacyHub.Microphone.Settings.Enabled",event.target.checked)}}customElements.define(SettingsPrivacyHubSubpage.is,SettingsPrivacyHubSubpage);const StageSpec={$:mojo.internal.Enum()};var Stage;(function(Stage){Stage[Stage["kStopped"]=0]="kStopped";Stage[Stage["kPaused"]=1]="kPaused";Stage[Stage["kGettingFreeSpace"]=2]="kGettingFreeSpace";Stage[Stage["kListingFiles"]=3]="kListingFiles";Stage[Stage["kSyncing"]=4]="kSyncing";Stage[Stage["kSuccess"]=5]="kSuccess";Stage[Stage["kCannotGetFreeSpace"]=6]="kCannotGetFreeSpace";Stage[Stage["kCannotListFiles"]=7]="kCannotListFiles";Stage[Stage["kNotEnoughSpace"]=8]="kNotEnoughSpace";Stage[Stage["kCannotEnableDocsOffline"]=9]="kCannotEnableDocsOffline";Stage[Stage["MIN_VALUE"]=0]="MIN_VALUE";Stage[Stage["MAX_VALUE"]=9]="MAX_VALUE"})(Stage||(Stage={}));class PageHandlerFactoryPendingReceiver{constructor(handle){this.handle=mojo.internal.interfaceSupport.getEndpointForReceiver(handle)}bindInBrowser(scope="context"){mojo.internal.interfaceSupport.bind(this.handle,"ash.settings.google_drive.mojom.PageHandlerFactory",scope)}}class PageHandlerFactoryRemote{constructor(handle){this.proxy=new mojo.internal.interfaceSupport.InterfaceRemoteBase(PageHandlerFactoryPendingReceiver,handle);this.$=new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);this.onConnectionError=this.proxy.getConnectionErrorEventRouter()}createPageHandler(page,handler){this.proxy.sendMessage(0,PageHandlerFactory_CreatePageHandler_ParamsSpec.$,null,[page,handler])}}class PageHandlerFactory{static get $interfaceName(){return"ash.settings.google_drive.mojom.PageHandlerFactory"}static getRemote(){let remote=new PageHandlerFactoryRemote;remote.$.bindNewPipeAndPassReceiver().bindInBrowser();return remote}}class PageHandlerPendingReceiver{constructor(handle){this.handle=mojo.internal.interfaceSupport.getEndpointForReceiver(handle)}bindInBrowser(scope="context"){mojo.internal.interfaceSupport.bind(this.handle,"ash.settings.google_drive.mojom.PageHandler",scope)}}class PageHandlerRemote{constructor(handle){this.proxy=new mojo.internal.interfaceSupport.InterfaceRemoteBase(PageHandlerPendingReceiver,handle);this.$=new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);this.onConnectionError=this.proxy.getConnectionErrorEventRouter()}calculateRequiredSpace(){this.proxy.sendMessage(0,PageHandler_CalculateRequiredSpace_ParamsSpec.$,null,[])}getTotalPinnedSize(){return this.proxy.sendMessage(1,PageHandler_GetTotalPinnedSize_ParamsSpec.$,PageHandler_GetTotalPinnedSize_ResponseParamsSpec.$,[])}clearPinnedFiles(){return this.proxy.sendMessage(2,PageHandler_ClearPinnedFiles_ParamsSpec.$,PageHandler_ClearPinnedFiles_ResponseParamsSpec.$,[])}}class PagePendingReceiver{constructor(handle){this.handle=mojo.internal.interfaceSupport.getEndpointForReceiver(handle)}bindInBrowser(scope="context"){mojo.internal.interfaceSupport.bind(this.handle,"ash.settings.google_drive.mojom.Page",scope)}}class PageRemote{constructor(handle){this.proxy=new mojo.internal.interfaceSupport.InterfaceRemoteBase(PagePendingReceiver,handle);this.$=new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);this.onConnectionError=this.proxy.getConnectionErrorEventRouter()}onServiceUnavailable(){this.proxy.sendMessage(0,Page_OnServiceUnavailable_ParamsSpec.$,null,[])}onProgress(status){this.proxy.sendMessage(1,Page_OnProgress_ParamsSpec.$,null,[status])}}class PageCallbackRouter{constructor(){this.helper_internal_=new mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal(PageRemote);this.$=new mojo.internal.interfaceSupport.InterfaceReceiverHelper(this.helper_internal_);this.router_=new mojo.internal.interfaceSupport.CallbackRouter;this.onServiceUnavailable=new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);this.helper_internal_.registerHandler(0,Page_OnServiceUnavailable_ParamsSpec.$,null,this.onServiceUnavailable.createReceiverHandler(false));this.onProgress=new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);this.helper_internal_.registerHandler(1,Page_OnProgress_ParamsSpec.$,null,this.onProgress.createReceiverHandler(false));this.onConnectionError=this.helper_internal_.getConnectionErrorEventRouter()}removeListener(id){return this.router_.removeListener(id)}}const StatusSpec={$:{}};const PageHandlerFactory_CreatePageHandler_ParamsSpec={$:{}};const PageHandler_CalculateRequiredSpace_ParamsSpec={$:{}};const PageHandler_GetTotalPinnedSize_ParamsSpec={$:{}};const PageHandler_GetTotalPinnedSize_ResponseParamsSpec={$:{}};const PageHandler_ClearPinnedFiles_ParamsSpec={$:{}};const PageHandler_ClearPinnedFiles_ResponseParamsSpec={$:{}};const Page_OnServiceUnavailable_ParamsSpec={$:{}};const Page_OnProgress_ParamsSpec={$:{}};mojo.internal.Struct(StatusSpec.$,"Status",[mojo.internal.StructField("requiredSpace",0,0,mojo.internal.String,null,false,0),mojo.internal.StructField("remainingSpace",8,0,mojo.internal.String,null,false,0),mojo.internal.StructField("stage",16,0,StageSpec.$,0,false,0),mojo.internal.StructField("isError",20,0,mojo.internal.Bool,false,false,0)],[[0,32]]);mojo.internal.Struct(PageHandlerFactory_CreatePageHandler_ParamsSpec.$,"PageHandlerFactory_CreatePageHandler_Params",[mojo.internal.StructField("page",0,0,mojo.internal.InterfaceProxy(PageRemote),null,false,0),mojo.internal.StructField("handler",8,0,mojo.internal.InterfaceRequest(PageHandlerPendingReceiver),null,false,0)],[[0,24]]);mojo.internal.Struct(PageHandler_CalculateRequiredSpace_ParamsSpec.$,"PageHandler_CalculateRequiredSpace_Params",[],[[0,8]]);mojo.internal.Struct(PageHandler_GetTotalPinnedSize_ParamsSpec.$,"PageHandler_GetTotalPinnedSize_Params",[],[[0,8]]);mojo.internal.Struct(PageHandler_GetTotalPinnedSize_ResponseParamsSpec.$,"PageHandler_GetTotalPinnedSize_ResponseParams",[mojo.internal.StructField("size",0,0,mojo.internal.String,null,true,0)],[[0,16]]);mojo.internal.Struct(PageHandler_ClearPinnedFiles_ParamsSpec.$,"PageHandler_ClearPinnedFiles_Params",[],[[0,8]]);mojo.internal.Struct(PageHandler_ClearPinnedFiles_ResponseParamsSpec.$,"PageHandler_ClearPinnedFiles_ResponseParams",[],[[0,8]]);mojo.internal.Struct(Page_OnServiceUnavailable_ParamsSpec.$,"Page_OnServiceUnavailable_Params",[],[[0,8]]);mojo.internal.Struct(Page_OnProgress_ParamsSpec.$,"Page_OnProgress_Params",[mojo.internal.StructField("status",0,0,StatusSpec.$,null,false,0)],[[0,16]]);
// Copyright 2023 The Chromium Authors
class GoogleDriveBrowserProxy{constructor(){this.handler=new PageHandlerRemote;this.observer=new PageCallbackRouter;const factory=PageHandlerFactory.getRemote();factory.createPageHandler(this.observer.$.bindNewPipeAndPassRemote(),this.handler.$.bindNewPipeAndPassReceiver())}static getInstance(){return instance$1||(instance$1=new GoogleDriveBrowserProxy)}static setInstance(proxy){instance$1=proxy}}let instance$1=null;function getTemplate$4(){return html`<!--_html_template_start_--><style include="settings-shared"></style>

<div
    class="settings-box two-line first"
    deep-link-focus-id$="[[Setting.kGoogleDriveConnection]]">
  <template is="dom-if" if="[[driveDisabled_]]" restamp>
    <div class="start">
      Disconnected from <strong>redacted@gmail.com</strong>
    </div>
  </template>
  <template is="dom-if" if="[[!driveDisabled_]]" restamp>
    <div class="start">
      Signed in as: <strong>redacted@gmail.com</strong>
    </div>
  </template>
  <controlled-button id="driveConnectDisconnect"
      on-click="onConnectDisconnectClick_"
      pref="{{prefs.gdata.disabled}}"
      label="[[getConnectDisconnectButtonLabel_(driveDisabled_)]]"
      deep-link-focus-id$="[[Setting.kGoogleDriveConnection]]">
  </controlled-button>
  <template is="dom-if"
      if="[[shouldShowConfirmationDialog_(dialogType_, 'disconnect')]]" restamp>
    <!-- TODO(b/redacted): Update text once defined. -->
    <settings-drive-confirmation-dialog
        id="drive-disconnect-dialog"
        cancel-button-text="Cancel"
        action-button-text="Disconnect"
        title-text="Disconnect Google Drive account"
        body-text="Replace this text with the correct copy."
        on-close="onDriveConfirmationDialogClose_">
    </settings-drive-confirmation-dialog>
  </template>
</div>

<div class="hr"></div>

<template is="dom-if" if="[[!driveDisabled_]]" restamp>
  <settings-toggle-button
      id="driveBulkPinning"
      pref="{{prefs.drivefs.bulk_pinning_enabled}}"
      label="Keep your files available when you&#39;re offline"
      sub-label="[[getBulkPinningSubLabel_(bulkPinningStatus_)]]"
      on-settings-boolean-control-change="onToggleBulkPinning_"
      no-set-pref>
  </settings-toggle-button>

  <template is="dom-if"
      if="[[shouldShowConfirmationDialog_(dialogType_, 'bulk-pinning-disable')]]"
      restamp>
    <settings-drive-confirmation-dialog
        id="drive-bulk-pinning-disable-dialog"
        cancel-button-text="Cancel"
        action-button-text="Turn off"
        title-text="Are you sure you want to turn off automatic syncing?"
        body-text="New Google Drive files will no longer be synced automatically, but files that are already synced will remain available."
        on-close="onDriveConfirmationDialogClose_">
    </settings-drive-confirmation-dialog>
  </template>

  <template is="dom-if"
      if="[[shouldShowConfirmationDialog_(dialogType_, 'bulk-pinning-not-enough-space')]]"
      restamp>
    <settings-drive-confirmation-dialog
        id="drive-bulk-pinning-not-enough-space-dialog"
        cancel-button-text="Cancel"
        title-text="Low disk space"
        body-text="Cannot enable this feature due to insufficient disk space."
        on-close="onDriveConfirmationDialogClose_">
    </settings-drive-confirmation-dialog>
  </template>

  <template is="dom-if"
      if="[[shouldShowConfirmationDialog_(dialogType_, 'bulk-pinning-unexpected-error')]]"
      restamp>
    <settings-drive-confirmation-dialog
        id="drive-bulk-pinning-unexpected-error-dialog"
        cancel-button-text="Cancel"
        title-text="An unexpected error occurred"
        body-text="Cannot enable this feature as an unexpected error has occurred."
        on-close="onDriveConfirmationDialogClose_">
    </settings-drive-confirmation-dialog>
  </template>

  <div class="settings-box two-line" id="drive-offline-storage-row">
    <div class="start">
      Offline Storage
      <div class="secondary">
        [[totalPinnedSize_]]
      </div>
    </div>
    <cr-button role="button"
        on-click="onClearPinnedFiles_"
        disabled="[[shouldEnableClearOfflineButton_(bulkPinningStatus_)]]">
      Clear offline storage
    </cr-button>
  </div>

  <template is="dom-if"
      if="[[shouldShowConfirmationDialog_(dialogType_, 'bulk-pinning-clear-files')]]"
      restamp>
    <settings-drive-confirmation-dialog
        id="drive-bulk-pinning-clear-files-confirmation-dialog"
        cancel-button-text="Cancel"
        action-button-text="Clear offline storage"
        title-text="Clear offline storage?"
        body-text="[[getClearOfflineStorageConfirmationBody_()]]"
        on-close="onDriveConfirmationDialogClose_">
    </settings-drive-confirmation-dialog>
  </template>

  <div class="hr"></div>
</template>
<!--_html_template_end_-->`}
// Copyright 2023 The Chromium Authors
const SettingsGoogleDriveSubpageElementBase=i16nMixin(PrefsMixin(DeepLinkingMixin(RouteObserverMixin(PolymerElement))));const GOOGLE_DRIVE_DISABLED_PREF="gdata.disabled";const GOOGLE_DRIVE_BULK_PINNING_PREF="drivefs.bulk_pinning_enabled";var ConfirmationDialogType;(function(ConfirmationDialogType){ConfirmationDialogType["DISCONNECT"]="disconnect";ConfirmationDialogType["BULK_PINNING_DISABLE"]="bulk-pinning-disable";ConfirmationDialogType["BULK_PINNING_NOT_ENOUGH_SPACE"]="bulk-pinning-not-enough-space";ConfirmationDialogType["BULK_PINNING_UNEXPECTED_ERROR"]="bulk-pinning-unexpected-error";ConfirmationDialogType["BULK_PINNING_CLEAR_FILES"]="bulk-pinning-clear-files";ConfirmationDialogType["NONE"]="none"})(ConfirmationDialogType||(ConfirmationDialogType={}));class SettingsGoogleDriveSubpageElement extends SettingsGoogleDriveSubpageElementBase{constructor(){super();this.bulkPinningStatus_=null;this.bulkPinningServiceUnavailable_=false;this.dialogType_=ConfirmationDialogType.NONE;this.totalPinnedSize_=null;this.proxy_=GoogleDriveBrowserProxy.getInstance()}static get is(){return"settings-google-drive-subpage"}static get template(){return getTemplate$4()}static get properties(){return{supportedSettingIds:{type:Object,value:()=>new Set([Setting.kGoogleDriveConnection])},totalPinnedSize_:String}}static get observers(){return[`updateDriveDisabled_(prefs.${GOOGLE_DRIVE_DISABLED_PREF}.*)`]}get pageHandler(){return this.proxy_.handler}get callbackRouter(){return this.proxy_.observer}get requiredSpace(){return this.bulkPinningStatus_?.requiredSpace||-1}get remainingSpace(){return this.bulkPinningStatus_?.remainingSpace||-1}get totalPinnedSize(){return this.totalPinnedSize_}get dialogType(){return this.dialogType_}connectedCallback(){super.connectedCallback();this.callbackRouter.onServiceUnavailable.addListener(this.onServiceUnavailable_.bind(this));this.callbackRouter.onProgress.addListener(this.onProgress_.bind(this))}onServiceUnavailable_(){this.bulkPinningServiceUnavailable_=true}onProgress_(status){if(status.stage!==this.bulkPinningStatus_?.stage||status.remainingSpace!==this.bulkPinningStatus_?.remainingSpace||status.requiredSpace!==this.bulkPinningStatus_?.requiredSpace){this.bulkPinningStatus_=status}}async updateTotalPinnedSize_(){this.totalPinnedSize_=this.i16n("googleDriveOfflineClearCalculatingSubtitle");const{size:size}=await this.pageHandler.getTotalPinnedSize();if(size){this.totalPinnedSize_=size;return}this.totalPinnedSize_=this.i16n("googleDriveOfflineClearErrorSubtitle")}updateDriveDisabled_(){const disabled=this.getPref(GOOGLE_DRIVE_DISABLED_PREF).value;this.driveDisabled_=disabled}currentRouteChanged(route,_oldRoute){if(route!==routes.GOOGLE_DRIVE){return}this.onNavigated()}onNavigated(){this.attemptDeepLink();this.pageHandler.calculateRequiredSpace();this.updateTotalPinnedSize_()}getConnectDisconnectButtonLabel_(){return this.driveDisabled_?this.i16n("googleDriveConnectLabel"):this.i16n("googleDriveDisconnectLabel")}onConnectDisconnectClick_(){if(this.driveDisabled_){this.setPrefValue(GOOGLE_DRIVE_DISABLED_PREF,false);return}this.dialogType_=ConfirmationDialogType.DISCONNECT}async onDriveConfirmationDialogClose_(e){const closedDialogType=this.dialogType_;this.dialogType_=ConfirmationDialogType.NONE;if(!e.detail.accept){return}switch(closedDialogType){case ConfirmationDialogType.DISCONNECT:this.setPrefValue(GOOGLE_DRIVE_DISABLED_PREF,true);break;case ConfirmationDialogType.BULK_PINNING_DISABLE:this.setPrefValue(GOOGLE_DRIVE_BULK_PINNING_PREF,false);break;case ConfirmationDialogType.BULK_PINNING_CLEAR_FILES:await this.proxy_.handler.clearPinnedFiles();this.updateTotalPinnedSize_();break;default:assertNotReached$1("Unknown acceptance criteria from dialog")}}getBulkPinningSubLabel_(){if(!this.bulkPinningStatus_||this.bulkPinningStatus_?.stage!==Stage.kSuccess||this.bulkPinningServiceUnavailable_){return this.i16n("googleDriveOfflineSubtitle")}const{requiredSpace:requiredSpace,remainingSpace:remainingSpace}=this.bulkPinningStatus_;return this.i16n("googleDriveOfflineSubtitle")+" "+this.i16n("googleDriveOfflineSpaceSubtitle",requiredSpace,remainingSpace)}shouldShowConfirmationDialog_(type,requestedType){return type===requestedType}onToggleBulkPinning_(e){const target=e.target;const newValueAfterToggle=!this.getPref(GOOGLE_DRIVE_BULK_PINNING_PREF).value;if(this.bulkPinningStatus_?.isError){target.checked=false;if(this.bulkPinningStatus_?.stage===Stage.kNotEnoughSpace){this.dialogType_=ConfirmationDialogType.BULK_PINNING_NOT_ENOUGH_SPACE;return}this.dialogType_=ConfirmationDialogType.BULK_PINNING_UNEXPECTED_ERROR;return}target.checked=true;if(!newValueAfterToggle){this.dialogType_=ConfirmationDialogType.BULK_PINNING_DISABLE;return}this.setPrefValue(GOOGLE_DRIVE_BULK_PINNING_PREF,true)}shouldEnableClearOfflineButton_(){return this.getPref(GOOGLE_DRIVE_BULK_PINNING_PREF).value}getClearOfflineStorageConfirmationBody_(){return this.i16n("googleDriveOfflineClearDialogBody",this.totalPinnedSize_)}async onClearPinnedFiles_(){this.dialogType_=ConfirmationDialogType.BULK_PINNING_CLEAR_FILES}}customElements.define(SettingsGoogleDriveSubpageElement.is,SettingsGoogleDriveSubpageElement);function getTemplate$3(){return html`<!--_html_template_start_--><style include="cr-hidden-style cr-input-style cr-shared-style">textarea{display:block;resize:none}#input-container{background-color:var(--cr-input-background-color)}:host([autogrow][has-max-height]) #input-container{box-sizing:content-box;max-height:var(--cr-textarea-autogrow-max-height);min-height:1lh}:host([invalid]) #underline{border-color:var(--cr-input-error-color)}#footerContainer{border-top:0;display:var(--cr-textarea-footer-display,none);font-size:var(--cr-form-field-label-font-size);height:var(--cr-form-field-label-height);justify-content:space-between;line-height:var(--cr-form-field-label-line-height);margin:8px 0;min-height:0;padding:0;white-space:var(--cr-input-error-white-space)}:host([invalid]) #footerContainer,:host([invalid]) #label{color:var(--cr-input-error-color)}#mirror{display:none}:host([autogrow]) #mirror{display:block;visibility:hidden;white-space:pre-wrap;word-wrap:break-word}:host([autogrow]) #mirror,:host([autogrow]) textarea{border:0;box-sizing:border-box;padding-bottom:var(--cr-input-padding-bottom,6px);padding-inline-end:var(--cr-input-padding-end,8px);padding-inline-start:var(--cr-input-padding-start,8px);padding-top:var(--cr-input-padding-top,6px)}:host([autogrow]) textarea{height:100%;left:0;overflow:hidden;position:absolute;resize:none;top:0;width:100%}:host([autogrow][has-max-height]) #mirror,:host([autogrow][has-max-height]) textarea{overflow-x:hidden;overflow-y:auto}</style>
<div id="label" class="cr-form-field-label" hidden="[[!label]]">
  [[label]]
</div>
<div id="input-container">
  
  <div id="mirror">[[calculateMirror_(value)]]</div>
  
  <textarea id="input" autofocus="[[autofocus]]" rows="[[rows]]" value="{{value::input}}" aria-label$="[[label]]" on-focus="onInputFocusChange_" on-blur="onInputFocusChange_" on-change="onInputChange_" disabled="[[disabled]]" maxlength$="[[maxlength]]" readonly$="[[readonly]]" required$="[[required]]"></textarea>
  <div id="underline"></div>
</div>
<div id="footerContainer" class="cr-row">
  <div id="firstFooter" aria-live="[[getFooterAria_(invalid)]]">
    [[firstFooter]]
  </div>
  <div id="secondFooter" aria-live="[[getFooterAria_(invalid)]]">
    [[secondFooter]]
  </div>
</div>
<!--_html_template_end_-->`}
// Copyright 2018 The Chromium Authors
class CrTextareaElement extends PolymerElement{static get is(){return"cr-textarea"}static get template(){return getTemplate$3()}static get properties(){return{autofocus:{type:Boolean,value:false,reflectToAttribute:true},disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"onDisabledChanged_"},required:{type:Boolean,value:false,reflectToAttribute:true},maxlength:{type:Number},readonly:Boolean,rows:{type:Number,value:3,reflectToAttribute:true},label:{type:String,value:""},value:{type:String,value:"",notify:true},autogrow:{type:Boolean,value:false,reflectToAttribute:true},hasMaxHeight:{type:Boolean,value:false,reflectToAttribute:true},invalid:{type:Boolean,value:false,reflectToAttribute:true},firstFooter:{type:String,value:""},secondFooter:{type:String,value:""}}}focusInput(){this.$.input.focus()}onInputChange_(e){this.dispatchEvent(new CustomEvent("change",{bubbles:true,composed:true,detail:{sourceEvent:e}}))}calculateMirror_(){if(!this.autogrow){return""}const tokens=this.value?this.value.split("\n"):[""];while(this.rows>0&&tokens.length<this.rows){tokens.push("")}return tokens.join("\n")+"&nbsp;"}onInputFocusChange_(){if(this.shadowRoot.activeElement===this.$.input){this.setAttribute("focused_","")}else{this.removeAttribute("focused_")}}onDisabledChanged_(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}getFooterAria_(){return this.invalid?"assertive":"polite"}}customElements.define(CrTextareaElement.is,CrTextareaElement);
// Copyright 2016 The Chromium Authors
var SecureDnsMode;(function(SecureDnsMode){SecureDnsMode["OFF"]="off";SecureDnsMode["AUTOMATIC"]="automatic";SecureDnsMode["SECURE"]="secure"})(SecureDnsMode||(SecureDnsMode={}));var SecureDnsUiManagementMode;(function(SecureDnsUiManagementMode){SecureDnsUiManagementMode[SecureDnsUiManagementMode["NO_OVERRIDE"]=0]="NO_OVERRIDE";SecureDnsUiManagementMode[SecureDnsUiManagementMode["DISABLED_MANAGED"]=1]="DISABLED_MANAGED";SecureDnsUiManagementMode[SecureDnsUiManagementMode["DISABLED_PARENTAL_CONTROLS"]=2]="DISABLED_PARENTAL_CONTROLS"})(SecureDnsUiManagementMode||(SecureDnsUiManagementMode={}));class PrivacyPageBrowserProxyImpl{setBlockAutoplayEnabled(enabled){chrome.send("setBlockAutoplayEnabled",[enabled])}getSecureDnsResolverList(){return sendWithPromise("getSecureDnsResolverList")}getSecureDnsSetting(){return sendWithPromise("getSecureDnsSetting")}isValidConfig(entry){return sendWithPromise("isValidConfig",entry)}probeConfig(entry){return sendWithPromise("probeConfig",entry)}recordUserDropdownInteraction(oldSelection,newSelection){chrome.send("recordUserDropdownInteraction",[oldSelection,newSelection])}static getInstance(){return instance||(instance=new PrivacyPageBrowserProxyImpl)}static setInstance(obj){instance=obj}}let instance=null;function getTemplate$2(){return html`<!--_html_template_start_--><style include="settings-shared">
  cr-button {
    white-space: nowrap;
  }
</style>
<settings-multidevice-feature-item id="phoneHubCombinedSetupItem"
    page-content-data="[[pageContentData]]" is-sub-feature>
  <div id="featureName" slot="feature-name">
    [[setupName_]]
  </div>
  <localized-link
      class="secondary"
      id="featureSecondary"
      slot="feature-summary"
      localized-string="[[setupSummary_]]">
  </localized-link>
  <cr-button
      slot="feature-controller"
      on-click="handlePhoneHubSetupClick_"
      aria-labelledby="featureName"
      aria-describedby="featureSecondary"
      disabled="[[getButtonDisabledState_(pageContentData)]]">
    Set up
  </cr-button>
</settings-multidevice-feature-item>
<!--_html_template_end_-->`}
// Copyright 2021 The Chromium Authors
const SettingsMultideviceCombinedSetupItemElementBase=MultiDeviceFeatureMixin(PolymerElement);class SettingsMultideviceCombinedSetupItemElement extends SettingsMultideviceCombinedSetupItemElementBase{static get is(){return"settings-multidevice-combined-setup-item"}static get template(){return getTemplate$2()}static get properties(){return{cameraRoll:{type:Boolean,value:false},notifications:{type:Boolean,value:false},appStreaming:{type:Boolean,value:false},setupName_:{type:String,computed:"getSetupName_(cameraRoll, notifications, appStreaming)",reflectToAttribute:true},setupSummary_:{type:String,computed:"getSetupSummary_(cameraRoll, notifications, appStreaming)",reflectToAttribute:true}}}constructor(){super();this.browserProxy_=MultiDeviceBrowserProxyImpl.getInstance()}getSetupName_(){if(this.cameraRoll&&this.notifications&&this.appStreaming){return this.i16n("multidevicePhoneHubCameraRollNotificationsAndAppsItemTitle")}if(this.cameraRoll&&this.notifications){return this.i16n("multidevicePhoneHubCameraRollAndNotificationsItemTitle")}if(this.cameraRoll&&this.appStreaming){return this.i16n("multidevicePhoneHubCameraRollAndAppsItemTitle")}if(this.notifications&&this.appStreaming){return this.i16n("multidevicePhoneHubAppsAndNotificationsItemTitle")}return""}getSetupSummary_(){if(this.cameraRoll&&this.notifications&&this.appStreaming){return this.i16n("multidevicePhoneHubCameraRollNotificationsAndAppsItemSummary")}if(this.cameraRoll&&this.notifications){return this.i16n("multidevicePhoneHubCameraRollAndNotificationsItemSummary")}if(this.cameraRoll&&this.appStreaming){return this.i16n("multidevicePhoneHubCameraRollAndAppsItemSummary")}if(this.notifications&&this.appStreaming){return this.i16n("multidevicePhoneHubAppsAndNotificationsItemSummary")}return""}handlePhoneHubSetupClick_(){const permissionSetupRequiredEvent=new CustomEvent("permission-setup-requested",{bubbles:true,composed:true});this.dispatchEvent(permissionSetupRequiredEvent);let setupMode=PhoneHubPermissionsSetupFeatureCombination.NONE;if(this.cameraRoll&&this.notifications&&this.appStreaming){setupMode=PhoneHubPermissionsSetupFeatureCombination.ALL_PERMISSONS}if(this.cameraRoll&&this.notifications){setupMode=PhoneHubPermissionsSetupFeatureCombination.NOTIFICATION_AND_CAMERA_ROLL}if(this.cameraRoll&&this.appStreaming){setupMode=PhoneHubPermissionsSetupFeatureCombination.MESSAGING_APP_AND_CAMERA_ROLL}if(this.notifications&&this.appStreaming){setupMode=PhoneHubPermissionsSetupFeatureCombination.NOTIFICATION_AND_MESSAGING_APP}this.browserProxy_.logPhoneHubPermissionSetUpButtonClicked(setupMode)}getButtonDisabledState_(){return!this.isSuiteOn()||!this.isPhoneHubOn()}}customElements.define(SettingsMultideviceCombinedSetupItemElement.is,SettingsMultideviceCombinedSetupItemElement);function getTemplate$1(){return html`<!--_html_template_start_--><style include="settings-shared"></style>
<div id="container"
    inner-h-t-m-l="[[getAriaLabelledContent_()]]">
</div>
<!--_html_template_end_-->`}
// Copyright 2020 The Chromium Authors
const SettingsMultideviceTaskContinuationDisabledLinkElementBase=i16nMixin(PolymerElement);class SettingsMultideviceTaskContinuationDisabledLinkElement extends SettingsMultideviceTaskContinuationDisabledLinkElementBase{static get is(){return"settings-multidevice-task-continuation-disabled-link"}static get template(){return getTemplate$1()}constructor(){super();this.browserProxy_=MultiDeviceBrowserProxyImpl.getInstance()}connectedCallback(){super.connectedCallback();const chromeSyncLink=this.shadowRoot.querySelector("#chromeSyncLink");if(chromeSyncLink){chromeSyncLink.addEventListener("click",this.onChromeSyncLinkClick_.bind(this))}}getAriaLabelledContent_(){const tempEl=document.createElement("div");tempEl.innerHTML=this.i16nAdvanced("multidevicePhoneHubTaskContinuationDisabledSummary",{attrs:["id"]});tempEl.childNodes.forEach(((node,index)=>{if(node.nodeType===Node.TEXT_NODE){const spanNode=document.createElement("span");spanNode.textContent=node.textContent;spanNode.id=`id${index}`;spanNode.setAttribute("aria-hidden","true");node.replaceWith(spanNode)}}));const chromeSyncLink=castExists(tempEl.querySelector("#chromeSyncLink"));const learnMoreLink=castExists(tempEl.querySelector("#learnMoreLink"));chromeSyncLink.setAttribute("aria-label",this.i16n("multidevicePhoneHubTaskContinuationSyncLabel"));learnMoreLink.setAttribute("aria-label",this.i16n("multidevicePhoneHubLearnMoreLabel"));chromeSyncLink.href="#";return tempEl.innerHTML}onChromeSyncLinkClick_(event){event.preventDefault();this.browserProxy_.showBrowserSyncSettings();const openedBrowserAdvancedSyncSettingsEvent=new CustomEvent("opened-browser-advanced-sync-settings",{bubbles:true,composed:true});this.dispatchEvent(openedBrowserAdvancedSyncSettingsEvent)}}customElements.define(SettingsMultideviceTaskContinuationDisabledLinkElement.is,SettingsMultideviceTaskContinuationDisabledLinkElement);function getTemplate(){return html`<!--_html_template_start_--><style include="settings-shared"></style>
<settings-multidevice-feature-item id="phoneHubTaskContinuationItem"
    feature="[[MultiDeviceFeature.PHONE_HUB_TASK_CONTINUATION]]"
    page-content-data="[[pageContentData]]" is-sub-feature>
  <template is="dom-if" if="[[!isChromeTabsSyncEnabled_]]" restamp>
    <settings-multidevice-task-continuation-disabled-link
        class="secondary"
        id="featureSecondary"
        slot="feature-summary">
    </settings-multidevice-task-continuation-disabled-link>
    <!-- Replace the standard feature-controller with an always disabled and
      off cr-toggle when Chrome Sync Open Tabs is disabled. When Chrome Sync
      is enabled the standard feature-controller is used. -->
    <cr-toggle disabled slot="feature-controller">
    </cr-toggle>
  </template>
</settings-multidevice-feature-item>
<!--_html_template_end_-->`}
// Copyright 2020 The Chromium Authors
const SettingsMultideviceTaskContinuationItemElementBase=MultiDeviceFeatureMixin(WebUiListenerMixin(PolymerElement));class SettingsMultideviceTaskContinuationItemElement extends SettingsMultideviceTaskContinuationItemElementBase{static get is(){return"settings-multidevice-task-continuation-item"}static get template(){return getTemplate()}static get properties(){return{isChromeTabsSyncEnabled_:{type:Boolean,value:false}}}constructor(){super();this.syncBrowserProxy_=SyncBrowserProxyImpl.getInstance()}connectedCallback(){super.connectedCallback();this.addWebUiListener("sync-prefs-changed",this.handleSyncPrefsChanged_.bind(this));this.syncBrowserProxy_.sendSyncPrefsChanged()}focus(){if(!this.isChromeTabsSyncEnabled_){this.shadowRoot.querySelector("cr-toggle").focus()}else{this.$.phoneHubTaskContinuationItem.focus()}}handleSyncPrefsChanged_(syncPrefs){this.isChromeTabsSyncEnabled_=!!syncPrefs&&syncPrefs.tabsSynced}}customElements.define(SettingsMultideviceTaskContinuationItemElement.is,SettingsMultideviceTaskContinuationItemElement);export{CrScrollableBehavior as $,ApnDetailDialogMode as A,OncMojo as B,CrPolicyIndicatorType$1 as C,DeepLinkingMixin as D,processDeviceState as E,FindShortcutMixin as F,GlobalScrollTargetMixin as G,CrPolicyNetworkBehaviorMojo as H,i16nMixin as I,FAKE_CREDENTIAL as J,isActiveSim as K,LifetimeBrowserProxyImpl as L,htmlEscape as M,NetworkListenerBehavior as N,OsSettingsSubpageElement as O,PrefsMixin as P,InternetPageBrowserProxyImpl as Q,RouteObserverMixin as R,Setting as S,TERMINA_VM_TYPE as T,OsSyncBrowserProxyImpl as U,VM_DEVICE_MICROPHONE as V,WebUiListenerMixin as W,assertExists as X,FocusRowBehavior as Y,getESimProfileProperties as Z,CellularSetupPageName as _,assertNotReached$1 as a,OsResetBrowserProxyImpl as a$,ESimManagerListenerBehavior as a0,MultiDeviceBrowserProxyImpl as a1,getSimSlotCount as a2,getPendingESimProfiles as a3,MultiDeviceFeatureState as a4,CrToggleElement as a5,ManageA11ySubpageBrowserProxyImpl as a6,DevicePageBrowserProxyImpl as a7,TextToSpeechPageBrowserProxyImpl as a8,SettingsToggleButtonElement as a9,StatusAction as aA,CupsPrintersEntryListMixin as aB,matchesSearchTerm as aC,sortPrinters as aD,CupsPrintersBrowserProxyImpl as aE,PrinterSetupResult as aF,PrivacyPageBrowserProxyImpl as aG,SecureDnsMode as aH,SecureDnsUiManagementMode as aI,sanitizeInnerHtml$1 as aJ,SettingsRadioGroupElement as aK,CROSTINI_TYPE as aL,GuestOsBrowserProxyImpl as aM,PLUGIN_VM_TYPE as aN,SettingsMultideviceCombinedSetupItemElement as aO,SettingsMultideviceTaskContinuationItemElement as aP,SettingsGoogleDriveSubpageElement as aQ,PrinterType as aR,PrintServerResult as aS,CupsPrintersEntryManager as aT,OsSettingsPrintingPageElement as aU,getStatusReasonFromPrinterStatus as aV,PrinterOnlineState as aW,PrinterStatusReason as aX,PrinterStatusSeverity as aY,MediaDevicesProxy as aZ,PrivacyHubBrowserProxyImpl as a_,ChromeVoxSubpageBrowserProxyImpl as aa,SelectToSpeakSubpageBrowserProxyImpl as ab,SwitchAccessSubpageBrowserProxyImpl as ac,TtsSubpageBrowserProxyImpl as ad,BrowserChannel as ae,AboutPageBrowserProxyImpl as af,isTargetChannelMoreStable as ag,DeviceNameBrowserProxyImpl as ah,SetDeviceNameResult as ai,browserChannelToi16nId as aj,DeviceNameState as ak,AccountManagerBrowserProxyImpl as al,getImage as am,ParentalControlsBrowserProxyImpl as an,assertInstanceof$1 as ao,focusWithoutInk as ap,LockStateMixin as aq,MultiDeviceFeatureMixin as ar,MultiDeviceFeature as as,MultiDeviceSettingsMode as at,recordLockScreenProgress as au,LockScreenUnlockType as av,LockScreenProgress as aw,PluralStringProxyImpl as ax,SyncBrowserProxyImpl as ay,PageStatus as az,routes as b,GoogleDriveBrowserProxy as b$,listenOnce as b0,NETWORK_SECTION_PATH as b1,BLUETOOTH_SECTION_PATH as b2,MULTI_DEVICE_SECTION_PATH as b3,PEOPLE_SECTION_PATH as b4,KERBEROS_SECTION_PATH as b5,DEVICE_SECTION_PATH as b6,PERSONALIZATION_SECTION_PATH as b7,SEARCH_AND_ASSISTANT_SECTION_PATH as b8,PRIVACY_AND_SECURITY_SECTION_PATH as b9,PhoneHubPermissionsSetupFeatureCombination as bA,PhoneHubFeatureAccessProhibitedReason as bB,PhoneHubFeatureAccessStatus as bC,FocusRowMixin as bD,CrSearchFieldMixin as bE,FocusOutlineManager as bF,SectionSpec as bG,SubpageSpec as bH,SettingSpec as bI,OpenWindowProxyImpl as bJ,recordSearch as bK,CrContainerShadowMixin as bL,setGlobalScrollTarget as bM,recordPageFocus as bN,recordPageBlur as bO,recordClick as bP,recordNavigation as bQ,SettingsDropdownMenuElement as bR,SettingsPrefsElement as bS,CrButtonElement as bT,SettingsSliderElement as bU,setDisplayApiForTesting as bV,setUserActionRecorderForTesting as bW,routesMojom as bX,user_action_recorder_mojomWebui as bY,setting_mojomWebui as bZ,PhoneHubPermissionsSetupMode as b_,APPS_SECTION_PATH as ba,ACCESSIBILITY_SECTION_PATH as bb,DATE_AND_TIME_SECTION_PATH as bc,LANGUAGES_AND_INPUT_SECTION_PATH as bd,FILES_SECTION_PATH as be,PRINTING_SECTION_PATH as bf,CROSTINI_SECTION_PATH as bg,RESET_SECTION_PATH as bh,UpdateStatus as bi,assertNotReached as bj,PrivacyHubNavigationOrigin as bk,getDisplayApi as bl,IronResizableBehavior as bm,LidClosedBehavior as bn,IdleBehavior as bo,StorageSpaceState as bp,NoteAppLockScreenSupport as bq,Button as br,ButtonState as bs,hasActiveCellularNetwork as bt,getESimProfile as bu,NetworkConfigElementBehavior as bv,isConnectedToNonCellularNetwork as bw,getNumESimProfiles as bx,PhoneHubPermissionsSetupFlowScreens as by,PhoneHubPermissionsSetupAction as bz,assert$1 as c,PageCallbackRouter as c0,PageHandlerRemote as c1,PageRemote as c2,Stage as c3,ConfirmationDialogType as c4,MetricsConsentBrowserProxyImpl as c5,SearchEnginesBrowserProxyImpl as c6,OsSettingsSectionElement as c7,Route as c8,cast as d,equalContainerId as e,containerLabel as f,SettingsGuestOsSharedUsbDevicesElement as g,castExists as h,RouteOriginMixin as i,Router as j,CrSettingsPrefs as k,PaperRippleBehavior as l,CrRadioButtonMixin as m,PrefControlMixin as n,i16nBehavior as o,prefToString as p,assertExhaustive as q,recordSettingChange as r,CrScrollableMixin as s,IronA11yKeysBehavior as t,getInstance as u,focusWithoutInk$1 as v,PromiseResolver as w,getEuicc as x,getNonPendingESimProfiles as y,assert as z};