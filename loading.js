function removeLoading(){
    document.getElementById('loadingScreen').style.display = 'none';
}

function loadingAnimation0() {
  document.getElementById('loadingText').innerText = 'loading';
  setTimeout(loadingAnimation1, 200)
}
function loadingAnimation1() {
    document.getElementById('loadingText').innerText = 'loading.'
    setTimeout(loadingAnimation2, 200)
}
function loadingAnimation2() {
    document.getElementById('loadingText').innerText = 'loading..'
    setTimeout(loadingAnimation3, 200)
}
function loadingAnimation3() {
    document.getElementById('loadingText').innerText = 'loading...'
    setTimeout(loadingAnimation0, 200)

}