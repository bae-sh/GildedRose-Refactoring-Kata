export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  maxQuality: Readonly<number>;
  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.maxQuality = 50;
  }

  updateSulfuras(item: Item) {
    return item;
  }

  updateAgedBrie(item: Item) {
    item.quality = Math.max(item.quality + 1, this.maxQuality);
    item.sellIn -= 1;

    return item;
  }
  updateBackstagePasses(item: Item) {
    if (item.sellIn < 0) {
      item.quality = 0;
      return item;
    }

    switch (true) {
      case item.quality < 6:
        item.quality += 1;
      case item.quality < 11:
        item.quality += 1;
      default:
        item.quality += 1;
    }
    item.quality = Math.min(item.quality, this.maxQuality);
    return item;
  }
  updateNormalItem(item: Item) {
    const penalty = item.sellIn > 0 ? 1 : 0;

    item.quality = Math.max(item.quality - penalty, 0);
    item.sellIn -= 1;

    return item;
  }
  updateQuality() {
    this.items = this.items.map((item) => {
      const { name, quality, sellIn } = item;
      const updatedItem = new Item(name, quality, sellIn);

      switch (name) {
        case "Aged Brie":
          return this.updateAgedBrie(updatedItem);
        case "Backstage passes to a TAFKAL80ETC concert":
          return this.updateBackstagePasses(updatedItem);
        case "Sulfuras, Hand of Ragnaros":
          return this.updateSulfuras(updatedItem);
        default:
          return this.updateNormalItem(updatedItem);
      }
    });

    return this.items;
  }
}
