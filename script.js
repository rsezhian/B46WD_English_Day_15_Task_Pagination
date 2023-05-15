let myTableDataDiv = document.createElement("div");
myTableDataDiv.classList.add("tableData");
myTableDataDiv.innerHTML = " ";

//
let CurrentPage = 1;
const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = Math.ceil(100 / ITEMS_PER_PAGE);

function prev_Page() {
  if (CurrentPage > 1) {
    changePage(CurrentPage - 1);
  }
}

function next_Page() {
  if (CurrentPage < TOTAL_PAGES) {
    changePage(CurrentPage + 1);
  }
}

function changePage(num) {
  if (num < 1) num = 1;
  if (num > TOTAL_PAGES) num = TOTAL_PAGES;

  var startPoint = (num - 1) * TOTAL_PAGES;
  var endPoint = num * TOTAL_PAGES;

  CurrentPage = num;
  fetchData(startPoint, endPoint);

  if (num === 1) {
    document.getElementById("prev").style.visibility = "hidden";
  } else {
    document.getElementById("prev").style.visibility = "visible";
  }

  if (num === TOTAL_PAGES) {
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }
}

//
//
//
//
//
//
// Function Fetch data
function fetchData(start, end) {
  const API_URL =
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";

  const url = `${API_URL}?page=${CurrentPage}&results=${ITEMS_PER_PAGE}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      //
      let myTableDataTable = document.createElement("table");
      myTableDataTable.classList.add("dataTable");
      myTableDataTable.id = "dataTable";
      let myTableDataTHead = document.createElement("thead");
      let myTableDataTBody = document.createElement("tbody");

      let myTableTBodyRow = document.createElement("tr");
      let myTableTBodyThead1 = document.createElement("th");
      myTableTBodyThead1.innerHTML = "SL.No:";
      let myTableTBodyThead2 = document.createElement("th");
      myTableTBodyThead2.innerHTML = "Person Name";
      let myTableTBodyThead3 = document.createElement("th");
      myTableTBodyThead3.innerHTML = "Person E-Mail";

      myTableDataDiv.append(myTableDataTable);
      myTableDataTable.append(myTableDataTHead, myTableDataTBody);
      myTableDataTHead.append(myTableTBodyRow);
      myTableTBodyRow.append(
        myTableTBodyThead1,
        myTableTBodyThead2,
        myTableTBodyThead3
      );

      //
      //Display the fetched data on the UI
      for (let i = start; i < end; i++) {
        let tr2 = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = data[i]["id"];
        let td2 = document.createElement("td");
        td2.innerHTML = data[i]["name"];
        let td3 = document.createElement("td");
        td3.innerHTML = data[i]["email"];

        tr2.append(td1, td2, td3);
        myTableDataTBody.append(tr2);
      }
    })
    .catch((error) => console.error(error));
  console.log(cur_page);
}

//
//
//
//
//
var d = document.createElement("div");
d.setAttribute("class", "anchorlist");

var prev = document.createElement("a");
prev.href = `javascript:prev_Page()`;
prev.id = "prev";
prev.innerHTML = "&laquo;";

var next = document.createElement("a");
next.href = `javascript:next_Page()`;
next.id = "next";
next.innerHTML = "&raquo;";

var arr = createAnchorList();

function createAnchorList() {
  var ar = [];
  for (let i = 1; i <= 10; i++) {
    var a = document.createElement("a");
    a.href = `javascript:changePage(${i})`;
    a.innerHTML = i;
    if (i === 1) {
      a.setAttribute("class", "active");
    }
    ar.push(a);
  }
  return ar;
}

var myPagHeading = document.createElement("div");
myPagHeading.innerHTML = "Pagination - DOM Manipulation";
myPagHeading.classList.add("heading");
//
//
//
//
document.body.append(myPagHeading, myTableDataDiv, d);
d.append(
  prev,
  arr[0],
  arr[1],
  arr[2],
  arr[3],
  arr[4],
  arr[5],
  arr[6],
  arr[7],
  arr[8],
  arr[9],
  next
);

changePage(1);
