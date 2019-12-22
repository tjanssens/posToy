using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using posToy.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace posToy.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private static readonly Product[] products = new[]
        {
          new Product()
          {
              Id=1,
              Name="Brood",
              Price=(decimal)2.3,
              Barcode="0725770276",
              ImageUrl="https://oostnl.nl/sites/default/files/styles/nieuwsfoto/public/2019-09/brood.png?itok=-RS9qtm4"
          },
           new Product()
          {
              Id=2,
              Name="Kaas",
              Price=(decimal)2.3,
              Barcode="0717491557",
              ImageUrl="https://www.nbc.nl/sites/default/files/styles/detail_page/public/kaas-280x280.jpg?itok=F2UV567Z"
          },
          new Product()
          {
              Id=3,
              Name="Butterkekse",
              Price=(decimal)4,
              Barcode="4010168013817",
              ImageUrl="data:image/jpeg;base64,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"
          },
          new Product()
          {
              Id=3,
              Name="Mayonaise",
              Price=(decimal)4,
              Barcode="8712100433863",
              ImageUrl="https://www.mangebelge.com/10857-large_default/calve-mayonnaise-oeufs-500ml.jpg"
          },
            new Product()
          {
              Id=3,
              Name="Mayonaise",
              Price=(decimal)4,
              Barcode="8712100433863",
              ImageUrl="https://www.mangebelge.com/10857-large_default/calve-mayonnaise-oeufs-500ml.jpg"
          }


        };

        private readonly ILogger<ProductController> _logger;

        public ProductController(ILogger<ProductController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return products;
        }

        [HttpGet("[action]/{barcode}")]
        public Product ByBarcode(string barcode)
        {
            return products.FirstOrDefault(x => x.Barcode == barcode);
        }
    }
}
