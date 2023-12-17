const axios = require('axios');
const Keyword=require('../models/keywordModel')

const search = async (req, res) => {
    try {
      const searchTerm = req.params.searchTerm;
      const wikiData = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchTerm}&format=json&srprop=snippet&srinfo=suggestion&srnamespace=0&srwhat=text&srenablerewrites=1&srlimit=10&srlang=en`);
      const pages = wikiData.data.query.search.map(result => {
        if (result.snippet.toLowerCase().includes('pronunciation') || result.snippet.toLowerCase().includes('pronounced')) {
          result.snippet = ''; 
        }
        return result;
      });
  
      await Keyword.create({ keyword: searchTerm });
  
      res.json(pages.filter(page => page.snippet !== '')); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  

const slug = async (req, res) => {
    try {
      const pageSlug = req.params.slug;
      const wikiPage = await axios.get(`https://en.wikipedia.org/w/api.php?action=parse&page=${pageSlug}&format=json`);
      const pageContent = wikiPage.data.parse.text['*']; 
      
      res.json({ title: pageSlug, content: pageContent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


module.exports = {search,slug,analytics}