"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var ArrayList = /** @class */ (function () {
    function ArrayList() {
        this.items = [];
    }
    ArrayList.prototype.add = function (item) {
        this.items.push(item);
    };
    ArrayList.prototype.get = function (index) {
        var item = this.items.filter(function (x, i) {
            return i === index;
        });
        if (item.length === 0) {
            return null;
        }
        else {
            return item[0];
        }
    };
    ArrayList.prototype.createFrom = function (value) {
        this.items = __spreadArray([], value);
    };
    ArrayList.prototype.getAll = function () {
        return this.items;
    };
    return ArrayList;
}());
var Expenses = /** @class */ (function () {
    function Expenses(currency) {
        this.count = 0;
        this.finalCurrency = currency;
        this.expenses = new ArrayList();
    }
    Expenses.prototype.add = function (item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    };
    Expenses.prototype.get = function (index) {
        return this.expenses.get(index);
    };
    Expenses.prototype.getItems = function () {
        return this.expenses.getAll();
    };
    Expenses.prototype.getTotal = function () {
        var _this = this;
        var total = this.getItems().reduce(function (acc, item) {
            return (acc += _this.convertCurrency(item, _this.finalCurrency));
        }, 0);
        return this.finalCurrency + " $" + total.toFixed(2).toString();
    };
    Expenses.prototype.remove = function (id) {
        throw new Error("Method not implemented.");
    };
    Expenses.prototype.convertCurrency = function (item, currency) {
        switch (item.cost.currency) {
            case "USD":
                switch (currency) {
                    case "SEK":
                        return item.cost.number * 10;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case "SEK":
                switch (currency) {
                    case "USD":
                        return item.cost.number / 10;
                        break;
                    default:
                        return item.cost.number;
                }
            default:
                return 0;
        }
    };
    return Expenses;
}());