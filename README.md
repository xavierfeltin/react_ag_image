# Generate an image from a reference using a Genetic Algorithm

This project was mainly the occasion to start using React. To do so, I thought what kind of fun things I may do with it.
This reflexion took me one more time on Genetic Algorithm and I wondered if it was possible to rebuild an image from another one using a set of polygons.
 
As usual, I tried to make the project severless so I could take advantage of Github Pages to make the result easily available.

The website is available at [https://xavierfeltin.github.io/react_ag_image/](https://xavierfeltin.github.io/react_ag_image/) (Chrome "only")

## Global approach

First of all, a little remainder on genetic algorithms: [https://towardsdatascience.com/introduction-to-optimization-with-genetic-algorithm-2f5001d9964b](https://towardsdatascience.com/introduction-to-optimization-with-genetic-algorithm-2f5001d9964b)

For this subject, I needed to know if it has been aleady the playgrounds to other people and potentially a research field. Of course, it has been.
And it looked pretty trickery. Especially all the image comparison mathematics.

Since the main purpose was to discover React, I left the mathematics to external libraries which have already done the work and way better that I could have handled by myself in a respectful amount of time.

The application is using a web worker to delegate the processing outside of the main javascript thread to avoid blocking the user interface.

For the simulation, the application uses OffscreenCanvas to make the rendering in memory. This functionality is fully available to only a few of browsers. If you wish to try it out, I recommend you to use Chrome.

The application is articulated around three points:
- The original image loaded from its url
- The genetic algorithm configuration
- The simulation result displayed for each generation:
  - The image drawn from the polygons of the best individual
  - The simulation information (score, time of processing, ...)

## Fitness function
Here are the three different way to compute the similarity between two images used in this project :
- [Ssim library](https://github.com/obartra/ssim): it computes a score based on the structural similarity of the images.
- [Pixelmatch library](https://github.com/mapbox/pixelmatch): it computes a score based on the difference of color metrics between two images 
- The direct approach of summing the differences between each pixel of the images. (inspired from [https://chriscummins.cc/s/genetics/](https://chriscummins.cc/s/genetics/)

It is possible to enable one or several of them to compute a  global fitness. The final fitness is a ponderated sum of each approach.

## Helpful references

## React

