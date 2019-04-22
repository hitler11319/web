/*可以自己改變，做出屬於自已的layout
  且在 jqkeyboard.js中的第31行的 LAYOUTS_LIMIT 屬性 ，記得要改大一點
  lang的命名，不要加一些( ) 這種符號 => 這個lang會變成 js 中的id 所以要注意
*/
/* English - Bulgarian */
var jqKeyboard = jqKeyboard || {};

jqKeyboard.layouts = [{
    lang: "en",
    // 1|! 就是你鍵盤上看到的， 是1 或者是 ! 當用 shift時，就變成另一個
    layout: ["`|~ 1|! 2|@ 3|# 4|$ 5|% 6|^ 7|& 8|* 9|( 0|) -|_ =|+ <<backspace>>",
            "<<tab>> q w e r t y u i o p [|{ ]|} \\||",
            "<<capslock>> a s d f g h j k l ;|: '|\" <<enter>>",
            "<<shift>> z x c v b n m ,|< .|> /|? <<shift>>",
            "<<space>>"]
}, {
    lang: "bg",
    layout: ["(|) 1|! 2|? 3|+ 4|\" 5|% 6|= 7|: 8|/ 9|\u2013 0|\u2116 -|$ .|\u20AC <<backspace>>",
            "<<tab>> ,|\u044B \u0443 \u0435 \u0438 \u0448 \u0449 \u043A \u0441 \u0434 \u0437 \u0446 ;|\u00A7",
            "<<capslock>> \u044C \u044F \u0430 \u043E \u0436 \u0433 \u0442 \u043D \u0432 \u043C \u0447 \u201E|\u201C <<enter>>",
            "<<shift>> \u045D \u044E \u0439 \u044A \u044D \u0444 \u0445 \u043F \u0440 \u043B \u0431 <<shift>>",
            "<<space>>"]
}, {
    lang: "OnlyNumber",
    layout:["1 2 3 4 5 6 7 8 9 0 <<backspace>>"]
}, {
    lang: "Grade-ch",
    layout:["甲 乙 丙 丁 <<backspace>>"]
}, {
    lang: "Grade-en",
    layout:["A B C D <<backspace>>",
            "+ -"]
}
];