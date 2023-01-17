import { hand } from "./texas-holdem"

test("Hand with no winning cards scores *nothing* and ranks with A,K descending...", () => {
    expect(hand(['K♠','A♦'], ['J♣','Q♥','9♥','2♥','3♦'])).toEqual({type:'nothing', ranks:['A','K','Q','J','9']})});

// test("", () => {
//     expect(removeSuits([])).toEqual([])
// });

// test("", () => {
//     removeValues([]).toEqual([])
// });

// test("", () => {
//     checkForFlush([]).toEqual([])
// });

// test("", () => {
//     removeStraight([]).toEqual([])
// });

// test("", () => {
//     countOccurrences([]).toEqual([])
// })

// describe('Execute Example Tests', function(){
// 	it('Let\'s play!', function(){
// 		assertEquals(,);
// 		assertEquals({type:'pair', ranks:['Q','K','J','9']},hand(['K♠','Q♦'],['J♣','Q♥','9♥','2♥','3♦']));
// 		assertEquals({type:'two pair', ranks:['K','J','9']},hand(['K♠','J♦'],['J♣','K♥','9♥','2♥','3♦']));
// 		assertEquals({type:'three-of-a-kind', ranks:['Q','J','9']},hand(['4♠','9♦'],['J♣','Q♥','Q♠','2♥','Q♦']));
// 		assertEquals({type: 'straight', ranks:['K','Q','J','10','9']},hand(['Q♠','2♦'],['J♣','10♥','9♥','K♥','3♦']));
// 		assertEquals({type:'flush', ranks:['Q','J','10','5','3']},hand(['A♠','K♦'],['J♥','5♥','10♥','Q♥','3♥']));
// 		assertEquals({type:'full house', ranks:['A','K']},hand(['A♠','A♦'],['K♣','K♥','A♥','Q♥','3♦']));
// 		assertEquals({type:'four-of-a-kind', ranks:['2','3']},hand(['2♠','3♦'],['2♣','2♥','3♠','3♥','2♦']));
// 		assertEquals({type:'straight-flush', ranks:['J','10','9','8','7']},hand(['8♠','6♠'],['7♠','5♠','9♠','J♠','10♠']));
// 	});
// });