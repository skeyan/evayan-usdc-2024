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
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    /* Skip iteration if searchTerm is not defined, empty, or blank */
    if (!searchTerm.trim()) {
        console.log("WARNING: searchTerm was expected to be defined, non-empty, and non-blank, but was not.")
        return result;
    }

    /* Iterate through scanned books to perform case-sensitive search */
    for (const book of scannedTextObj ) {
        for (const bookContent of book.Content) {
            const bookContentText = bookContent.Text;

            if (bookContentText.includes(searchTerm)) {
                result.Results.push({
                    ISBN: book.ISBN,
                    Page: bookContent.Page,
                    Line: bookContent.Line,
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

const multipleBooksIn = [
    {
        "Title": "Fairy Tale",
        "ISBN": "9780000528535",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "Once upon a time, there lived a"
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "girl with golden locks. Together with 3"
            },
            {
                "Page": 1,
                "Line": 3,
                "Text": "bears, she ate lots of good delicious food in"
            }
        ]
    },
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

const otherLanguageIn = [
    {
        "Title": "过故人庄",
        "ISBN": "9780000528538",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "故人具鸡黍，"
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "邀我至田家。"
            },
            {
                "Page": 1,
                "Line": 3,
                "Text": "绿树村边合，Some English text"
            },
        ]
    }
];

/**
 * Helper that prints out unit test results to compare expected versus actual results for
 * comparing object values in JSON responses.
 *
 * The JSON response test passes if:
 * - SearchTerm is equal
 * - Same number of Results objects (can be 0)
 * - The ISBN, Page, and Line values in each Results object (if any) is the same
 *
 * @param {JSON} testResult - JSON object representing the result of the test search.
 * @param {JSON} expectedResult - JSON object representing the correct expected result.
 * @returns {Void} Prints failure or success message as well as both parameters.
 */
function compareResultJson(testResult, expectedResult) {
    if (JSON.stringify(testResult == JSON.stringify(expectedResult))) {
        console.log("PASS");
        return;
    }

    console.log("FAIL");
    console.log("Expected:", expectedResult);
    console.log("Received:", testResult);
    return;
}

/**
 * Helper that prints out unit test results to compare expected versus actual results for
 * comparing length of results.
 *
 * A numeric length comparison test passes if:
 * - Lengths are equal
 *
 * @param {Number} testResult - Number representing the result of the test search.
 * @param {Number} expectedResult - Number representing the correct expected result.
 * @returns {Void} Prints failure or success message as well as both parameters.
 */
function compareResultLengths(testResult, expectedResult) {
    if (testResult.SearchTerm !== expectedResult.SearchTerm) {
        console.log("FAIL");
        console.log("Expected:", expectedResult);
        console.log("Received:", testResult);
        return;
    }

    if (expectedResult === testResult) {
        console.log("PASS");
    } else {
        console.log("FAIL");
        console.log("Expected:", expectedResult);
        console.log("Received:", testResult);
    }
    return;
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
    console.log("Now testing: testLowerCaseSearchTermReturnsCorrectResults");
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

    compareResultJson(testResult, expectedResult);
}

/** We could choose to check that we get the right number of results. */
function testLowerCaseSearchTermReturnsCorrectNumberOfResults() {
    console.log("Now testing: testLowerCaseSearchTermReturnsCorrectNumberOfResults");
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

    compareResultLengths(testResult.Results.length, expectedResult.Results.length);
}

/** We can check that, given a known capitalized input, we get a known output. */
function testCapitalizedSearchTermReturnsCorrectResults() {
    console.log("Now testing: testCapitalizedSearchTermReturnsCorrectResults");
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

    compareResultJson(testResult, expectedResult);
}

/** We can check that, given a search term with more than one word, it matches correctly */
function testSearchTermWithMultipleWordsReturnsCorrectResults() {
    console.log("Now testing: testSearchTermWithMultipleWordsReturnsCorrectResults");
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

    compareResultJson(testResult, expectedResult);
}

/** We can check that, given multiple books in the input, we return the correct results */
function testSearchTermReturnsCorrectResultsWithMultipleBooksAsInput() {
    console.log("Now testing: testSearchTermReturnsCorrectResultsWithMultipleBooksAsInput");
    const testResult = findSearchTermInBooks("good", multipleBooksIn);
    const expectedResult =  {
        "SearchTerm": "good",
        "Results": [
            {
                "ISBN": "9780000528531",
                "Line": 9,
                "Page": 31,
            },
            {
                "ISBN": "9780000528535",
                "Line": 3,
                "Page": 1,
            }
        ]
    };

    compareResultJson(testResult, expectedResult);
}

/** We can check that, given a search term, it can successfully match at the start of a line */
function testSearchTermMatchesStartOfStringCorrectly() {
    console.log("Now testing: testSearchTermMatchesStartOfStringCorrectly");
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

    compareResultJson(testResult, expectedResult);
}

/** We can check that, given a search term, it can successfully match at the end of a string */
function testSearchTermMatchesEndOfStringCorrectly() {
    console.log("Now testing: testSearchTermMatchesEndOfStringCorrectly");
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

    compareResultJson(testResult, expectedResult);
}

/** We can check that given a search term with an apostrophe, it is matched correctly */
function testSearchTermWithApostropheReturnsCorrectResults() {
    console.log("Now testing: testSearchTermWithApostropheReturnsCorrectResults");
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

    compareResultJson(testResult, expectedResult);
}

/** We can check that a search term matches correctly when located next to punctuation */
function testSearchTermReturnsCorrectResultsWhenNextToPunctuation() {
    console.log("Now testing: testSearchTermReturnsCorrectResultsWhenNextToPunctuation");
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

    compareResultJson(testResult, expectedResult);
}

/** We can check that a search term matches correctly when the search term starts with punctuation */
function testSearchTermReturnsCorrectResultsWhenStartingWithPunctuation() {
    console.log("Now testing: testSearchTermReturnsCorrectResultsWhenStartingWithPunctuation");
    const testResult = findSearchTermInBooks(".  The", twentyLeaguesIn);
    const expectedResult =  {
        "SearchTerm": ".  The",
        "Results": [
            {
                "ISBN": "9780000528531",
                "Page": 31,
                "Line": 8
            }
        ]
    };

    compareResultJson(testResult, expectedResult);
}

/** We can check that a single input with no content lines returns no matches */
function testSearchTermReturnsNoResultsWhenSingleInputHasNoContent() {
    console.log("Now testing: testSearchTermReturnsNoResultsWhenSingleInputHasNoContent");
    const testResult = findSearchTermInBooks("profound", singleInputEmptyContentIn);
    const expectedResult =  {
        "SearchTerm": "profound",
        "Results": []
    };

    compareResultJson(testResult, expectedResult);
}

/** We can check that completely empty input returns no matches */
function testSearchTermReturnsNoResultsWhenInputIsEmpty() {
    console.log("Now testing: testSearchTermReturnsNoResultsWhenInputIsEmpty");
    const testResult = findSearchTermInBooks("profound", emptyBookMatchesIn);
    const expectedResult =  {
        "SearchTerm": "profound",
        "Results": []
    };

    compareResultJson(testResult, expectedResult);
}

/** We can check that a search in another language returns correct results */
function testSearchTermReturnsCorrectResultsInAnotherLanguage() {
    console.log("Now testing: testSearchTermReturnsCorrectResultsInAnotherLanguage");
    const testResult = findSearchTermInBooks("故人", otherLanguageIn);
    const expectedResult =  {
        "SearchTerm": "故人",
        "Results": [
            {
                "ISBN": "9780000528538",
                "Page": 1,
                "Line": 1
            }
        ]
    };

    compareResultJson(testResult, expectedResult);
}

/** We can check that a search term with multiple languages returns correct results */
function testMixedLanguageSearchTermReturnsCorrectResults() {
    console.log("Now testing: testMixedLanguageSearchTermReturnsCorrectResults");
    const testResult = findSearchTermInBooks("绿树村边合，Some", otherLanguageIn);
    const expectedResult =  {
        "SearchTerm": "绿树村边合，Some",
        "Results": [
            {
                "ISBN": "9780000528538",
                "Page": 1,
                "Line": 3
            }
        ]
    };

    compareResultJson(testResult, expectedResult);
}

/** Function to consolidate and run all unit tests in order */
function runTests() {
    console.log("TESTING: POSITIVE CASES");
    // Basic positive cases
    testLowerCaseSearchTermReturnsCorrectResults();
    testLowerCaseSearchTermReturnsCorrectNumberOfResults();
    testCapitalizedSearchTermReturnsCorrectResults();
    testSearchTermWithMultipleWordsReturnsCorrectResults();
    testSearchTermReturnsCorrectResultsWithMultipleBooksAsInput();

    // Edge cases - Punctuation
    console.log("TESTING: PUNCTUATION");
    testSearchTermMatchesStartOfStringCorrectly();
    testSearchTermMatchesEndOfStringCorrectly();
    testSearchTermWithApostropheReturnsCorrectResults();
    testSearchTermReturnsCorrectResultsWhenNextToPunctuation();
    testSearchTermReturnsCorrectResultsWhenStartingWithPunctuation();

    // Edge cases - Basic negative cases
    console.log("TESTING: NEGATIVE CASES");
    testSearchTermReturnsNoResultsWhenSingleInputHasNoContent();
    testSearchTermReturnsNoResultsWhenInputIsEmpty();

    // Edge cases - Other Languages
    console.log("TESTING: Other LANGUAGES");
    testSearchTermReturnsCorrectResultsInAnotherLanguage();
    testMixedLanguageSearchTermReturnsCorrectResults();
}

/** Run test suite */
runTests();