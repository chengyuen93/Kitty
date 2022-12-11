export const provideTags = (resultsWithIds, id_name, tagType) => {
  if (resultsWithIds) {
    const ret = [{ type: tagType, id: 'LIST' }];
    resultsWithIds.forEach(result => {
      ret.push({ type: tagType, id: result[id_name] });
    });
    return ret;
  }

  return [{ type: tagType, id: 'LIST' }];
};
