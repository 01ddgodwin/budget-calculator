export class Expenses {
    public id: string;
    public amount: string;
    public description: string;
    public category: string;
    // public children: string;
  
    constructor(id: string, amount: string, description: string, category: string ) {
      this.id = id;
      this.amount = amount;
      this.description = description;
      this.category = category;
      // this.children = children;
    }
  }
  