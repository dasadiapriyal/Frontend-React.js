const isEmpty = (data) => data === null || data === undefined || (typeof data === "object" && Object.keys(data).length === 0) || data.length === 0

export default isEmpty
