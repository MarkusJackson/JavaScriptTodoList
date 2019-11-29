class TodoColumn {


    constructor(title, date) {
        this.title = title;
        this.id = Math.random();
        this.todos = new Array();
        if (date) {
            this.date = date;
        } else {
            this.date = new Date();
        }
    }
}
