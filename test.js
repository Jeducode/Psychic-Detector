let count = 0;

function cc(card) {
  // Only change code below this line

  for (let i = 0; i < card.length; i++) {
    if (
      card[i] === 2 ||
      card[i] === 3 ||
      card[i] === 4 ||
      card[i] === 5 ||
      card[i] === 6
    ) {
      count = count + 1;
    } else if (card[i] === 7 || card[i] === 8 || card[i] === 9) {
      count = count + 0;
    } else {
      count = count - 1;
    }
  }

  return "Change Me";
  // Only change code above this line
}

cc(2);
cc(3);
cc(7);
cc("K");
cc("A");
