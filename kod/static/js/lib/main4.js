var tplDialogCss = "<style>\
.tips-box{z-index: 9999;}\
div.check-version-dialog .aui-header{background:transparent;opacity:1;filter: alpha(opacity=100);}\
div.check-version-dialog .aui-title{color:#fff;text-shadow:none;background-color:transparent;border:none;}\
div.check-version-dialog .aui-title img{margin-left: 10px;}\
div.check-version-dialog .aui-min,div.check-version-dialog .aui-max{display:none;}\
div.check-version-dialog .aui-close{border-radius: 12px;}\
div.check-version-dialog .aui-main{box-shadow: 0 0px 70px rgba(0,0,0,0.2);}\
div.dialog-simple .dialog-mouse-in .aui-header{opacity:1;}}\
div.check-version-dialog .aui-content{overflow: visible;}\
div.check-version-dialog .aui-content .title{background:#3F51B5;\
	background-image:linear-gradient(100deg, #2196F3,#29b92f);}\
.hidden{display: none;}\
.check-version-dialog .update-box,.check-version-dialog .aui-outer{border-radius: 8px!important;}\
.update-box{background:#fff;font-size: 14px;box-shadow: 0 5px 30px rgba(0,0,0,0.05);margin-top:-40px;}\
.update-box .title{width:100%;background:#3f51b5;color:#fff;height:130px;text-align: center;}\
.update-box .button-radius{margin: 0 auto;padding-top:40px;overflow: hidden;}\
.update-box .button-radius a{color:#fff;text-decoration:none;border:2px solid #f6f6f6;border:2px solid rgba(255,255,255,0.6);position: relative;border-radius:20px;padding: 6px 20px;display: inline-block;font-size: 16px;}\
.update-box .button-radius a i{padding-left: 8px;}\
.update-box .button-radius a:hover,.button-radius a:focus,.button-radius a.this{background:rgba(255,255,255,0.3);}\
.update-box .button-radius a.this:hover{cursor: default;}\
.update-box .ver_tips{text-decoration:none;color:#fff;font-size:14px;display:inline-block;position:relative;border-bottom:2px solid rgba(255,255,255,0.3);height:24px;line-height:30px;margin-left: 10px;}\
.update-box .ver_tips:hover{color:#FFEB3B;}\
.update-box .version{color:#fff;font-size: 13px;line-height:30px;height:30px;}\
.update-box .version-info{padding:20px;}\
.update-box .version-info i{font-size:15px;display: block;border-left:3px solid #9cf;padding-left:10px;}\
.update-box .version-info .version-info-content{color: #69c;background:#eee;margin-top: 10px;padding:10px;font-size: 12px;}\
.update-box .version-info p{height:140px;overflow:auto;}\
.update-box .version-info a{float: right;color:#69c;text-decoration: none;}\
.update-box .progress{box-shadow:0 0 3px #2196F3;border-radius:20px;margin: 0 auto;position: relative;\
	color:#015d97;font-size:12px;width:190px;height:25px;margin-top:10px;overflow:hidden !important;}\
.update-box .progress .total-size{position: absolute;left:10px;z-index: 100;height: 25px;line-height: 27px;}\
.update-box .progress .download-speed{position: absolute;right:10px;z-index: 100;height: 25px;line-height: 27px;}\
.update-box .progress .progress-bar{\
	position: absolute;left: 0px;top: 0px;height:100%;width:0%;\
	background-size: 40px 40px;background-color: #abd7fb;transition: width .6s ease;\
	-webkit-animation: progress-bar-stripes 2s linear infinite;\
	animation: progress-bar-stripes 2s linear infinite;\
	background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.35) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.35) 75%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0));}\
.check-version-dialog.dialog-simple .aui-title{height: 40px;}\
</style>";
var tplDialogHtml = "<div class='update-box'>\
	<div class='title'>\
		<div class='button-radius'>\
			<div class='progress hidden'>\
				<span class='total-size'></span>\
				<span class='download-speed'></span>\
				<div class='progress-bar'></div>\
			</div>\
			{{if hasNew}}\
			<a href='javascript:;' class='update-start'><span>{{LNG.updateAutoUpdate}}</span><i class='icon-arrow-right'></i></a>\
			{{else}}\
			<a href='javascript:;' class='this'>{{LNG.updateIsNew}}<i class='icon-smile'></i></a>\
			{{/if}}\
		</div>\
		{{if hasNew}}\
			<a href='javascript:;' class='ver_tips update-self-dialog' target='_blank'><span>{{LNG.updateSelf}}</span></a> \
			<a href='javascript:;' class='ver_tips ignore'>{{LNG.updateIgnore}}</a>\
		{{/if}}\
		<div class='version'>{{LNG.updateVersionLocal}}???{{versionLocal}} | {{LNG.updateVersionNewest}}???{{versionNew}}\
		{{if hasNew}}<span class='badge' style='background:#f60;'>new</span>{{/if}}</div>\
		<div style='clear:both'></div>\
	</div>\
	<div class='version-info'>\
		<i>ver {{versionNew}} {{LNG.updateWhatsNew}}???</i>\
		<div class='version-info-content'>\
			<p>{{echo LNG.updateInfo}}</p>\
			<a class='more' href='{{readmoreLink}}' target='_blank'>{{LNG.updateReadmore}}</a>\
			<div style='clear:both'></div>\
		</div>\
	</div>\
</div>";

define(function(require, exports) {
	kodCheckUpdate  = false;
	var versionLocal   = parseFloat(G.version);
	var versionServer  = "4.40";
	var kodUpdateForce = true;//????????????
	var versionTotalSize = 13894810;//size [2019-11-15 13:45:52]

	//AB test kodcloud
	var host = window.location.href;
	if( versionLocal == '1.0' ||
		host.search("kodcloud.com") != -1 ||
		host.search("self/kod/") != -1
		){
		versionServer = "4.40";
	}
	
	if(G.myhome == undefined){
		G.myhome = "";
	}
	var kodPath = G.basicPath;
	var dataPath = G.myhome.substr(0,G.myhome.search("User/"));//User??????????????? ???????????????data???????????????
	var statusLink = '//api.kodcloud.com/?state/index';
	var readmoreLink  = 'http://doc.kodcloud.com/#/others-changelog';
	var currentVersionFile = 'http://static.kodcloud.com/update/update/2.0-'+versionServer+'.zip';
	var updateLog = {
		'zh-CN':"\
		#### update:<br/>\
		- ?????????????????????APP??????;\
		- ??????????????????;\
		- ????????????(??????????????????????????????????????????????????????????????????????????????);\
		",
		//=====================
		'en':"\
		<b style='color:#f30;font-size:16px;padding:10px 0;display: inline-block;'>Emergency vulnerability repair, it is recommended to upgrade immediately!</b><br/>\
		- correlation, bug repair, security optimization, <br/>\
		"
	}
	if(versionLocal < 4.25){
		var cn = "<b style='color:#f30;font-size:16px;padding:10px 0;display: inline-block;'>????????????????????????,??????????????????????????????!?????????????????????.</b><br/>";
		var en = "<b style='color:#f30;font-size:16px;padding:10px 0;display: inline-block;'>Emergency vulnerability repair, it is recommended to upgrade immediately!</b><br/>";
		updateLog['zh-CN'] = cn+updateLog['zh-CN'];
		updateLog['en'] = en+updateLog['en'];
	}

	
	var kodVersionCheck = 'kodVersionCheck';
	var urlEncode = encodeURIComponent;
	var timeFloat = function(){
		var time = (new Date()).valueOf();
		return time/1000;
	}
	var time = function(){var date = new Date();return parseInt(date.getTime()/1000);}
	var downloadRequest = function(from,to,callback){
		$.ajax({//??????????????????
			url:'?explorer/serverDownload&savePath='+to+'&url='+urlEncode(from),
			dataType:'json',
			error:function(xhr, textStatus, errorThrown){
				var error = '<div class="ajaxError">'+xhr.responseText+'</div>';
				$.dialog({
					id:'ajaxErrorDialog',
					width:'60%',
					height:'50%',
					fixed:true,
					resize:true,
					ico:core.icon('error'),
					title:'ajax error',
					content:error
				});
				if(xhr.status != 200){
					return;
				}
				if (typeof (callback) == 'function'){
					callback(data);
				}
			},
			success:function(data){
				if( data.code == false &&
					data.data == 'downloading'){
					setTimeout(function(){
						downloadRequest(from,to,callback);
					},1000);
					return;
				}
				if (typeof (callback) == 'function'){
					callback(data);
				}
			}
		});
	}

	var unzip = function(file,unzipTo,callback){
		$.ajax({
			url:G.appHost+'explorer/unzip&pathTo='+urlEncode(unzipTo)+'&path='+urlEncode(file),
			success:function(data){
				if (typeof (callback) == 'function') callback(data);
			}
		});
	};
	var removeFile = function(file,callback){
		$.ajax({
			url: G.appHost+'explorer/pathDelete',
			type:'POST',
			dataType:'json',
			data:'dataArr=[{"type":"file","path":"'+urlEncode(file)+'"}]',
			success:function(data){
				if (typeof (callback) == 'function') callback(data);
			}
		});
	};
	var rename = function(file,nameTo,callback){
		$.ajax({
			url:G.appHost+'explorer/pathRname&rnameTo='+urlEncode(nameTo)+'&path='+urlEncode(file),
			success:function(data){
				if (typeof (callback) == 'function') callback(data);
			}
		});
	};
	var fileInfo = function(file,callback){
		$.ajax({
			url: G.appHost+'explorer/pathInfo',
			type:'POST',
			dataType:'json',
			data:'dataArr=[{"type":"file","path":"'+file+'"}]',
			error:function(){
				if (typeof (callback) == 'function') callback();
			},
			success:function(data){
				if (typeof (callback) == 'function') callback(data,file);
			}
		});
	}
	var checkUpdate = function(callback){
		var pathPre = kodPath;
		var checkPath = [
			dataPath,
			dataPath+'system/apps.php',
			pathPre,
			pathPre+'config/',
			pathPre+'config/version.php',
			pathPre+'config/config.php',
			pathPre+'app/',
			pathPre+'static/',
			pathPre+'app/template/',
			pathPre+'app/controller/',
			pathPre+'app/controller/user.class.php',
			pathPre+'app/controller/explorer.class.php',
			pathPre+'app/function/common.function.php',
			pathPre+'app/template/explorer/index.html',
		];
		var result = {}; //-1????????????0 ?????????-????????????1-?????????-??????
		for (var i = 0; i < checkPath.length; i++) {
			var path = checkPath[i];
			result[path] = -1;
			fileInfo(path,function(data,thePaht){
				result[thePaht] = 0;
				if(data && data.code && data.data.isWriteable){
					result[thePaht] = 1;
				}
				checkFinished();
			});
		}
		Tips.loading(LNG.updateCheckSupport);
		var checkFinished = function(){
			var totalNum = checkPath.length;
			var finishedNum = 0;
			var successNum  = 0;
			for (var i = 0; i < checkPath.length; i++) {
				if(result[checkPath[i]] === -1){
					continue;
				}
				finishedNum++;
				if(result[checkPath[i]] === 1){
					successNum++;
				}
			}
			if(finishedNum == totalNum){
				Tips.close(LNG.updateCheckSupport);
				if(totalNum == successNum){
					Tips.close(LNG.updateCheckSupport,true);
					if (typeof (callback) == 'function') callback();
				}else{
					Tips.close(LNG.updateErrorTitle,false);
					updateCheckError();
				}
			}
		}
	}

	var updateCheckError = function(){
		$.dialog({
			title:LNG.updateErrorTitle,
			content:
			"<div style='padding:30px 20px;'>\
			<div class='alert alert-danger can-select' role='alert'>"+LNG.updateErrorDesc+"</div>\
				linux:<pre style='margin:10px 0'>chmod -Rf 777 "+G.basicPath+"</pre>\
				windows:<pre style='margin:10px 0'>"+LNG.updateErrorWindows+"</pre>\
				"+LNG.updateErrorDownloadTips+"\
				<div style='text-align:center;margin:10px 0;'>\
				<a class='btn btn-default btn-lg' target='_blank' href='"
					+currentVersionFile+"'><i class='font-icon icon-cloud-download'></i>  "
					+LNG.updateErrorDownloadPackage+"</a></div></div>",
			padding:"0",
			width:'420px'
		});
	}
	var updateSelf = function(){
		$.dialog({
			title:LNG.updateSelf,
			content:
			"<div style='padding:30px 20px;'>\
			<div class='alert alert-info can-select' role='alert'>"+LNG.updateSelfDesc+"</div>\
			<div style='text-align:center;margin:10px 0;'>\
			<a class='btn btn-default' target='_blank' href='"
					+currentVersionFile+"'><i class='font-icon icon-cloud-download'></i>  "
					+LNG.updateErrorDownloadPackage+"</a>\
			<a class='btn btn-default update_goto_data' href='javascript:;'>\
				<i class='font-icon icon-folder-open'></i>  data</a></div>",
			padding:"0",
			width:'380px'
		});
	}

	var update = function(){
		checkUpdate(function(){
			updateStart();
		});
	}

	//????????????
	var updateStart = function(){
		if (G.isRoot !=1) return;
		var id = 'check-version-dialog',
			$dlg = $('.'+id),
			$button = $dlg.find('.update-start'),
			$press  = $dlg.find('.progress'),
			$tips 	= $dlg.find('.ignore');
		var saveTo  = dataPath;
		var updateZipFile = saveTo+'2.0-'+versionServer+'.zip';
		var downloadFile = dataPath+'2.0-'+versionServer+'.zip.downloading';

		$tips.removeClass('ignore').html(LNG.updateDownloading);
		$button.addClass('hidden');
		$press.removeClass('hidden').fadeIn(300);

		var speedTimer;
		var speedRefresh = function(){
			var speedList,
				currentSpeed='0B/s',
				preTime=0;
			var getSpeed=function(currentSize){
				if(timeFloat()-preTime <=0.3){
					return currentSpeed;
				}
				preTime = timeFloat();
				var arr_len = 5;
				if (typeof(speedList) == 'undefined') {
					speedList = [[timeFloat()-0.5,0],[timeFloat(),currentSize]];
				}else{
					if (speedList<=arr_len) {
						speedList.push([timeFloat(),currentSize]);
					}else{
						speedList = speedList.slice(1,arr_len);
						speedList.push([timeFloat(),currentSize]);
					}
				}
				var last= speedList[speedList.length-1],
					first = speedList[0];
				var speed = (last[1]-first[1])/(last[0]-first[0]);
				speed = pathTools.fileSize(speed)+'/s';
				currentSpeed = speed;
				return speed;
			};
			var updateSpeed = function(fileSize){
				var speed = getSpeed(fileSize);
				var percent = parseFloat(fileSize)/parseFloat(versionTotalSize) * 100;
				$('.update-box .total-size').html(pathTools.fileSize(versionTotalSize));
				$('.update-box .download-speed').html(percent.toFixed(1) + '% ('+speed+') ');
				$('.update-box .progress-bar').css('width',percent+"%");
			}
			updateSpeed(0);
			speedTimer = setInterval(function(){
				fileInfo(downloadFile,function(data){
					if(data && data.code && data.data.size){
						updateSpeed(data.data.size);
					}
				});
			},600);
		}
		var unzipUpdate = function(zipfile){
			var loadingPic = "//static.kodcloud.com/update/update/loading.gif";
			Tips.loading(LNG.updateDownloadSuccess);
			MaskView && MaskView.image(loadingPic);
			$("#maskViewContent img").css("border-radius","50%");

			unzip(zipfile,kodPath,function(data){
				//????????????
				if(data && data.code === false){
					MaskView && MaskView.close();
					$press.addClass('hidden');
					$tips.html(LNG.updateUnzipFail);
					$button.removeClass('hidden').html(LNG.updateAutoUpdate);
					Tips.close(data.data);
					return;
				}

				Cookie.clear();
				setTimeout(function(){//reload page
					window.location.href = G.appHost+'user/logout';
				},2000);
				if (data.code) {
					removeFile(zipfile,function(){//remove download file
						Cookie.del(kodVersionCheck);
						$press.addClass('hidden');
						$tips.html(LNG.updateSuccess);
						$button.removeClass('hidden')
							.unbind('click')
							.removeClass('update-start')
							.addClass('this')
							.html(LNG.updateSuccess);
						Tips.close(LNG.updateSuccess);
					});
					return;
				}
				//unzip failed
				$press.addClass('hidden');
				$tips.html(LNG.updateUnzipFail);
				$button.removeClass('hidden').html(LNG.updateAutoUpdate);
			});
		}
		var downloadStart = function(){
			downloadRequest(currentVersionFile,saveTo,function(data){
				clearInterval(speedTimer);
				if (data && data.code) {
					var zipfile = data.info;
					if (zipfile.length<20) {//old version
						zipfile = saveTo+zipfile;
					}
					unzipUpdate(zipfile);
					return;
				}else if(data && data.data == 'file rename error!'){//windows: from 3.42; need "fclose"
					rename(updateZipFile+'.downloading',updateZipFile,function(data){
						if(data.code){
							unzipUpdate(updateZipFile);
						}
					});
					return;
				}
				//download error
				$press.addClass('hidden');
				$button.removeClass('hidden').html(LNG.updateAutoUpdate);
				$tips.html(LNG.updateDownloadFail);
				Tips.tips(LNG.updateDownloadFail,"error");
			});
			speedRefresh();
		}

		//??????????????????????????????????????????????????????
		fileInfo(updateZipFile,function(data,thePaht){
			if( data && data.code && //?????????
				data.data.size == versionTotalSize){
				unzipUpdate(updateZipFile);
				return;
			}
			removeFile(downloadFile);
			removeFile(updateZipFile);
			setTimeout(function(){
				downloadStart();
			},400);
		});		
	};

	var initLanguage = function(){
		var type = 'en';
		if (typeof(G["lang"]) != 'undefined') type = G["lang"];
		if (typeof(LNG["config"]) != 'undefined' && 
			typeof(LNG["config"]['type']) != 'undefined'){
			type = LNG["config"]['type'];
		}
		if (type == 'zh_CN' || type == "zh_TW" || type == "zh-TW" ) type = 'zh-CN';
		if ($.inArray(type,['en','zh-CN']) == -1) type = 'en';
		var L = {
			'en':{
				'updateDownloading':'Downloading',
				'updateDownloadSuccess':'Download success! Is decompressing update, please wait ...',
				'updateDownloadFail':'Download failed',
				'updateUnzipFail':'Unzip update failed',
				'updateCheckSupport':"Checking...",
				'updateDoing':'Updating',
				'updateTitle':"Update",
				'updateSuccess':"Update successful",
				'updateFail':"Update failed",
				'updateAutoUpdate':"Update Now",
				'updateIsNew':"Aredy is the newest",
				'updateVersionNewest':"Newest",
				'updateVersionLocal':"Current",
				'updateIgnore':"Ignore",		
				'updateReadmore':"Read more",
				'updateWhatsNew':"What's New",

				'updateSelf':"Manual update",
				'updateSelfDesc':"<h4> Manual update process: </h4><br/> <b>Method 1: </b><br/>Download the update package and manually unzip the overwrite update package to the kod installation directory. <br/><br/><b>Method 2</b>:<br/> Download the update package, upload the update package to the data directory under the program directory,And then click 'Update Now' in the update interface.",

				'updateErrorTitle':"Permission error!",
				'updateErrorDownloadPackage':"Download the update package",
				'updateErrorDesc':"Your server does not support automatic updates! <br/>Please set kod and all subdirectories to read and write and try again.",
				'updateErrorDownloadTips':"Or download the update package, manually override",
				'updateErrorWindows':"Kod directory - right properties - security - read and write permissions are all checked, and applied to all subdirectories",
				'updateInfo':updateLog['en']
			},
			'zh-CN':{
				'updateDownloading':'?????????...',
				'updateDownloadSuccess':'????????????!?????????????????????,?????????...',
				'updateDownloadFail':'????????????!',
				'updateUnzipFail':'??????????????????',
				'updateCheckSupport':"???????????????...",
				'updateDoing':'?????????...',
				'updateTitle':"????????????",
				'updateSuccess':"???????????????",
				'updateFail':"???????????????",
				'updateAutoUpdate':"????????????",
				'updateIsNew':"??????????????????",
				'updateVersionNewest':"????????????",
				'updateVersionLocal':"????????????",
				'updateIgnore':"????????????",
				'updateReadmore':"????????????",
				'updateWhatsNew':"????????????",

				'updateSelf':"????????????",
				'updateSelfDesc':"<h4>??????????????????:</h4><br/><b>?????????</b>???<br/>???????????????,??????????????????????????????kod???????????????<br/><br/><b>?????????</b>???<br/>???????????????,????????????????????????????????????data??????????????????????????????????????????????????????",

				'updateErrorTitle':"????????????!",
				'updateErrorDownloadPackage':"???????????????",
				'updateErrorDesc':"????????????????????????????????????!<br/>??????kod???????????????????????????????????????????????????.",
				'updateErrorDownloadTips':"?????????????????????,??????????????????",
				'updateErrorWindows':"kod???????????????????????????????????????????????????????????????????????????????????????,???????????????????????????",
				'updateInfo':updateLog['zh-CN']
			}
		};
		for (var key in L[type]){
			LNG[key] = L[type][key];
		}
	};

	//?????????????????????????????????
	var checkVersion = function(display){
		var keyTimeout = 'kod_updateIgnore_timeout',
			hasNew = false;
		if (parseFloat(versionServer) > parseFloat(versionLocal)) hasNew=true;
		if (kodUpdateForce && core.versionType == 'A' && hasNew==true && versionLocal < 6) hasNew=true;

		//???????????????
		var showDialog = function(){
			var id = 'check-version-dialog';
			if ($('.'+id).length==0) {
				initLanguage();
				var render = window.template.compile(tplDialogHtml);				
				var html = tplDialogCss+render({
						LNG:LNG,hasNew:hasNew,
						currentVersionFile:currentVersionFile,
						readmoreLink:readmoreLink,
						versionNew:versionServer,
						versionLocal:versionLocal
					});				
				$.dialog.through({
					id:id,
					simple:true,
					top:'50%',
					resize:false,
					width:330,
					title:LNG.updateTitle,
					padding:'0',
					fixed:true,
					content:html
				});
				$('.'+id)
					.hide()
					.fadeIn(600)
					.find('.update-start').unbind('click').bind('click',function(){
						update();
						Cookie.del(keyTimeout);
				});
				$('.'+id).find('.ignore').die('click').live('click',function(){
					//check after two days;
					Cookie.set(keyTimeout,time()+3600*24*3,24*365);
					$.dialog.list[id].close();
				});
				$('.'+id).find('.update-self-dialog').die('click').live('click',function(e){
					stopPP(e);
					updateSelf();
				});

				$('.update_goto_data').die('click').live('click',function(e){
					ui.path.list(dataPath);
					Tips.tips(dataPath);
				});
			}
		};

		if (display) showDialog();
		if (hasNew && //first run
			(Cookie.get(keyTimeout) == undefined ||
			 Cookie.get(keyTimeout) <= time())) {
			showDialog();
		}
	};
	var checkStart = function(){
		if(kodCheckUpdate) return;
		kodCheckUpdate = true;
		userState();
		if (G.isRoot != 1) return;//only admin
		//?????????????????????????????????
		if( core.isApp(['desktop','explorer']) ){
			if(window.installChannel && window.installChannel == 'hikvision.com') return;
			if(window.installChannel && window.installChannel == '35.com') return;
			if(window.installChannel && window.installChannel == 'Macrosan') return;
			if(window.installChannel && window.installChannel == 'npave.com') return;
			checkVersion(false);
		}
	};
	var userState = function(){
	    return;
		if (typeof(isCheckUpdate) != "undefined") return;
		var url = statusLink+'&version='+versionLocal+'&type='+G.isRoot;
		if( typeof(G.versionHash) != 'undefined' && 
			G.versionHash.length > 20){
			url += '&hash='+G.versionHash;
		}else{
			url += '&sid='+time();
		}
		if(window.installChannel){
			url += '&channel='+window.installChannel;
		}
		if(window.G.versionHashUser){
			url += '&hashUser='+window.G.versionHashUser;
		}
		if(window.G.kodID){
			url += '&id='+window.G.kodID;
		}
		if(window.G.userID){
			url += '&uid='+window.G.userID;
		}
		if(window.G.versionEnv){
		    url += '&env='+urlEncode(window.G.versionEnv);
		}
		requireJs(url);
		require.async(url,function(){
			isCheckUpdate = true;
			Cookie.set(kodVersionCheck,'check-at-'+time(),24);
		});
	};
	var requireJs = function(src) {
		var??head    = document.getElementsByTagName('head')[0];
		var??script  = document.createElement('script');
		script.type = 'text/javascript';
		script.src  = src;
		head.appendChild(script); 
	};
	
	var updateCheckType = "";
	var todo = function(action) {
		updateCheckType += "{"+action+"};";
		if(action == 'check'){
			checkVersion(true);
		}
	};
	var checkIE = function(){
	    if($.browser.msie && parseInt($.browser.version, 10) <= 10){
    	    art.dialog({
        		title: '????????????????????????',
        		content: '<div style="background:#fff8e3;padding:10px 30px;position:absolute;top: 0px;margin-top:40px;bottom:0px;background-image:linear-gradient(to bottom,#fff 0,#fff8e3 100%);"><h3>?????????????????????</h3><p style="color: #888;padding-top:20px;">???????????????????????????????????????,????????????????????????IE11???<br/>????????????????????????????????????Edge???Chrome???360????????????UC????????????QQ?????????????????????firefox??????</p><p style="color: #888;padding-top:20px;">????????????????????????????????????????????????????????????????????????????????????</p></div>',
        		width: 480,
        		height: 300,
        		left: '100%',
        		padding:"0",
        		top: '100%',
        		fixed: true,
        	});
	    }
	}
	
	checkIE();
	checkStart();//check version auto
	return {todo:todo};
});
