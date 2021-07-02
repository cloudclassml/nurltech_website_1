
jQuery(function($){

	require.config({
		baseUrl: poster_img.uri + '/static/js',
		urlArgs: 'ver=' + poster_img.ver,
		waitSeconds: 0,
		paths: {
			'qrcode'        : 'jquery.qrcode.min',
			'poster'        : 'poster'
		},
		shim: {
			'poster': { 
			exports: 'poster',
				},
		}
	});
	// 海报按钮 JS 代码
	$('[data-event="poster-popover"]').on('click', function(){
		$('.poster-popover-mask, .poster-popover-box').fadeIn()
	});
	$('[data-event="poster-close"]').on('click', function(){
		$('.poster-popover-mask, .poster-popover-box').fadeOut()
	});

	// 海报生成
	if( $('.post-poster').length ){
		require(['poster','qrcode'],function(poster,qrcode){    // 使用了 require.min.js 按需加载 JS ，如果主题未使用 RequireJS 修改为其他方式加载 jquery.qrcode.min.js 即可
			// 通过 jquery.qrcode.min.js 生成二维码
			$('.poster-qrcode').qrcode({
				render: "canvas", 
				width: 200,
				height: 200,
				text: window.location.href
			});
			var qrcanvas = $('.poster-qrcode canvas')[0];//二维码所在的canvas
			var qrcode_img = convertCanvasToImage(qrcanvas)
			function convertCanvasToImage(canvas) {
				var canvas;
				var image = new Image();
				canvas ? image.src = canvas.toDataURL("image/png"): "" ;
				return image;
			}

			// 获取文章标题
			post_title = poster_img.post_title;    // 自动获取文档标题

			// 获取文章摘要信息
			post_desc = poster_img.excerpt ? poster_img.excerpt : '暂时没有描述信息！';    // 自动获取文章摘要信息，根据自己网站修改获取摘要方式即可
			// 获取文章Meta信息
			post_meta = '由 @'+poster_img.author+' 发布在《'+poster_img.cat_name+'》栏目';

			// 获取文章发布时间 / 年-月
			post_time_ym = poster_img.time_y_m;
			// 获取文章发布时间 / 日
			post_time_d = poster_img.time_d;

			// 获取站点描述信息
			site_desc = poster_img.site_motto ? poster_img.site_motto : '君子坦荡荡，小人常戚戚';    // 自动获取网站描述信息，根据自己网站修改获取网站描述方式即可

			poster.init({
				selector: '.poster-popover-box',
				// 图片链接
				bgimg: poster_img.bgimgurl, // 背景图片
				banner: poster_img.att_img,
				logo: poster_img.logo_pure,    // 自动获取网站 Logo 图标，修改为自己网站图标地址即可
				qrcode: qrcode_img['src'],
				// 文章标题
				title: post_title,
				titleStyle:{
					font: 'bold normal 29px Arial',
					color: 'rgba(66, 66, 66, 1)',
					position: 'left',
					lineHeight: 1.4,
					maxHeight: 70,
				},
				//文章摘要
				content: post_desc,
				contentStyle:{
					font: 'normal 24px Arial',
					color: 'rgba(88, 88, 88, 1)',
					position: 'left',
					lineHeight: 1.5,
					maxHeight: 174,
				},
				// 文章Meta
				postmeta: post_meta,
				postmetaStyle:{
					font: 'normal 24px Arial',
					color: 'rgb(255, 167, 0)',
					position: 'left',
					lineHeight: 1.5,
					maxHeight: 72,
				},
				// 文章发布时间 / 年-月
				posttimeym: post_time_ym,
				posttimeymStyle:{
					font: 'normal 30px Arial',
					color: 'rgba(255, 255, 255, 1)',
					position: 'left',
				},
				// 文章发布时间 / 日
				posttimed: post_time_d,
				posttimedStyle:{
					font: 'italic bold 70px Arial',
					color: 'rgba(255, 255, 255, 1)',
					position: 'left',
				},
				// logo标语
				description: site_desc,
				descriptionStyle:{
					font: 'normal 24px Arial',
					color: 'rgba(88, 88, 88, 1)',
					position: 'left',
					lineHeight: 1.3,
					maxHeight: 72,
				},
				
				callback: posterDownload
			});
			
			function posterDownload(container){
				if(container == null) {return;}
				const $btn = container.querySelector('.poster-download')
				const $img = container.querySelector('img')
				$btn.setAttribute('href', $img.getAttribute('src'));
			};
		});
	};
	// 分享海报 END

});