const checkList = [
    new RegExp(/(<[^>]+>)/gi),
    new RegExp(/({.*?})/gi)
]
exports.detect = (str) => {
    let result = []
    checkList.forEach((reg) => {
        const rst = str.match(reg)
        if (rst && rst.length > 0) {
            result = result.concat(rst)
        }
    })
    return result
}