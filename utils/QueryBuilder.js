module.exports = class QueryBuilder {
	constructor(dbQuery, queryObj) {
		this.dbQuery = dbQuery
		this.queryObj = queryObj
	}

	// ?room_price[lt]=200 (all query params that aren't excluded will be used to filter results)
	filter() {
		// filter by everything in a query, except for these, because these are used by other methods
		const excludedFields = ['sort', 'fields', 'limit', 'page']
		// make a copy of query object and remove excluded params
		let currentQuery = { ...this.queryObj }
		excludedFields.forEach((el) => { delete currentQuery[el] })

		let queryStr = JSON.stringify(currentQuery)
		// add $ sign at these special mongoose params ex. turns {"room_price":{"lt":"200"}} to {"room_price":{"$lt":"200"}}
		queryStr = queryStr.replace(/(gte|gt|lte|lt)/g, match => `$${match}`)

		this.dbQuery = this.dbQuery.find(JSON.parse(queryStr))

		return this
	}

	// ?sort=field1,field2 (comma separated fields to sort by)
	sort() {
		if (this.queryObj.sort) {
			this.dbQuery = this.dbQuery.sort(this.#toSpacedString(this.queryObj.sort) + ' _id')
		}

		return this
	}

	// ?fields=first_name,last_name (selects only specified fields)
	selectFields() {
		if (this.queryObj.fields) {
			this.dbQuery = this.dbQuery.select(this.#toSpacedString(this.queryObj.fields))
		} else {
			this.dbQuery = this.dbQuery.select('-__v')
		}

		return this
	}

	// ?page=2 (get a specified page of records)
	paginate() {
		const page = parseInt(this.queryObj.page) || 1
		const limit = parseInt(this.queryObj.limit) || 10
		const skip = (page - 1) * limit

		this.dbQuery = this.dbQuery.skip(skip).limit(limit)

		return this
	}

	#toSpacedString(str) {
		return str.split(',').join(' ')
	}
}