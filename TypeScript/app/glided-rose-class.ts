export class Item {
  name: string;
  sellIn: number;
  quality: number;
  maxQuality: Readonly<number>;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.maxQuality = 50;
  }
  updateItem() {
    const penalty = this.sellIn > 0 ? 1 : 0;

    this.quality = Math.max(this.quality - penalty, 0);
    this.sellIn -= 1;

    return this;
  }
}

export class Sulfuras extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    this.quality = 80;
  }

  updateItem() {
    return this;
  }
}

export class AgedBrie extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateItem() {
    this.quality = Math.max(this.quality + 1, this.maxQuality);
    this.sellIn -= 1;
    return this;
  }
}

export class BackstagePasses extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateItem() {
    if (this.sellIn < 0) {
      this.quality = 0;
      return this;
    }

    switch (true) {
      case this.quality < 6:
        this.quality += 1;
      case this.quality < 11:
        this.quality += 1;
      default:
        this.quality += 1;
    }
    this.quality = Math.min(this.quality, this.maxQuality);
    return this;
  }
}

export class GildedRose {
  items: Array<Item>;
  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items = this.items.map((item) => {
      item.updateItem();

      return item;
    });

    return this.items;
  }
}
