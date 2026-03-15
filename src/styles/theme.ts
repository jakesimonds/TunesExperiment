export const colors = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#F5F5F5',
  textSecondary: '#AAAAAA',
  border: '#333333',
  accent: '#BB86FC',
};

export const spacing = {
  rowVertical: 18,
  rowHorizontal: 20,
};

export const typography = {
  folderName: {
    fontSize: 22,
    fontWeight: '600' as const,
    color: colors.text,
  },
  trackName: {
    fontSize: 20,
    fontWeight: '400' as const,
    color: colors.text,
  },
};
