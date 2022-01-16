// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const solveButton = document.getElementById('solveButton');
const puzzleBoard = document.getElementById('puzzle');
const squares = 81;
const solutionDisplay = document.getElementById('solution')
const submission = [];

for (var i = 0; i < squares; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', '1')
    inputElement.setAttribute('max', '9')

    if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
       )
    {
        inputElement.classList.add('odd-section')
    }

    puzzleBoard.appendChild(inputElement)
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push('.')
        }
    })

    console.log(submission)
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')

    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i]
        })

        solutionDisplay.innerHTML = 'This is the answer'
    }   else {
        solutionDisplay.innerHTML = 'This is not solvable'
    }
}



const solve = () => {

    joinValues()
    const data = submission.join('')
    console.log('data', data)

    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
            'x-rapidapi-key': 'c1c2ef4415msha5b38c6a7cc173fp16521bjsn1c96ac07f836'
        },
        data: {
            puzzle: data
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);

        populateValues(response.data.solvable, response.data.solution)

    }).catch(function (error) {
        console.error(error);
    });
}

solveButton.addEventListener('click', solve)



