const get_all_cards = (domain) => {
  const cards_wrapper = domain.getElementsByClassName("grid grid-cols-1 grid-rows-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 2.5xl:grid-cols-6 4xl:grid-cols-7 gap-x-3 gap-y-6 3xl:gap-6")[0];

  if (cards_wrapper) return cards_wrapper.children;
};

const get_price_paid = (card) => {
  try {
    const row = card.getElementsByClassName("flex flex-row justify-between mb-1 px-1")[0];

    const value = row.children[1].children[0].children[0].children[1].innerHTML;

    if (value) {
      return parseFloat(value.replace("&nbsp;", ""));
    }
  } catch (error) {
    console.log("Unable to calculate price paid for : ", card);
  }
};

const get_3_days_avg = (card) => {
  try {
    const row = card.getElementsByClassName("flex flex-row justify-between mb-1 px-1")[0];
    const value = row.children[0].children[0].children[1].innerHTML;

    if (value) {
      return parseFloat(value.replace("&nbsp;", ""));
    }
  } catch (error) {
    console.log("Unable to calculate 3 days avg for : ", card);
  }
};

const get_floor_price = (card) => {
  try {
    const row = card.getElementsByClassName("flex flex-row justify-between mb-1 px-1")[0];
    const value = row.children[2].children[0].children[1].innerHTML;

    if (value) {
      return parseFloat(value.replace("&nbsp;", ""));
    }
  } catch (error) {
    console.log("Unable to calculate floor price for : ", card);
  }
};

const get_evolution_rate = (y1, y2) => {
  return ((y2 - y1) / y1) * 100;
};

const is_div_existing = (id) => {
  return !!document.getElementById(id);
}

const create_item_div = (card_index, label, value) => {
  const item_div = document.createElement("div");
  const label_div = document.createElement("div");
  const value_div = document.createElement("div");
  
  const label_text = document.createTextNode(label);
  const value_text = document.createTextNode(isNaN(value) ? "--" : value.toFixed(1) + "%");

  label_div.appendChild(label_text);
  value_div.appendChild(value_text);

  label_div.className = "text-xs";
  value_div.style.color = isNaN(value) || value === 0 ? "inherit" : value > 0 ? "green" : "red";

  item_div.appendChild(label_div);
  item_div.appendChild(value_div);

  item_div.className = "text-center";
  item_div.id = label + card_index;

  return item_div;
}

const create_differences_label = (card_index, price_paid, floor_price, three_days_avg) => {
  const is_diff_existing = is_div_existing("differences" + card_index);
  const is_fp_diff_existing = is_div_existing("Floor Price diff" + card_index);
  const is_tda_diff_existing = is_div_existing("3 days avg diff" + card_index);

  if (!is_diff_existing || !is_fp_diff_existing || !is_tda_diff_existing) {
    const fp_diff = get_evolution_rate(price_paid, floor_price);
    const tda_diff = get_evolution_rate(price_paid, three_days_avg);

    const diff_div = document.createElement("div");
    const fp_div = create_item_div(card_index, "Floor Price diff", fp_diff);
    const tda_div = create_item_div(card_index, "3 days avg diff", tda_diff);
  
    if (!is_fp_diff_existing)  diff_div.appendChild(fp_div);
    if (!is_tda_diff_existing) diff_div.appendChild(tda_div);

    diff_div.id = "differences" + card_index;
    diff_div.className = "flex justify-around p-2";

    return diff_div;
  }
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const cards = get_all_cards(mutation.target);

    if (cards) {
      Array.from(cards).forEach((card, index) => {
        const price_paid = get_price_paid(card);
        const floor_price = get_floor_price(card);
        const three_days_avg = get_3_days_avg(card);

        if (price_paid || floor_price || three_days_avg) {
          if (price_paid < floor_price) {
            card.style.border = "2px solid green";
          } else if (price_paid > floor_price) {
            card.style.border = "2px solid red"
          } else {
            card.style.border = "2px solid gray";
          }

          const difference_row = create_differences_label(index, price_paid, floor_price, three_days_avg);
          if (difference_row) card.children[0].appendChild(difference_row);
        }
      })
    }
  });
});
observer.observe(document.body, { subtree: true, childList: true });