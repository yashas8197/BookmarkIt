document.querySelector('#bookmarkForm').addEventListener('submit', saveBookmark)
function saveBookmark(e) {
  const siteName = document.querySelector('#siteName')
  const siteUrl = document.querySelector("#siteUrl")
  const validationContainer = document.querySelector("#validationContainer")

  if (!siteName.value || !siteUrl.value) {
    validationContainer.innerHTML = "Please fill the form"
    return false
  }

  let bookmark = {
    name: siteName.value,
    url: siteUrl.value
  }

  let bookmarks = []

  if (localStorage.getItem('bookmarks') === null) {
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  } else {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }
  e.preventDefault()
  fetchBookMark()
}



function deleteBookmark(url) {
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {

      bookmarks.splice(i, 1)
      localStorage.removeItem(bookmarks[i])
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  fetchBookMark()
}

function fetchBookMark() {

  let bookmarkList = JSON.parse(localStorage.getItem('bookmarks')) || []
  let bookmarkResult = document.querySelector("#bookmarkResult")
  bookmarkResult.innerHTML = " "


  for (let i = 0; i < bookmarkList.length; i++) {
    bookmarkResult.innerHTML += `
    <li class="list-group-item m-1 bg-light p-3 d-flex justify-content-between"">
        <h2>${bookmarkList[i].name}</h2>
        <div>
        <a class="btn btn-default bg-secondary m-1" target="_blank" href="${bookmarkList[i].url}">Visit</a>
        <button class="btn btn-danger m-1" onClick = "deleteBookmark('${bookmarkList[i].url}')">DELETE</button>
        </div>
    </li>
        `
  }

}
