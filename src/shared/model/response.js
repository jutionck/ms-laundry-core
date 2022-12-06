const ResponseMessage = () => {
    const successMessage = (code, msg, data) => ({
        code: code,
        msg: msg,
        data: data,
    });
    const errorMessage = (code, msg) => ({
        code: code,
        msg: msg,
    });

    const pagination = (
        code, msg, data, keyword, page, totalItem, size, sortBy, sortType
    ) => {
        if (isNaN(page) || isNaN(size)) {
            page = 1, size = 10
        }
        return {
            code: code,
            msg: msg,
            data: data,
            keyword: keyword,
            sortBy: sortBy,
            sortType: sortType,
            paging : {
                page: Number(page),
                totalPages: Math.ceil(totalItem / size),
                totalRows: totalItem,
                rowsPerPage: Number(size)
            }
        }
    }

    return {
        successMessage, errorMessage, pagination
    }
}

module.exports = ResponseMessage;