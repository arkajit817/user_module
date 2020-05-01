const _ = require('lodash');

const leftAsides = require('../utils/leftAsides');

const getLeftAsides = function (roles) {
    let dict = {};
    let userLeftAsides = JSON.parse(JSON.stringify(leftAsides.Portal));

    asideItems = userLeftAsides.aside.items;

    _.forEach(roles, role => {
        _.forEach(role.can, resource => {
            if (!_.has(dict, resource)) {
                dict[resource] = true;
            }
        })
    })
    for (let i = asideItems.length - 1; i >= 0; i--) {
        let submenu = asideItems[i].submenu;
        let title = asideItems[i].title;

        if (title == "Project") {
            if (!_.has(dict, "PROJECT::READ") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "PROJECT::CREATE") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }
        } else if (title == "Approval") {
            if (!_.has(dict, "APPROVAL::READ") && !_.has(dict, "ALL")) {
                submenu.splice(3, 1);
            }
            if (!_.has(dict, "APPROVAL::READ") && !_.has(dict, "ALL")) {
                submenu.splice(2, 1);
            }
            if (!_.has(dict, "APPROVAL::READ") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "APPROVAL::CREATE") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }
        } else if (title == "Design") {
            if (!_.has(dict, "DESIGN::READ") && !_.has(dict, "ALL")) {
                submenu.splice(2, 1);
            }
            if (!_.has(dict, "DESIGN::READ") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "DESIGN::CREATE") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "Finance") {
            if (!_.has(dict, "FINANCE::READ") && !_.has(dict, "ALL")) {
                submenu.splice(5, 1);
            }
            if (!_.has(dict, "FINANCE::UPDATE") && !_.has(dict, "ALL")) {
                submenu.splice(4, 1);
            }
            if (!_.has(dict, "FINANCE::READ") && !_.has(dict, "ALL")) {
                submenu.splice(3, 1);
            }
            if (!_.has(dict, "FINANCE::UPDATE") && !_.has(dict, "ALL")) {
                submenu.splice(2, 1);
            }
            if (!_.has(dict, "FINANCE::UPDATE") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "FINANCE::UPDATE") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "Scoping") {
            if (!_.has(dict, "DOCUMENT::UPLOAD") && !_.has(dict, "ALL")) {
                submenu.splice(4, 1);
            }
            if (!_.has(dict, "SCOPE::READ") && !_.has(dict, "ALL")) {
                submenu.splice(3, 1);
            }
            if (!_.has(dict, "SCOPE::READ") && !_.has(dict, "ALL")) {
                submenu.splice(2, 1);
            }
            if (!_.has(dict, "SCOPE::CREATE") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "SCOPE::READ") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "Store") {
            if (!_.has(dict, "STORE::READ") && !_.has(dict, "ALL")) {
                submenu.splice(5, 1);
            }
            if (!_.has(dict, "STORE::CREATE") && !_.has(dict, "ALL")) {
                submenu.splice(4, 1);
            }
            if (!_.has(dict, "STORE::CREATE") && !_.has(dict, "ALL")) {
                submenu.splice(3, 1);
            }
            if (!_.has(dict, "STORE::CREATE") && !_.has(dict, "ALL")) {
                submenu.splice(2, 1);
            }
            if (!_.has(dict, "STORE::READ") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "STORE::READ") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "Procurement") {
            if (!_.has(dict, "PROCUREMENT::READ") && !_.has(dict, "ALL")) {
                submenu.splice(3, 1);
            }
            if (!_.has(dict, "PROCUREMENT::UPDATE") && !_.has(dict, "ALL")) {
                submenu.splice(2, 1);
            }
            if (!_.has(dict, "PROCUREMENT::CREATE") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "PROCUREMENT::READ") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "Service Order") {
            if (!_.has(dict, "SERVICEORDER::READ") && !_.has(dict, "ALL")) {
                submenu.splice(2, 1);
            }
            if (!_.has(dict, "SERVICEORDER::CREATE") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "SERVICEORDER::READ") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }
        } else if (title == "Inwarding") {
            if (!_.has(dict, "INWARDING::READ") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "Vendors") {
            if (!_.has(dict, "VENDOR::MAP") && !_.has(dict, "ALL")) {
                submenu.splice(2, 1);
            }
            if (!_.has(dict, "VENDOR::CREATE") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "VENDOR::READ") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }
        } else if (title == "Master Management") {
            if (!_.has(dict, "ALL")) {
                submenu.splice(8, 1);
                submenu.splice(7, 1);
                submenu.splice(6, 1);
                submenu.splice(5, 1);
                submenu.splice(4, 1);
                submenu.splice(3, 1);
                submenu.splice(2, 1);
                submenu.splice(1, 1);
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }
        } else if (title == "Pricing") {
            if (!_.has(dict, "ALL")) {
                submenu.splice(3, 1);
                submenu.splice(2, 1);
                submenu.splice(1, 1);
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "User Management") {
            if (!_.has(dict, "ALL")) {
                submenu.splice(3, 1);
                submenu.splice(2, 1);
                submenu.splice(1, 1);
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "Snag") {
            if (!_.has(dict, "SNAG::UPDATE") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "SNAG::UPDATE") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "Mapped Site") {
            if (!_.has(dict, "MAPPEDSITE::UPDATE") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "MAPPEDSITE::READ") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "Report") {
            if (!_.has(dict, "ALL")) {
                submenu.splice(2, 1);
                submenu.splice(1, 1);
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "Customer") {
            if (!_.has(dict, "ALL")) {
                submenu.splice(4, 1);
            }
            if (!_.has(dict, "ALL")) {
                submenu.splice(3, 1);
            }
            if (!_.has(dict, "ALL")) {
                submenu.splice(2, 1);
            }
            if (!_.has(dict, "LEAD::READ") && !_.has(dict, "ALL")) {
                submenu.splice(1, 1);
            }
            if (!_.has(dict, "LEAD::CREATE") && !_.has(dict, "ALL")) {
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }

        } else if (title == "Users") {
            if (!_.has(dict, "ALL")) {
                submenu.splice(2, 1);
                submenu.splice(1, 1);
                submenu.splice(0, 1);
            }
            if (submenu.length == 0) {
                asideItems.splice(i, 1);
            }
        }
    }
    return userLeftAsides;
}


const getLeftAsidesForRio = function (roles) {
    let userLeftAsides = JSON.parse(JSON.stringify(leftAsides.Rio));
    return userLeftAsides;
}

module.exports = { getLeftAsides: getLeftAsides, getLeftAsidesForRio: getLeftAsidesForRio }
