module.exports = {
  entry: './scripts/selectron.jsx',
  output: {
    path: __dirname,
    filename: 'build/selectron.js',
    publicPath: '/',
    library: "Selectron",
    libraryTarget: "var"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx'},
    ]
  },
  externals: {
    "react/addons": "React",
    "underscore": "_"
  }
};
