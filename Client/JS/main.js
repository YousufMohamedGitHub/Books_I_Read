

$(document).ready(() => {
    
    ShowBooks();
    $('#ADDBOOK').on('click', (e) => {
       
        AddBooks();
        
     });

     


});
function ShowBooks(){
axios.get('/api/books')
    .then( (res) => {
console.log(res.data);
        let books = res.data;
        let output = '';

        $.each(books, (index, book) => {
            output += `
                <div class="col-4"> 
                <div class="well text-center">
                <img src= ${book.img_url}>

                <h5 class="mt-5">${book.title}</h5>
                <button onclick="BookSelected('${book._id}')" class="btn btn-primary mb-5">Details</button>
                </div>
                
                </div>
            
            
            
            `;
        });

        $('#books').html(output);
    })
    .catch( (err) => {
        console.log(err);
    })
    
}


function AddBooks() {

    // Validate all fields are entered 
var errorCount = 0;
  $('#AddBookFields input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });


if (errorCount === 0) {
    axios.post('/api/books', {
      title: document.getElementById('Title').value,
      author: document.getElementById('Author').value,
      genre: document.getElementById('Genre').value,
      publisher: document.getElementById('Publisher').value,
      pages: document.getElementById('PageCount').value,
      img_url: document.getElementById('ImageURL').value,
      buy_url: document.getElementById('BuyURL').value,
      description: document.getElementById('Description').value,
      
        
    }).then((response) => {
        $('#AddBookFields  input').val('');
        $('#AddBookFields  textarea').val('');

        alert('Book Successfully Added');
      }, (error) => {
        console.log(error);
      });

    }

    
  else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
    
      
}

function BookSelected(id) {
    sessionStorage.setItem('BookId', id);
    window.location = 'Book.html';
    return false;
}

function GetBook() {

    let BookId = sessionStorage.getItem('BookId');

    axios.get('/api/books/' + BookId)
    .then( (res) => {
console.log(res.data);
        let book = res.data;
        let output = `
        <div class="row">

        <div class="col-md-4">
        <img src="${book.img_url}" class="thumbnail">
        </div>

        <div class="col-md-8">
        <h2>${book.title}</h2>
        <ul class="list-group">
        <li class="list-group-item"> <strong>Genre:</strong>   ${book.genre}</li>
        <li class="list-group-item"> <strong>Author:</strong>   ${book.author}</li>
        <li class="list-group-item"> <strong>Page Count:</strong>   ${book.pages}</li>
        <li class="list-group-item"> <strong>Publisher:</strong>   ${book.publisher}</li>
        </ul>
        </div>

        </div>
        <br>
        <div class="row">
        <div class="well">
        <h3>Description</h3>

        ${book.description}
        <hr>
        <a href=${book.buy_url} target="_blank" class="btn btn-primary">Buy</a>
        <button onclick="DeleteBook()" class="btn btn-primary">Delete</button>
        </div>
        </div>
        
        
        `

        $('#book').html(output);
    })
    .catch( (err) => {
        console.log(err);
    })

}

function DeleteBook(){

    let BookId = sessionStorage.getItem('BookId');
    axios.delete('/api/books/' + BookId)
    .then( (res) => {
        alert('Book Deleted')
        window.location = 'index.html';
    })
    .catch( (err) => {
        console.log(err);
    })
}