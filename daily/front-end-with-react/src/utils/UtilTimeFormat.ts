class UtilTimeFormat {
    private year: number;
    private month: number;
    private date: number;
    private hour: number;
    private minute: number;
    private second: number;

    public constructor(seconds: number, millisecond : boolean = false) {
        if(!millisecond){
            seconds *= 1000;
        }
        const date = new Date(seconds);
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.date = date.getDate();
        this.hour = date.getHours();
        this.minute = date.getMinutes();
        this.second = date.getSeconds();
    }

    public dateTime = () => {
        return [
            this.year.toString(),
            this.complete(this.month),
            this.complete(this.date)
        ].join('-');
    }
    public timestamp = () => {
        const time = [
            this.complete(this.hour),
            this.complete(this.minute),
            this.complete(this.second)
        ].join(':');
        return `${this.dateTime()} ${time}`;
    }
    private complete = (value: number) => value < 10 ? `0${value}` : value.toString();
}

export default UtilTimeFormat;