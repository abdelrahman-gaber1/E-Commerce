// Simple middleware for handling exceptions inside of async express routes
//  and passing them to your express error handlers.
const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/ApiError");

const ApiFeature = require("../utils/apiFeature");

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deleteDocument = await Model.findByIdAndDelete(id);
    if (!deleteDocument) {
      return next(new ApiError(`No Document for this id ${id}`, 404));
    }
    res.status(204).send();
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const updateDocument = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateDocument) {
      return next(
        new ApiError(`No Document for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: updateDocument });
  });

const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json({ data: newDocument });
  });

const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const Document = await Model.findById(id);
    if (!Document) {
      return next(new ApiError(`No Document for this id ${id}`, 404));
    }
    res.status(200).json({ data: Document });
  });

const getAll = (Model, modelName) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObject) {
      filter = req.filterObject;
    }
    // Build Query
    const documentsCount = await Model.countDocuments();
    const apiFeature = new ApiFeature(Model.find(filter), req.query)
      .sort()
      .search(modelName)
      .filter()
      .paginate(documentsCount)
      .limitFields();
    // Execute Query
    const { mongooseQuery, paginationResult } = apiFeature;
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ result: documents.length, paginationResult, data: documents });
  });

module.exports = { deleteOne, updateOne, createOne, getOne, getAll };
