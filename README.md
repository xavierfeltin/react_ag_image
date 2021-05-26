# Generate an image from a reference using a Genetic Algorithm

This project was mainly the occasion to start using React. To do so, I thought what kind of fun things I may do with it.
This reflexion took me one more time on Genetic Algorithm and I wondered if it was possible to rebuild an image from another one.
 
As usual, I tried to make the project severless so I could take advantage of Github Pages to make the result easily available.

The website is available at [https://xavierfeltin.github.io/react_ag_image/](https://xavierfeltin.github.io/react_ag_image/) 

## Global approach

First of all, a little remainder on genetic algorithms: [https://towardsdatascience.com/introduction-to-optimization-with-genetic-algorithm-2f5001d9964b](https://towardsdatascience.com/introduction-to-optimization-with-genetic-algorithm-2f5001d9964b)

For this subject, I needed to know if it has been aleady the playgrounds to other people and potentially a research field. Of course, it has been.
And it looked pretty trickery. Especially all the image comparison mathematics.

Since the main purpose was to discover React, I left the mathematics to external libraries which have already done the work and way better that I could have handled.
From anoter reference, I found a pretty straightforward approach by summing (and averaging) the pixels difference between the original and the computed image.

So I went with :
- Ssim library
- Pixel diff library
- The direct approach of summing the differences

## Fitness function

## Helpful references

## React

