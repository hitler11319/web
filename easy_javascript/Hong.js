/************************************ 我自己的共用 JS函式 **********************************/

// location.href = url
function GoToUrl(url) {
    location.href = url;
}

// 加入 紅 * 號
function AddRequiredMark(ele) {
    if ($(ele).attr("required") == "required") {
        var label = $(ele).parent().parent().find("label")[0];

        // 不要多好幾個 紅色*號  (下面的雖然是單引號，但append上去 style那後面是 雙引號)
        if (label.innerHTML.indexOf('<span style="color:red;">  *  </span>') < 0) {
            label.innerHTML = "<span style='color:red;'>  *  </span>" + label.innerHTML;
        }
    }
}

// 組出錯誤訊息
function MakeErrorMessage(errorMessageList) {
    var result = "";

    for (var i = 0, l = errorMessageList.length; i < l; i++) {
        var v = errorMessageList[i];
        result += "<h3 style='color:red;'>" + v + "</h3>";
    }

    return result;
}

// 叫出 錯誤訊息 (單筆)
function CallErrorMessage(title, message) {
    OpenCommonModal(title, "<span style='color:red;'>" + message + "</span>");
}

// 設定 Modal 為置中顯示
function SetModalInMiddle(id) {
    // 先切成置中
    var $modal_dialog = $(id).find('.modal-dialog');
    //獲取可視視窗的高度  
    var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    console.log(clientHeight);

    // 要再加上 Scroll 移了多少
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    console.log(scrollTop);

    // 因為下面會除2 (但其實這是個實際多出的值，不該除到那麼多)
    clientHeight += scrollTop * 1.6;  

    //得到dialog的高度
    var dialogHeight = $modal_dialog.height() * 1.15;  // 讓 Modal 大一點，那下面 m_top 就會上面一點了
    console.log(dialogHeight);

    //計算出距離頂部的高度
    var m_top = (clientHeight - dialogHeight) / 2;
    console.log(m_top);
    $modal_dialog.css({ 'margin': m_top + 'px auto' });
}

// 開啟Modal
function OpenModal(modalID) {
    // 組出 id
    var id = '#' + modalID;

    // 設定Modal置中
    SetModalInMiddle(id);

    // 開啟 Modal
    //{"backdrop":"static"}點選背景不會消失  
    $(id).modal({ "backdrop": "static" }).modal('show');

    // 想讓背景可以有捲軸
    document.body.style.overflowY = "scroll";
}

// 關閉Modal
function CloseModal(modalID) {
    $("#" + modalID).modal('hide');
}

// 開啟共用 Modal
function OpenCommonModal(title, htmlBody, clickFunc) {
    document.getElementById("CommonModalTitle").innerHTML = title;
    document.getElementById("CommonModalBody").innerHTML = htmlBody;

    // 執行 要執行的函式
    if (!!clickFunc) {
        $("#CommonModalBtn").click(function () {
            clickFunc();

            // 要記得清掉自己
            this.click = function () { return; };
        })
    }

    OpenModal("CommonModal");
}

// 開啟 請稍等 Modal
function OpenWaitModal() {
    OpenModal("CommonWaitModal");
}

// 關閉 請稍等 Modal
function CloseWaitModal() {
    CloseModal("CommonWaitModal");
}

// 只能輸入數字
function OnlyInputNum(obj) {
    obj.value = obj.value.replace(/[^\d]/g, "");
}

// 只能輸入英文
function OnlyInputEng(obj) {
    obj.value = obj.value.replace(/[^a-zA-Z]/g, "");
}

// 只能輸入 英文 + 數字
function OnlyInputEngOrNum(obj) {
    obj.value = obj.value.replace(/[^\W]/g, "");
}

// 只能是中文字
function OnlyInputChi(obj) {
    obj.value = obj.value.replace(/[^\u4E00-\u9FA5]/g, "");
}

// 去除中文字
function RemoveChi(v) {
    return v.replace(/[\u4E00-\u9FA5]/g, "");
}

// 只能輸入 中文 + 數字
function OnlyInputChiOrNum(obj) {
    obj.value = obj.value.replace(/[^\u4E00-\u9FA5\d]/g, "");
}

// 只能輸入電話 (即 只能有 ( 、) 、 # 、 - 、 數字)
function OnlyInputTel(obj) {
    obj.value = obj.value.replace(/[^\d\(\)#-]/g, "");

    // 只能出現一次 ( 、 ) 、 #
    obj.value = obj.value.replace(/\({2,}/g, "("); //保證只有出現一個 (
    obj.value = obj.value.replace("(", "$#$").replace(/\(/g, "").replace("$#$", "("); //保證 ( 只出現一次，而不能出現兩次以上

    obj.value = obj.value.replace(/\){2,}/g, ")"); //保證只有出現一個 )
    obj.value = obj.value.replace(")", "$#$").replace(/\)/g, "").replace("$#$", ")"); //保證 ) 只出現一次，而不能出現兩次以上

    obj.value = obj.value.replace(/\#{2,}/g, "#"); //保證只有出現一個 #
    obj.value = obj.value.replace("#", "$*$").replace(/\#/g, "").replace("$*$", "#"); //保證 # 只出現一次，而不能出現兩次以上

    // - 最多只能出現 2個 (02-1111-2222)
    var tmp = obj.value.split("-");
    if (tmp.length > 3) {
        var v = tmp[0] + "-" + tmp[1] + "-" + tmp[2];
        for (var i = 3, l = tmp.length; i < l; i++) {
            v += tmp[i];
        }
        obj.value = v;
    }

    // 確定 ) 在 ( 之後
    var i1 = obj.value.indexOf("(");
    var i2 = obj.value.indexOf(")");

    // 如果沒有 (  就把 ) 去掉
    if (i1 < 0) { obj.value = obj.value.replace(")", ""); }

    // 如果 ) 在 ( 之前 就把括號都拿掉
    if (i2 >= 0) {
        if (i1 > i2) {
            obj.value = obj.value.replace(")", "");
            obj.value = obj.value.replace("(", "");
        }
    }
}

// 只能輸入 手機 (即 只能有 ( 、 ) 、 - 、 數字)
function OnlyInputPhone(obj) {
    obj.value = obj.value.replace(/[^\d\(\)-]/g, "");

    // 只能出現一次 ( 、 ) 、 #
    obj.value = obj.value.replace(/\({2,}/g, "("); //保證只有出現一個 (
    obj.value = obj.value.replace("(", "$#$").replace(/\(/g, "").replace("$#$", "("); //保證 ( 只出現一次，而不能出現兩次以上

    obj.value = obj.value.replace(/\){2,}/g, ")"); //保證只有出現一個 )
    obj.value = obj.value.replace(")", "$#$").replace(/\)/g, "").replace("$#$", ")"); //保證 ) 只出現一次，而不能出現兩次以上

    // - 最多只能出現 2個 (0922-234-221)
    var tmp = obj.value.split("-");
    if (tmp.length > 3) {
        var v = tmp[0] + "-" + tmp[1] + "-" + tmp[2];
        for (var i = 3, l = tmp.length; i < l; i++) {
            v += tmp[i];
        }
        obj.value = v;
    }

    // 確定 ) 在 ( 之後
    var i1 = obj.value.indexOf("(");
    var i2 = obj.value.indexOf(")");

    // 如果沒有 (  就把 ) 去掉
    if (i1 < 0) { obj.value = obj.value.replace(")", ""); }

    // 如果 ) 在 ( 之前 就把括號都拿掉
    if (i2 >= 0) {
        if (i1 > i2) {
            obj.value = obj.value.replace(")", "");
            obj.value = obj.value.replace("(", "");
        }
    }
}

//驗證數字
function VaildNum(v) {
    re = /^\d+$/;
    return re.test(v);
}

// 驗證英文
function VaildEng(v) {
    re = /^[a-zA-Z]+$/;
    return re.test(v);
}

// 驗證 英文 + 數字
function VaildEngOrNum(v) {
    re = /^\w+$/;
    return re.test(v);
}

// 驗證 中文
function VaildChi(v) {
    re = /^[\u4E00-\u9FA5]+$/;
    return re.test(v);
}

// 驗證 中文 + 數字
function VaildChiOrNum(v) {
    re = /^[\u4E00-\u9FA5\d]+$/;
    return re.test(v);
}

// 驗證身份證
function VaildIdn(v) {
    re = /^[a-zA-Z][1-2]\d{8}$/;
    return re.test(v);
}

// 驗證 Mail
function VaildMail(v) {
    re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    return re.test(v);
}

// 驗證電話
function VaildTel(v) {
    re = /^(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}$/;
    return re.test(v);
}

// 驗證電話 (有加上 # 分機號碼的)
function VaildTel2(v) {
    var tmp = v.split("#");
    var len = tmp.length;

    if (len > 2) { return false; }
    else {
        if (len == 1) { return VaildTel(v); }
        else {
            // 確保分機後面 只有 1-6碼
            var after = tmp[1];
            var aLen = after.length;

            if (aLen <= 0 || aLen >= 7) { return false; }
            else {
                var before = tmp[0];
                return VaildTel(before) && VaildNum(after);
            }
        }
    }
}

// 驗證手機
function VaildPhone(v) {
    re = /^(09\d{2}|\(09\)\d{2})(\d{6}|-\d{3}-\d{3})$/;
    return re.test(v);
}

// 是否函有中文
function IsContainChi(v) {
    return escape(v).indexOf("%u") != -1;
}

// 最大長度限制
function VaildMaxLen(v, maxLen) {
    return v.length <= maxLen;
}

// 最小長度限制
function VaildMinLen(v, minLen) {
    return v.length >= minLen;
}

// 長度限制
function VaildLen(v, minLen, maxLen) {
    return VaildMinLen(v, minLen) && VaildMaxLen(v, maxLen);
}

// 結束時間要大於等於開始時間
function VaildEndDateOverStartDate(startDate, endDate) {
    if (!!startDate && !!endDate) {
        var s = new Date(startDate);
        var e = new Date(endDate);

        return e >= s;
    }
    else {
        return false;
    }
}

// 得到 Radio 被 Checked的值
function GetRadioCheckedValue(radioName) {
    return $("input[type='radio'][name='" + radioName + "']:checked").val();
}

// 用於序列化 Form 傳回 Form 
function SerializeForm(formID) {

    // 用像是  Ajax 上傳檔案的方式來接
    var form_data = new FormData();

    var $this = $("#" + formID);
    if (!($this)) { return form_data; }
    
    // 序列化
    var arr = $this.serializeArray();

    arr.map(function (el) {
        // 這邊會加 model. 的原因是 controller 長這樣
        // public ActionResult xxx (xxxModel model){}  => 這個model. 就是 model 變數，然後裡面的值  
        form_data.append(el.name, el.value);
    });

    return form_data;
}

// 公用 叫用 Ajax 的語法 (要客製自己再寫)
// 會自動開啟 WaitModal 喔
function AjaxForm(type, url, async, form_data, successFunc) {
    OpenWaitModal();

    // 等個幾秒再送(先讓 WaitModal 出現)
    setTimeout(function () {
        $.ajax({
            type: type,
            url: url,
            async: async,
            contentType: false,
            processData: false,
            data: form_data,
            success: function (response) {
                CloseWaitModal();  // 關閉 請等待
                successFunc(response);
            }
        });
    }, 250);
}

// 除了 Form 外的 Ajax
function AjaxOther(type, url, async, form_data, successFunc) {
    OpenWaitModal();

    // 等個幾秒再送(先讓 WaitModal 出現)
    setTimeout(function () {
        $.ajax({
            type: type,
            url: url,
            async: async,
            data: form_data,
            success: function (response) {
                CloseWaitModal();  // 關閉 請等待
                successFunc(response);
            }
        });
    }, 250);
}

// 下載檔案
function DownloadFile(type, url, nameList, valueList) {
    var form = $('<form></form>');
    form.attr("method", type);
    form.attr("action", url);

    var haveValue = true;
    var valueLength = valueList.length;
    for (var i = 0, l = nameList.length; i < l; i++) {
        if (i >= valueLength) {
            haveValue = false;
        }

        // 2個都有值才丟
        if (haveValue) {
            var nV = nameList[i];
            var vV = valueList[i];
            var v = $('<input name="' + nV + '" value="' + vV + '" type="hidden"></input>');
            form.append(v);
        }
    }

    $(document.body).append(form);
    form.submit();
}

// DataTable by obj
function DateTableByObj(obj, paginate = true, searching = false, info = false, fixedHeader = true, sort = true, pageType = "full_numbers", autoWidth = true) {
    // 使用 DataTable.js 的分頁功能
    $(obj).DataTable({
        "bPaginate": paginate, // 顯示換頁，預設為true
        "searching": searching, // 顯示搜尋，預設為true
        "info": info, // 顯示資訊，預設為true
        "fixedHeader": fixedHeader, // 標題置頂，預設為false
        "bSort": sort, //排序(如果false，就欄位全不排序，如果想各別設定 請參考 https://blog.csdn.net/zhuyu19911016520/article/details/43666963)
        "pagingType": pageType,  // 分頁方式
        "autoWidth": autoWidth
    });
}

// DateTable by  id
function DateTableById(id, paginate = true, searching = false, info = false, fixedHeader = true, sort = true, pageType = "full_numbers", autoWidth = true) {
    // 使用 DataTable.js 的分頁功能
    var obj = document.getElementById(id);
    DateTableByObj(obj, paginate, searching, info, fixedHeader, sort, pageType, autoWidth);
}