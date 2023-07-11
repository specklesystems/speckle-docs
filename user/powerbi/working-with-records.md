# Working with Records

In Speckle, data is organized into objects called "[Speckle Objects](/user/concepts-advanced.html#the-base-object-🟦).” These objects represent design elements, such as geometry, parameters, materials, etc. When you receive data from Speckle, they are received in the “**Record**” data type. The "**data**" column in the retrieved dataset will contain the record objects representing the Speckle objects.

Each record object contains information about a specific Speckle object, including its properties, geometry, and other relevant data. The record format allows for flexibility and extensibility, as it can accommodate various types of objects and their associated data.

This page shows you some basic techniques to access your data from the record objects. But remember, accessing methods is not limited to what we show here. [Check Power BI documentation to learn more about it.](https://learn.microsoft.com/en-us/powerquery-m/record-field)

## Extracting Values from Records

If you want to extract the value of a specific field from the received objects, you can use the lookup operator “[ ]”. Here’s how you do it:

<video autoplay muted loop>
  <source src="./img-powerbi/17-record-field.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

1. Go to “**Add Column**” tab and click on “**Custom Column**”. A dialog box will appear, where you can enter a _name_ and a _formula_ for your new column.
2. Enter a name for your new column, we’ll name it _“category”_.
3. In the formula box, you can access the fields you want using the following expression

   ```
   [data][category]
   ```

   You can replace _“category”_ with the field you want to access. If the field is not found, an error will be returned.

4. Click **OK**. A new column will be added to your table, containing the values of the “category” field from the records in the “data” column.

### Nested Records

<video autoplay muted loop>
  <source src="./img-powerbi/18-record-nested-field.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Most of the time, your data will have nested records. Accessing the fields of nested records is not much harder. Let’s say you have a parameters record that stores all the parameters and you want to get the value of one parameter.

```
data
├── id
├── category
└── parameters
├── id
├── parameter_name_1
│ ├── id
│ ├── name
│ └── value
└── parameter_name 2
├── id
├── name
└── value
```

Structure of your formula will be the following:

```
[data][parameters][parameter_name_1][value]
```

You will use this structure a lot especially if you are working with data coming from BIM applications like Revit, Archicad etc.

## Expanding Data Column

Here is what you need to do if you want to expand the fields of the records in your “data” column into separate columns:

<video autoplay muted loop>
  <source src="./img-powerbi/19-expand-data-column.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

1. Click on the **Expand icon** in the column header of your “**data**” column. It looks like two arrows pointing in opposite directions.
2. A dialog box will appear, showing you the **field names** of the records in your column. You can select which fields you want to expand or select all of them.
3. Click **OK**. The “**data**” column will be replaced by new columns, each containing the values of one field from the records.

::: warning 📌 WARNING

Expanding a record column may have some disadvantages:

- It can **increase** the size of your data model if you expand a column that contains many columns or rows, which will be the case for Speckle data in most cases. Received Records will have all the properties of the source object (a lot of field names) and this can affect the memory consumption and performance of your report if you expand all.
- It can **miss** some column names if you have different object types in your data. This is because Power BI will hard-code the column names that you select to expand, and if there is a new or different column name in the source, it will not be included in the expanded results.

:::
