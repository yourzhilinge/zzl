  // 商品增加
  function add() {
    $(".num").html(++n)
}
// 商品减少
function del() {
    if (n) {
        $(".num").html(--n)
    }
}

