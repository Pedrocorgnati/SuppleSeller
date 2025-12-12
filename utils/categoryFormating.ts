// helper function for converting URL category name to friendly and more readable name
// For example "whey-protein" after this function will be "whey protein"
const formatCategoryName = (categoryName: string) => {
  const categoryNameArray = categoryName.split("-");
  return categoryNameArray.join(" ");
};

// helper function for converting category name to URL category name
// For example "whey protein" after this function will be "whey-protein"
const convertCategoryNameToURLFriendly = (categoryName: string) => {
  const categoryNameArray = categoryName.split(" ");
  return categoryNameArray.join("-");
};

export { formatCategoryName, convertCategoryNameToURLFriendly };
