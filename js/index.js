//modal
$(function()　{
	// URL生成ボタンクリックイベント
	$("#URLBuildButton").click(function()　{
		var rndm_str = RandomURLCreate();
		var objURL = StringBuilder("http://www.", rndm_str, ".com");
		var objLink = StringBuilder("<a href='javascript:void(0)' id='link1'>", objURL, "</a></br>");

		if(document.getElementById("link1") == null) {
			$("body").append(objLink);
		} else {
			var changeURL = document.getElementById("link1");
			changeURL.innerHTML = objLink;
		}

		// URLクリックイベント(「a」はaタグのこと)
		$("a").click(function() {
			//body内の最後に<div id="modal-bg"></div>を挿入
			$("body").append('<div id="modal-bg"></div>');
			//画面中央を計算する関数を実行
			modalResize();
			//モーダルウィンドウを表示
			$("#modal-bg,#modal-main").fadeIn("slow");

			// ダイアログ以外をクリックしたらを閉じる
			$("#modal-bg").click(function(){
				$("#modal-main,#modal-bg").fadeOut("slow",function(){
					//挿入した<div id="modal-bg"></div>を削除
					$('#modal-bg').remove();
				});
			});
		});
	});

	//選択した国によって表示する内容を変える
	$("#select_cn").change(function() {
		var str = $('option:selected').val();	// この処理でプルダウンで選択した文字列が格納される

		ObjDestroy();
		switch (str) {
			case "日本":
				$("#modal-main").append('<p id="post_no">郵便番号：<select id="jp_selecter"> <option value="0">選択</option> <option value="1">111-2222</option> <option value="2">987-6543</option>');
				break;
			case "アメリカ":
				var testStr = "アメリカ";

				$("#modal-main").append('<p id="post_no">Address：<input type="text" name="in_post" id="in_pos_no">');

				var objTable = document.getElementById("table1");			// セルの変数
				objTable.rows[1].cells[0].innerHTML = '<input type="text" name="test1" id="test_box1">';
				objTable.rows[1].cells[1].innerHTML = '<input type="text" name="test2" id="test_box2">';
				document.getElementById("test_box1").value = testStr;		// 値設定
				document.getElementById("test_box2").value = "bbbbbbbb";	// 値設定

				break;
			default:
				break;
		}
	});

	/************************************************/
	/* オブジェクト破棄                              */
	/************************************************/
	function ObjDestroy() {
		$("#post_no").remove();
		$("#address_name").remove();
		$("#test_box1").remove();
		$("#test_box2").remove();
	}

	/************************************************/
	/* モーダルの切り替え                             */
	/************************************************/
	function changeModal(beforeModal, afterModal) {
		$('#'+beforeModal).modal('hide');
		$('#'+afterModal).modal('show');
	}

	/************************************************/
	/* ランダムURL生成                               */
	/************************************************/
	function RandomURLCreate() {
		var len = 16;
		var asset = "abcdefghijklmnopqrstuvwxyz0123456789";
		var as_len = asset.length;
		var createStr = "";

		for(let i = 0; i < len; i++){
			createStr += asset[Math.floor(Math.random()*as_len)];
		}

		return createStr;
	}

	/************************************************/
	/* 文字列作成関数                                */
	/* 引数：文字列にしたい単語(何個でもいい)          */
	/************************************************/
	function StringBuilder() {
		var arg_cnt = arguments.length;	// 引数カウント
		var argArray = [];				// 引数格納用配列

		for(let i = 0; i < arg_cnt; i++){
			argArray[i] = arguments[i];
		}
		var strURL = argArray.join('');

		return strURL;
	}

	/************************************************/
	/* ダイアログリサイズ                            */
	/************************************************/
	$(window).resize(modalResize);
	function modalResize() {
		var w = $(window).width();
		var h = $(window).height();
		
		var cw = $("#modal-main").outerWidth();
		var ch = $("#modal-main").outerHeight();

		//取得した値をcssに追加する
		$("#modal-main").css({
			"left": ((w - cw)/2) + "px",
			"top": ((h - ch)/2) + "px"
		});
	}
});