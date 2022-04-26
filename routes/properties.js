const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Property = require("../schemas/property");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.get("/", async (req, res) => {
   const url = new URL(req.url, "http://www.example.com");

  let page = url.searchParams.get("page")
    ? Number(url.searchParams.get("page"))
    : 1;

  let itemsPerPage = url.searchParams.get("itemsPerPage")
    ? Number(url.searchParams.get("itemsPerPage"))
    : 3;

  if (page < 1) page = 1;

  const properties = await Property.find()
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage);
  const totalProperties = await Property.count();
  res.send({
    properties,
    totalPages: Math.ceil(totalProperties / itemsPerPage),
    currentItemsPerPage: itemsPerPage,
  });
});

router.get("/:id", async (req, res) => {
  const property = await Property.findOne({ _id: req.params.id });
  if (property) {
    res.send(property);
  } else {
    res.status(404).send({ message: "property Not Found" });
  }
});

router.post("/addproperty", async (req, res) => {
  const body = req.body;
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    typeOfProperty: Joi.string().required(),
    saleType: Joi.string().required(),
    saleStatus: Joi.string().required(),
    images: Joi.array().required(),
    video: Joi.string(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    neighborhood: Joi.string().required(),
    size: Joi.number().min(1).required(),
    rooms: Joi.number().min(1).required(),
    bedrooms: Joi.number().min(1).required(),
    bathrooms: Joi.number().min(1).required(),
    garages: Joi.string().required(),
    yearBuilt: Joi.number().required(),
    available: Joi.number().required(),
    basement: Joi.string().required(),
    extraDetails: Joi.string().required(),
    roofing: Joi.string().required(),
    floorNumber: Joi.number().min(1).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.send(error.message);
  } else {
    const newProperty = new Property({
      title: body.title,
      description: body.description,
      price: Number(body.price),
      typeOfProperty: body.typeOfProperty,
      saleType: body.saleType,
      saleStatus: body.saleStatus,
      images: body.images,
      video: body.video,
      city: body.city,
      address: body.address,
      neighborhood: body.neighborhood,
      size: Number(body.size),
      rooms: Number(body.rooms),
      bedrooms: Number(body.bedrooms),
      bathrooms: Number(body.bathrooms),
      garages: body.garages,
      yearBuilt: body.yearBuilt,
      available: body.available,
      basement: body.basement,
      extraDetails: body.extraDetails,
      roofing: body.roofing,
      floorNumber: Number(body.floorNumber),
    });
    await newProperty.save();
    res.send(newProperty);
  }
});

module.exports = router;
