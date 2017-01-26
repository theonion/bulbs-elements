describe('Charter', function () {
  let Charter,
      subject,
      data = {
    totalAnswers: 150,
    values: [
      { answer: 'First answer', value: 25 },
      { answer: 'Second answer', value: 50 },
      { answer: 'Third answer', value: 75 },
    ],
  };

  beforeEach(function () {
    Charter = require('./charter');
  });

  describe('new one', function () {
    beforeEach(function () {
      let charterSpy = sinon.stub(Charter.prototype, 'calculatePercentages');
      subject = new charterSpy('.chart-selector', data);
    });

    it('has the selector', function () {
      expect(subject.selector).to.eql('.chart-selector');
    });

    it('has the total answer count', function () {
      expect(subject.totalAnswers).to.eql(150);
    });

    it('has the data', function () {
      expect(subject.data).to.equal(data.values);
    });

    it('calls calculatePercentages to do exactly that', function () {
      expect(subject.calculatePercentages.calledWith(data.values)).to.be.true;
    });
  });

  describe('#calculatePercentages', function () {
    beforeEach(function () {
      subject = new Charter('.chart-selector', data);
    });

    it('calculates the percentages', function () {
      expect(subject.data[0].percent).to.equal(17);
      expect(subject.data[1].percent).to.equal(33);
      expect(subject.data[2].percent).to.equal(50);
    });
  });
});
