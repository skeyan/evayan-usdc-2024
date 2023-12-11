/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
     /** A search term is required to perform a search */
    if(!searchTerm) {
        console.log("Please enter a search term.");
        return {};
    }

    const formattedSearchTerm = searchTerm.trim();

    var result = {
        "SearchTerm": formattedSearchTerm,
        "Results": []
    };

    for (let i = 0; i < scannedTextObj.length; i++) {
        const currentBook = scannedTextObj[i];

        for (let j = 0; j < currentBook.Content.length; j++) {
            const currentBookContent = currentBook.Content[j];
            const currentBookText = currentBookContent.Text;

            // Escape special characters in the search string to allow punctuation search
            const escapedSearchTerm = formattedSearchTerm.replace(/[.*+?^${}()|[\]\\]/, "\\$&");

            // Create a regular expression using word boundaries, with case sensitivity
            const regex = new RegExp("\\b" + escapedSearchTerm + "\\b");

            // Test if the target string contains the search string
            if(regex.test(currentBookText)) {
                result.Results.push({
                    ISBN: currentBook.ISBN,
                    Page: currentBookContent.Page,
                    Line: currentBookContent.Line,
                });
            }
        }
    }

    return result;
}

 /*
  _   _ _____ _     ____  _____ ____  ____
 | | | | ____| |   |  _ \| ____|  _ \/ ___|
 | |_| |  _| | |   | |_) |  _| | |_) \___ \
 |  _  | |___| |___|  __/| |___|  _ < ___) |
 |_| |_|_____|_____|_|   |_____|_| \_\____/
 */

 /** Test mocks */
 const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
];

const singleInputEmptyContentIn = [
    {
        "Title": "Single Input With No Content Lines",
        "ISBN": "9780000528532",
        "Content": []
    }
];

const emptyBookMatchesIn = [];

function isMatchingLine(testLineMatch, expectedLineMatch) {
    return (
        testLineMatch.ISBN === expectedLineMatch.ISBN &&
        testLineMatch.Page === expectedLineMatch.Page &&
        testLineMatch.Line === expectedLineMatch.Line
    );
}

/**
 * Print out unit test results to compare expected versus actual results.
 * A length comparison test passes if:
 * - Lengths are equal
 *
 * A JSON response test passes if:
 * - SearchTerm is equal
 * - Same number of Results objects (can be 0)
 * - Results objects are in same order (Results object is an array)
 * - The ISBN, Page, and Line values in each Results object (if any) is the same
 *
 * @param {JSON | number} testResult - JSON object or number representing the result of the test search.
 * @param {JSON | number} expectedResult - JSON object or number representing the correct expected result.
 * @param {String} testIdentifier - String to identify the test; e.g. the name of the test.
 * @returns {Void} Prints failure or success message as well as both parameters.
 */
function printTestResults(testResult, expectedResult, testIdentifier) {
    console.log("Now testing:", testIdentifier);

    if (testResult.SearchTerm !== expectedResult.SearchTerm) {
        console.log("FAIL");
        console.log("Expected:", expectedResult);
        console.log("Received:", testResult);
        return;
    }

    if (typeof expectedResult === 'number') {
        if (expectedResult === testResult) {
            console.log("PASS");
        } else {
            console.log("FAIL");
            console.log("Expected:", expectedResult);
            console.log("Received:", testResult);
        }
        return;
    }

    /** Note: JSON.stringify may fail on complex objects due to reordering of keys */
    const testResultLineMatches = testResult.Results;
    const expectedResultLineMatches = expectedResult.Results;

    if (testResultLineMatches.length !== expectedResultLineMatches.length) {
        console.log("FAIL");
        console.log("Expected:", expectedResult);
        console.log("Received:", testResult);
        return;
    }

    expectedResultLineMatches.find(expectedLineMatch => {
        const testLineMatch = testResultLineMatches.find(testLineMatch =>
            isMatchingLine(testLineMatch, expectedLineMatch)
        );

        if (!(testLineMatch)) {
            console.log("FAIL");
            console.log("Expected:", expectedResultLineMatches);
            console.log("Received:", testResultLineMatches);
            return false;
        }
    });

    console.log("PASS");
}


/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___|
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/
*/

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known lowercase input, we get a known output. */
function testLowerCaseSearchTermReturnsCorrectResults() {
    const testResult = findSearchTermInBooks("he", twentyLeaguesIn);
    const expectedResult =  {
        "SearchTerm": "he",
        "Results": [
            {
                "ISBN": "9780000528531",
                "Page": 31,
                "Line": 10
            }
        ]
    };

    printTestResults(testResult, expectedResult, "testLowerCaseSearchTermReturnsCorrectResults");
}

/** We could choose to check that we get the right number of results. */
function testLowerCaseSearchTermReturnsCorrectNumberOfResults() {
    const testResult = findSearchTermInBooks("the", twentyLeaguesIn);
    const expectedResult =  {
        "SearchTerm": "the",
        "Results": [
            {
                "ISBN": "9780000528531",
                "Page": 31,
                "Line": 9
            }
        ]
    };

    printTestResults(testResult.Results.length, expectedResult.Results.length, "testLowerCaseSearchTermReturnsCorrectNumberOfResults");
}

/** We can check that, given a known capitalized input, we get a known output. */
function testCapitalizedSearchTermReturnsCorrectResults() {
    const testResult = findSearchTermInBooks("The", twentyLeaguesIn);
    const expectedResult =  {
        "SearchTerm": "The",
        "Results": [
            {
                "ISBN": "9780000528531",
                "Page": 31,
                "Line": 8
            }
        ]
    };

    printTestResults(testResult, expectedResult, "testCapitalizedSearchTermReturnsCorrectResults");
}

/**
 * We can check that, given a search term, we do not match when it is partially in another word
 * Example: "then" is not a match for "the".
*/
function testSearchTermDoesNotMatchAsSubstring() {
    const testResult = findSearchTermInBooks("the", twentyLeaguesIn);
    const expectedResult =  {
        "SearchTerm": "the",
        "Results": [
            {
                "ISBN": "9780000528531",
                "Page": 31,
                "Line": 9
            }
        ]
    };

    printTestResults(testResult, expectedResult, "testSearchTermDoesNotMatchAsSubstring");
}

/** We can check that, given a search term with more than one word, it matches correctly */
function testSearchTermWithMultipleWordsReturnsCorrectResults() {
    const testResult = findSearchTermInBooks("asked myself", twentyLeaguesIn);
    const expectedResult =  {
        "SearchTerm": "asked myself",
        "Results": [
            {
                "ISBN": "9780000528531",
                "Line": 10,
                "Page": 31,
            }
        ]
    };

    printTestResults(testResult, expectedResult, "testSearchTermWithMultipleWordsReturnsCorrectResults");
}

/** We can check that, given a search term, it can successfully match at the start of a line */
function testSearchTermMatchesStartOfStringCorrectly() {
    const testResult = findSearchTermInBooks("eyes", twentyLeaguesIn);
    const expectedResult =  {
        "SearchTerm": "eyes",
        "Results": [
            {
                "ISBN": "9780000528531",
                "Page": 31,
                "Line": 10
            }
        ]
    };

    printTestResults(testResult, expectedResult, "testSearchTermMatchesStartOfStringCorrectly");
}

/** We can check that, given a search term, it can successfully match at the end of a string */
function testSearchTermMatchesEndOfStringCorrectly() {
    const testResult = findSearchTermInBooks("and", twentyLeaguesIn);
    const expectedResult =  {
        "SearchTerm": "and",
        "Results": [
            {
                "ISBN": "9780000528531",
                "Page": 31,
                "Line": 9
            },
            {
                "ISBN": "9780000528531",
                "Page": 31,
                "Line": 10
            }
        ]
    };

    printTestResults(testResult, expectedResult, "testSearchTermMatchesEndOfStringCorrectly");
}

/** We can check that given a search term with an apostrophe, it is matched correctly */
function testSearchTermWithApostropheReturnsCorrectResults() {
    const testResult = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
    const expectedResult =  {
        "SearchTerm": "Canadian's",
        "Results": [
            {
                "ISBN": "9780000528531",
                "Page": 31,
                "Line": 9
            }
        ]
    };

    printTestResults(testResult, expectedResult, "testSearchTermWithApostropheReturnsCorrectResults");
}

/** We can check that a search term matches correctly when located next to punctuation */
function testSearchTermReturnsCorrectResultsWhenNextToPunctuation() {
    const testResult = findSearchTermInBooks("profound", twentyLeaguesIn);
    const expectedResult =  {
        "SearchTerm": "profound",
        "Results": [
            {
                "ISBN": "9780000528531",
                "Page": 31,
                "Line": 9
            }
        ]
    };

    printTestResults(testResult, expectedResult, "testSearchTermReturnsCorrectResultsWhenNextToPunctuation");
}

/** We can check that a single input with no content lines returns no matches */
function testSearchTermReturnsNoResultsWhenSingleInputHasNoContent() {
    const testResult = findSearchTermInBooks("profound", singleInputEmptyContentIn);
    const expectedResult =  {
        "SearchTerm": "profound",
        "Results": []
    };

    printTestResults(testResult, expectedResult, "testSearchTermReturnsNoResultsWhenSingleInputHasNoContent");
}

/** We can check that completely empty input returns no matches */
function testSearchTermReturnsNoResultsWhenInputIsEmpty() {
    const testResult = findSearchTermInBooks("eyes", emptyBookMatchesIn);
    const expectedResult =  {
        "SearchTerm": "eyes",
        "Results": []
    };

    printTestResults(testResult, expectedResult, "testSearchTermReturnsNoResultsWhenInputIsEmpty");
}


/** Function to consolidate and run all unit tests in order */
function runMainTests() {
    // Basic cases
    testLowerCaseSearchTermReturnsCorrectResults();
    testLowerCaseSearchTermReturnsCorrectNumberOfResults();
    testCapitalizedSearchTermReturnsCorrectResults();
    testSearchTermDoesNotMatchAsSubstring();
    testSearchTermWithMultipleWordsReturnsCorrectResults();

    // Edge cases - Punctuation
    testSearchTermMatchesStartOfStringCorrectly();
    testSearchTermMatchesEndOfStringCorrectly();
    testSearchTermWithApostropheReturnsCorrectResults();
    testSearchTermReturnsCorrectResultsWhenNextToPunctuation();

    // Edge cases - Empty Objects
    testSearchTermReturnsNoResultsWhenSingleInputHasNoContent();
    testSearchTermReturnsNoResultsWhenInputIsEmpty();
}

/** Run test suite */
runMainTests();